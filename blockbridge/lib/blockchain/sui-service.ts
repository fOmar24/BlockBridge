import { JsonRpcProvider, Connection } from "@mysten/sui.js"
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519"
import { TransactionBlock } from "@mysten/sui.js/transactions"
import { db } from "@/lib/firebase"

// Initialize Sui provider
const connection = new Connection({
  fullnode: process.env.SUI_RPC_URL || "https://fullnode.testnet.sui.io",
})
const provider = new JsonRpcProvider(connection)

// Initialize admin keypair for transactions
// In production, use secure key management
const privateKeyArray = process.env.SUI_PRIVATE_KEY
  ? Uint8Array.from(Buffer.from(process.env.SUI_PRIVATE_KEY, "hex"))
  : new Uint8Array(32) // Placeholder for demo

const keypair = Ed25519Keypair.fromSecretKey(privateKeyArray)

// Package and module information
const packageId = process.env.SUI_PACKAGE_ID || ""
const moduleId = "soulbound_token"

export async function mintSoulboundToken(
  recipientAddress: string,
  tokenName: string,
  tokenDescription: string,
  tokenUri: string,
  attributes: Record<string, string>,
) {
  try {
    const tx = new TransactionBlock()

    // Call the mint_soulbound_token function from our Move module
    tx.moveCall({
      target: `${packageId}::${moduleId}::mint_soulbound_token`,
      arguments: [
        tx.pure(recipientAddress),
        tx.pure(tokenName),
        tx.pure(tokenDescription),
        tx.pure(tokenUri),
        tx.pure(JSON.stringify(attributes)),
      ],
    })

    // Sign and execute the transaction
    const result = await provider.signAndExecuteTransactionBlock({
      transactionBlock: tx,
      signer: keypair,
      options: {
        showEffects: true,
        showEvents: true,
      },
    })

    // Extract the token ID from the transaction results
    const tokenId = extractTokenIdFromEvents(result.events)

    // Store the blockchain transaction in Firestore
    if (tokenId) {
      await db.collection("blockchain_transactions").add({
        transaction_type: "mint_soulbound_token",
        token_id: tokenId,
        transaction_digest: result.digest,
        recipient_address: recipientAddress,
        token_name: tokenName,
        token_description: tokenDescription,
        token_uri: tokenUri,
        attributes,
        timestamp: new Date(),
      })
    }

    return {
      success: true,
      transactionDigest: result.digest,
      tokenId,
    }
  } catch (error) {
    console.error("Error minting soulbound token on Sui:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

function extractTokenIdFromEvents(events: any[] = []) {
  // Find the event that contains the token ID
  // This depends on the specific event structure in your Move module
  const tokenEvent = events.find((event) => event.type.includes(`${moduleId}::TokenMinted`))

  return tokenEvent?.parsedJson?.token_id || null
}

export async function verifySoulboundToken(tokenId: string) {
  try {
    // Get the token object from Sui
    const tokenObject = await provider.getObject({
      id: tokenId,
      options: {
        showContent: true,
      },
    })

    if (!tokenObject || !tokenObject.data || tokenObject.data.content?.dataType !== "moveObject") {
      return {
        success: false,
        error: "Token not found or invalid",
      }
    }

    // Verify that the token is a soulbound token from our module
    const isSoulboundToken = tokenObject.data.content.type.includes(`${moduleId}::SoulboundToken`)

    if (!isSoulboundToken) {
      return {
        success: false,
        error: "Not a valid soulbound token",
      }
    }

    // Extract token data
    const fields = tokenObject.data.content.fields

    // Store verification result in Firestore
    await db.collection("token_verifications").add({
      token_id: tokenId,
      is_verified: true,
      verification_time: new Date(),
      token_data: {
        name: fields.name,
        description: fields.description,
        uri: fields.uri,
        owner: fields.owner,
        attributes: JSON.parse(fields.attributes || "{}"),
        created_at: fields.created_at,
      },
    })

    return {
      success: true,
      token: {
        id: tokenId,
        name: fields.name,
        description: fields.description,
        uri: fields.uri,
        owner: fields.owner,
        attributes: JSON.parse(fields.attributes || "{}"),
        createdAt: fields.created_at,
      },
    }
  } catch (error) {
    console.error("Error verifying soulbound token on Sui:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

