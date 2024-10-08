import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { mplBubblegum, deserializeUpdateMetadataArgs } from "@metaplex-foundation/mpl-bubblegum";




const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const bubblegumProgramId = mplBubblegum.programId;

const signatures = await connection.getSignaturesForAddress(new PublicKey("2SXaxrvuKZh6MjLjPSWnSYNde5bQcjbktSzic3xXMLre"))
console.log("Transaction Signatures:", signatures);

const transaction = await connection.getTransaction(signatures[0].signature, {
    maxSupportedTransactionVersion: 0
});

if (transaction) {
    const instructions = transaction.transaction.message.compiledInstructions;
    console.log("Intrucions: ",instructions);
    
    for (const ix of instructions) {
        console.log("ix: ",ix);
        
    }
}


//console.log("Transaction Details: ", transaction);