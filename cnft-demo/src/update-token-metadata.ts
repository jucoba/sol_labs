import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import {
  findLeafAssetIdPda,
  getAssetWithProof,
  getCurrentRoot,
  LeafSchema,
  mintToCollectionV1,
  mplBubblegum,
  parseLeafFromMintToCollectionV1Transaction,
  UpdateArgsArgs,
  updateMetadata
} from "@metaplex-foundation/mpl-bubblegum";
import {
  keypairIdentity,
  publicKey as UMIPublicKey,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { getKeypairFromFile } from "@solana-developers/helpers";
import { clusterApiUrl } from "@solana/web3.js";
import { base58 } from "@metaplex-foundation/umi/serializers";

const umi = createUmi(clusterApiUrl("devnet"), "confirmed");
 
// load keypair from local file system
// See https://github.com/solana-developers/helpers?tab=readme-ov-file#get-a-keypair-from-a-keypair-file
const localKeypair = await getKeypairFromFile();
 
// convert to Umi compatible keypair
const umiKeypair = umi.eddsa.createKeypairFromSecretKey(localKeypair.secretKey);
 
// load the MPL Bubblegum program, dasApi plugin and assign a signer to our umi instance
umi.use(keypairIdentity(umiKeypair)).use(mplBubblegum()).use(dasApi());

const merkleTree = UMIPublicKey("2SXaxrvuKZh6MjLjPSWnSYNde5bQcjbktSzic3xXMLre");
const leafOwner = UMIPublicKey("4uSDS1bSrA72PGwAZdPw6VUQ4YtynpPDfbrEPcUVf8EG")

const collectionMint = UMIPublicKey(
  "9fD2EGSvLvKVRYbMzadFz7TQEtGE9wSSRFCq73HPd9P1",
);

const updateArgs: UpdateArgsArgs = {
    name: 'New name',
}

const assetWithProof = await getAssetWithProof(umi, "HyyTEZiZTbxr1YDNBE2vFuYbWqRLT8yLZKhEoZ8cqxpB")


await updateMetadata(umi, {
    ...assetWithProof,
    leafOwner,
    currentMetadata: assetWithProof.metadata,
    updateArgs,
    authority: localKeypair,
    collectionMint: collectionMint
  }).sendAndConfirm(umi)




