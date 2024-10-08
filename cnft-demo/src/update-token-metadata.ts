import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import { findLeafAssetIdPda, getAssetWithProof, mplBubblegum, UpdateArgsArgs, updateMetadata } from "@metaplex-foundation/mpl-bubblegum";
import {
  keypairIdentity,
  publicKey as UMIPublicKey,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { getKeypairFromFile } from "@solana-developers/helpers";
 
const umi = createUmi(
  "https://devnet.helius-rpc.com/?api-key=6e78ffaa-4041-421b-9d45-3d4ea0ab187f",
);
 
// load keypair from local file system
// See https://github.com/solana-developers/helpers?tab=readme-ov-file#get-a-keypair-from-a-keypair-file
const localKeypair = await getKeypairFromFile();
 
// convert to Umi compatible keypair
const umiKeypair = umi.eddsa.createKeypairFromSecretKey(localKeypair.secretKey);
 
// load the MPL Bubblegum program, dasApi plugin and assign a signer to our umi instance
umi.use(keypairIdentity(umiKeypair)).use(mplBubblegum()).use(dasApi());

const merkleTree = UMIPublicKey("2SXaxrvuKZh6MjLjPSWnSYNde5bQcjbktSzic3xXMLre");

/*const assetId = findLeafAssetIdPda(umi, {
  merkleTree,
  leafIndex: 10n,
})[0];*/

const assetId = UMIPublicKey("BhTkxhEcbb65iiaF1Rnae5FqnrD9F11Nm1gQxndM7TFN");
 
// @ts-ignore
const rpcAsset = await umi.rpc.getAsset(assetId);

console.log("asset", rpcAsset);

const updateArgs: UpdateArgsArgs = {
    uri: 'https://chocolate-wet-narwhal-846.mypinata.cloud/ipfs/newid555',
}



const assetWithProof = await getAssetWithProof(umi, assetId, { commitment: "finalized" })

console.log("--------------- ",assetWithProof.metadata);
console.log("Asset with proof metadada: ",assetWithProof.metadata);

const collectionMint = UMIPublicKey("9fD2EGSvLvKVRYbMzadFz7TQEtGE9wSSRFCq73HPd9P1");
  

await updateMetadata(umi, {
    ...assetWithProof,
    leafOwner: assetWithProof.leafOwner,
    currentMetadata: assetWithProof.metadata,
    updateArgs,
    authority: localKeypair,
    collectionMint: collectionMint
  }).sendAndConfirm(umi);

  console.log("updated")





