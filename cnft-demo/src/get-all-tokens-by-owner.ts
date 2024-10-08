import { publicKey } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api'
import { getKeypairFromFile } from "@solana-developers/helpers";

const umi = createUmi('https://devnet.helius-rpc.com/?api-key=6e78ffaa-4041-421b-9d45-3d4ea0ab187f').use(dasApi());

const localKeypair = await getKeypairFromFile();
const owner = publicKey(localKeypair.publicKey);

// @ts-ignore
const assets = await umi.rpc.getAssetsByOwner({
    owner,
    limit: 10
});
console.log("Assets number: ",assets.items.length);
console.log(assets.items[0]);