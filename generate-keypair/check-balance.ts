import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
 
const publicKey = new PublicKey("GPdD2GhrdtNUZiQPDoeQoGxVTjUD6DL7zLbCdsoXdn3B");
 
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
//const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed"); 

const balanceInLamports = await connection.getBalance(publicKey);

 
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
 
console.log(
  `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
);