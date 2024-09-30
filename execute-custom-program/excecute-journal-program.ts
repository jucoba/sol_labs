import {Connection, PublicKey, SystemProgram } from '@solana/web3.js';
import {AnchorProvider, Program } from '@coral-xyz/anchor';
import JournalIDL from './idl/journal.json';
import type { Journal } from './types/journal';
import "dotenv/config";
import {
    getKeypairFromEnvironment,
  } from "@solana-developers/helpers";

export const JOURNAL_PROGRAM_ID = new PublicKey("2NXL5UWKQeb5JNBUwSRW6xVKc15cJfg9GT3oSEzpadYK");
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const keypair = getKeypairFromEnvironment("SECRET_KEY");

// Define the seeds for PDA (adjust based on your program logic)
const SEED = "journal_entry";
const title = "Hello from node.js";


// Create a wallet using the keypair
const wallet = {
    publicKey: keypair.publicKey,
    signTransaction: async (transaction) => {
      transaction.partialSign(keypair);
      return transaction;
    },
    signAllTransactions: async (transactions) => {
      return transactions.map((transaction) => {
        transaction.partialSign(keypair);
        return transaction;
      });
    },
  };

// Create the AnchorProvider
function useAnchorProvider() {
    return new AnchorProvider(connection, wallet, {
      commitment: 'confirmed',
    });
  }

const provider = useAnchorProvider();
const program = new Program(JournalIDL as Journal, provider);


// Derive the journalEntry PDA based on the title and owner (wallet's public key)
const [journalEntryPDA] = await PublicKey.findProgramAddressSync(
    [Buffer.from(title), wallet.publicKey.toBuffer()],
    JOURNAL_PROGRAM_ID
  );



// Create Journal Entry
const signature = await program.methods.createJournalEntry("Hello 2 from node.js", "Mesagge generated from node.js").rpc();

//Update hournat Entry
//const signature = await program.methods.updateJournalEntry(title, "Message generated from node.js").rpc();

  console.log(
    `You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
  );



