import { getKeypairFromEnvironment, initializeKeypair } from '@solana-developers/helpers'
import { clusterApiUrl, Connection } from '@solana/web3.js'

(async () => {
	/**
	 * Create a connection and initialize a keypair if one doesn't already exists.
	 * If a keypair exists, airdrop a sol if needed.
	 */
	//const connection = new Connection("http://127.0.0.1:8899", { commitment: 'finalized' })
	const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
	//const payer = getKeypairFromEnvironment("SECRET_KEY");
	const payer = await initializeKeypair(connection);
	
	console.log(payer.publicKey)
})()
