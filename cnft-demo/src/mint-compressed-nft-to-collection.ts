import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import {
  findLeafAssetIdPda,
  LeafSchema,
  mintToCollectionV1,
  mplBubblegum,
  parseLeafFromMintToCollectionV1Transaction,
} from "@metaplex-foundation/mpl-bubblegum";
import {
  keypairIdentity,
  publicKey as UMIPublicKey,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { getKeypairFromFile } from "@solana-developers/helpers";
import { clusterApiUrl } from "@solana/web3.js";
import { base58 } from "@metaplex-foundation/umi/serializers";
 
const umi = createUmi(clusterApiUrl("devnet"));
 
// load keypair from local file system
// See https://github.com/solana-developers/helpers?tab=readme-ov-file#get-a-keypair-from-a-keypair-file
const localKeypair = await getKeypairFromFile();
 
// convert to Umi compatible keypair
const umiKeypair = umi.eddsa.createKeypairFromSecretKey(localKeypair.secretKey);
 
// load the MPL Bubblegum program, dasApi plugin and assign a signer to our umi instance
umi.use(keypairIdentity(umiKeypair)).use(mplBubblegum()).use(dasApi());

const merkleTree = UMIPublicKey("2SXaxrvuKZh6MjLjPSWnSYNde5bQcjbktSzic3xXMLre");
 
const collectionMint = UMIPublicKey(
  "9fD2EGSvLvKVRYbMzadFz7TQEtGE9wSSRFCq73HPd9P1",
);
 
const uintSig = await(
  await mintToCollectionV1(umi, {
    leafOwner: umi.identity.publicKey,
    merkleTree,
    collectionMint,
    metadata: {
      name: "My NFT 3",
      uri: "https://chocolate-wet-narwhal-846.mypinata.cloud/ipfs/QmeBRVEmASS3pyK9YZDkRUtAham74JBUZQE3WD4u4Hibv9",
      sellerFeeBasisPoints: 0, // 0%
      collection: { key: collectionMint, verified: false },
      creators: [
        {
          address: umi.identity.publicKey,
          verified: false,
          share: 100,
        },
      ],
    },
  }).sendAndConfirm(umi)
).signature;
 
const b64Sig = base58.deserialize(uintSig);
console.log("Signature: ",b64Sig);

const leaf: LeafSchema = await parseLeafFromMintToCollectionV1Transaction(
    umi,
    uintSig,
  );

  console.log("Leaf: ",leaf);
  console.log("Leaf Index: ",leaf.nonce);

  const assetId = findLeafAssetIdPda(umi, {
    merkleTree,
    leafIndex: leaf.nonce,
  })[0];

  console.log("Asset Id: ",assetId);