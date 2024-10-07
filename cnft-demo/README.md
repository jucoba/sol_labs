https://solana.com/developers/courses/state-compression/compressed-nfts
https://developers.metaplex.com/bubblegum/update-cnfts

#Key takeawys.

- The cNTF is about 1000 times cheaper than an SPL NFT.
- A merkle tree account is needed, the rent for that accounts depends on the size and this is - - - determined by the númber of nft you need  (maxdepth and max buffer size) the number of NFT that can be holded is 2 pow max depth
- cNFT metadata is stored on the ledger, to get it you need a RPC provider. It has monthly costs.
- You can transfer cNFT, it just change lead owner in the mapple tree, the cNFT remains in you merkle tree account 
- Only the makle tree owner or the collection update autority can update the token metadata

# Need to be solved
- Pending to validate id there is a way to transfer the cNFT to another merkle/ account

- How can this not being a centraliced solution given than for fetching the token the merkle tree account public Id must be known?
=> With the method getAssetByOwner there is no need to know neither the mapple tree account nor the assetID

- How to get the change history of the token metadada.
