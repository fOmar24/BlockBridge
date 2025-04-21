module blockbridge::soulbound_token {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::event;
    use sui::package;
    use std::string::{Self, String};
    use sui::url::{Self, Url};

    // Error codes
    const ENotTokenOwner: u64 = 0;
    const ETokenNotTransferable: u64 = 1;

    // One-time witness for the package
    struct SOULBOUND_TOKEN has drop {}

    // The SoulboundToken struct represents a non-transferable token
    struct SoulboundToken has key, store {
        id: UID,
        name: String,
        description: String,
        uri: Url,
        owner: address,
        attributes: String,
        created_at: u64,
    }

    // Event emitted when a new token is minted
    struct TokenMinted has copy, drop {
        token_id: address,
        recipient: address,
        name: String,
        created_at: u64,
    }

    // Event emitted when token metadata is updated
    struct TokenUpdated has copy, drop {
        token_id: address,
        name: String,
        description: String,
        uri: Url,
        attributes: String,
    }

    // Initialize the module
    fun init(witness: SOULBOUND_TOKEN, ctx: &mut TxContext) {
        let publisher = package::claim(witness, ctx);
        transfer::public_transfer(publisher, tx_context::sender(ctx));
    }

    // Mint a new soulbound token
    public entry fun mint_soulbound_token(
        recipient: address,
        name: vector<u8>,
        description: vector<u8>,
        uri: vector<u8>,
        attributes: vector<u8>,
        ctx: &mut TxContext
    ) {
        let token = SoulboundToken {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            uri: url::new_unsafe_from_bytes(uri),
            owner: recipient,
            attributes: string::utf8(attributes),
            created_at: tx_context::epoch(ctx),
        };

        let token_id = object::uid_to_address(&token.id);

        // Emit event
        event::emit(TokenMinted {
            token_id,
            recipient,
            name: token.name,
            created_at: token.created_at,
        });

        // Transfer token to recipient
        transfer::transfer(token, recipient);
    }

    // Update token metadata (only by owner)
    public entry fun update_token_metadata(
        token: &mut SoulboundToken,
        name: vector<u8>,
        description: vector<u8>,
        uri: vector<u8>,
        attributes: vector<u8>,
        ctx: &TxContext
    ) {
        // Only the token owner can update metadata
        assert!(token.owner == tx_context::sender(ctx), ENotTokenOwner);

        token.name = string::utf8(name);
        token.description = string::utf8(description);
        token.uri = url::new_unsafe_from_bytes(uri);
        token.attributes = string::utf8(attributes);

        // Emit event
        event::emit(TokenUpdated {
            token_id: object::uid_to_address(&token.id),
            name: token.name,
            description: token.description,
            uri: token.uri,
            attributes: token.attributes,
        });
    }

    // Verify token ownership
    public fun verify_ownership(token: &SoulboundToken, owner: address): bool {
        token.owner == owner
    }

    // Get token metadata
    public fun get_metadata(token: &SoulboundToken): (String, String, Url, String, u64) {
        (token.name, token.description, token.uri, token.attributes, token.created_at)
    }

    // Get token owner
    public fun get_owner(token: &SoulboundToken): address {
        token.owner
    }
}

