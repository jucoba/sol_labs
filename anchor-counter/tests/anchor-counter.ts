  import * as anchor from "@coral-xyz/anchor";
  
  import { Program, Idl } from "@coral-xyz/anchor";
  import { expect } from "chai";
  import { AnchorCounter } from "../target/types/anchor_counter";
  
  describe("anchor-counter", () => {
    // Configure the client to use the local cluster.
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
  
    const program = anchor.workspace.AnchorCounter as Program<AnchorCounter>;
    
  
    const counter = anchor.web3.Keypair.generate();
    const counter2 = anchor.web3.Keypair.generate();
    console.log("Counter 1: ",counter.publicKey);
    console.log("Counter 2: ",counter2.publicKey);
  
  
    
  
    it("Cunter Is initialized!", async () => {

      const tx = await program.methods
      .initialize()
      .accounts({counter: counter.publicKey })
      .signers([counter])
      .rpc();

      const account = await program.account.counter.fetch(counter.publicKey);
      expect(account.count.toNumber()).to.equal(0)

    });

    it("Cunter 2 Is initialized!", async () => {

      const tx = await program.methods
      .initialize()
      .accounts({counter: counter2.publicKey })
      .signers([counter2])
      .rpc();

      const account = await program.account.counter.fetch(counter2.publicKey);
      expect(account.count.toNumber()).to.equal(0)

    });

    it ("Increment the count of conter 1. Counter 2 should not increment", async () => {
      const tx = await program.methods
      .increment()
      .accounts( {counter: counter.publicKey, user: provider.wallet.publicKey })
      .rpc();

      const account1 = await program.account.counter.fetch(counter.publicKey);
      expect(account1.count.toNumber()).to.equal(1)

      const account2 = await program.account.counter.fetch(counter2.publicKey);
      expect(account2.count.toNumber()).to.equal(0)

    });

    it ("decrement the count", async () => {
      const tx = await program.methods
      .decrement()
      .accounts( {counter: counter.publicKey, user: provider.wallet.publicKey })
      .rpc();

      const account = await program.account.counter.fetch(counter.publicKey);
      expect(account.count.toNumber()).to.equal(0)

    });

    it ("increment the count by", async () => {
      const tx = await program.methods
      .incrementBy(2)
      .accounts( {counter: counter.publicKey, user: provider.wallet.publicKey })
      .rpc();

      const account = await program.account.counter.fetch(counter.publicKey);
      expect(account.count.toNumber()).to.equal(2)

    });

  });