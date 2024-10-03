import { clusterApiUrl, Connection } from '@solana/web3.js';
import { initializeKeypair } from '@solana-developers/helpers';
import { uploadOffChainMetadata } from './helpers';
import dotenv from 'dotenv';
import createNFTWithEmbeddedMetadata from './nft-with-embedded-metadata';

dotenv.config();

const connection = new Connection(clusterApiUrl('devnet'), 'finalized');
//const connection = new Connection('http://127.0.0.1:8899');

const payer = await initializeKeypair(connection, { keypairPath: './wallet.json' });
console.log('Payer', payer.publicKey);

const imagePath = 'src/cat.png';
const metadataPath = 'src/temp.json';
const tokenName = 'Cat2 NFT';
const tokenDescription = 'This is a cat dog';
const tokenSymbol = 'EMB2';
const tokenExternalUrl = 'https://solana.com/';
const tokenAdditionalMetadata = {
  species: 'Cat',
  breed: 'Cool2',
};

const tokenUri = await uploadOffChainMetadata(
  {
    tokenName,
    tokenDescription,
    tokenSymbol,
    imagePath,
    metadataPath,
    tokenExternalUrl,
    tokenAdditionalMetadata,
  },
  payer,
);

console.log('Token URI:', tokenUri);

await createNFTWithEmbeddedMetadata({
  payer,
  connection,
  tokenName,
  tokenSymbol,
  tokenUri,
});
