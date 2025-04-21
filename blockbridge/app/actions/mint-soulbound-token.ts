"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/firebase"
import { revalidatePath } from "next/cache"

interface SoulboundTokenMetadata {
  name: string
  description: string
  attributes: {
    trait_type: string
    value: string
  }[]
  image?: string
}

export async function mintSoulboundToken(tokenType: string, metadata: SoulboundTokenMetadata, userId?: string) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      throw new Error("Unauthorized")
    }

    // If userId is provided, check if the current user has admin privileges
    const targetUserId = userId || session.user.id

    if (userId && userId !== session.user.id) {
      const adminDoc = await db.collection("users").doc(session.user.id).get()

      if (!adminDoc.exists || !adminDoc.data()?.is_admin) {
        throw new Error("Unauthorized to mint tokens for other users")
      }
    }

    // Generate a unique token ID (in a real implementation, this would be the blockchain transaction hash)
    const tokenId = `sbt_${Date.now()}_${Math.floor(Math.random() * 1000000)}`

    // Start a batch write
    const batch = db.batch()

    // Create the token document
    const tokenRef = db.collection("soulbound_tokens").doc()

    const tokenData = {
      user_id: targetUserId,
      token_id: tokenId,
      token_type: tokenType,
      metadata,
      is_verified: false,
      created_at: new Date(),
      updated_at: new Date(),
    }

    batch.set(tokenRef, tokenData)

    // Record activity
    const activityRef = db.collection("activities").doc()
    batch.set(activityRef, {
      user_id: targetUserId,
      activity_type: "token_minted",
      description: `Received soulbound token: ${metadata.name}`,
      points: 50,
      metadata: { token_id: tokenId, token_type: tokenType },
      created_at: new Date(),
    })

    // Update user reputation score
    const userRef = db.collection("users").doc(targetUserId)
    const userDoc = await userRef.get()

    if (userDoc.exists) {
      const userData = userDoc.data()
      batch.update(userRef, {
        reputation_score: (userData?.reputation_score || 0) + 50,
      })
    }

    // Commit the batch
    await batch.commit()

    // Revalidate the user's profile page
    revalidatePath(`/profile/${targetUserId}`)

    return {
      success: true,
      token: {
        id: tokenRef.id,
        token_id: tokenId,
        token_type: tokenType,
        created_at: new Date().toISOString(),
      },
    }
  } catch (error) {
    console.error("Error minting soulbound token:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to mint soulbound token",
    }
  }
}

