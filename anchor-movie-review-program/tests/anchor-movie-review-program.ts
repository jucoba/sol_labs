import * as anchor from "@coral-xyz/anchor";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { expect } from "chai";
import { AnchorMovieReviewProgram } from "../target/types/anchor_movie_review_program";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

 
describe("anchor-movie-review-program", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
 
  const program = anchor.workspace
    .AnchorMovieReviewProgram as Program<AnchorMovieReviewProgram>;

  
 
  const movie = {
    title: "Just a test movie",
    description: "Wow what a good movie it was real great",
    rating: 5,
  };
 
  const [moviePda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from(movie.title), provider.wallet.publicKey.toBuffer()],
    program.programId,
  );
 
  it("Movie review is added`", async () => {
    const tx = await program.methods.addMovieReview(movie.title, movie.description, movie.rating)
    .rpc();

    const account = await program.account.movieAccountState.fetch(moviePda);
    expect(movie.title).equal(account.title);
    expect(movie.rating).equal(account.rating);
    expect(movie.description).equal(account.description);
    expect(account.reviewer == provider.wallet.publicKey);
  });
 
  it("Movie review is updated`", async () => {
    const newDescription = "Wow this is new";
    const newRating = 4;

    const tx = await program.methods.updateMovieReview(movie.title, newDescription, newRating)
    .rpc();

    const account = await program.account.movieAccountState.fetch(moviePda);
    console.log("New rating: ",account.rating);
    console.log("New description: ",account.description);
    expect(newRating).equal(account.rating);
    expect(newDescription).equal(account.description);
    

  });
 
  it("Deletes a movie review", async () => {
    const tx = await program.methods.deleteMovieReview(movie.title).rpc();

    try {
      const account = await program.account.movieAccountState.fetch(moviePda);
      throw new Error("Account still exists after deletion");
    } catch (err) {
      expect(err.message).to.contain("Account does not exist");
    }
  });

  it("Movie review should not be updated with signer different than the owner`", async () => {
    
    const fakeSigner = anchor.web3.Keypair.generate();
    
    const txAdd = await program.methods.addMovieReview(movie.title, movie.description, movie.rating)
    .rpc();

    
    
    try {
      const txUpdate = await program.methods.updateMovieReview(movie.title, "", 1).signers([fakeSigner])
      .rpc();
      throw new Error("Account was bupdated with fake signer");
    } catch (err) {
      expect(err.message).to.contain("unknown signer");
    }

    
  });
  
});