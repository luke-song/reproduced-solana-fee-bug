const solanaWeb3 = require('@solana/web3.js');

(async () => {
    const connection = new solanaWeb3.Connection('https://api.testnet.solana.com');


const from = solanaWeb3.Keypair.generate();
const airdropSignature = await connection.requestAirdrop(from.publicKey, solanaWeb3.LAMPORTS_PER_SOL);
await connection.confirmTransaction(airdropSignature);

let balance = await connection.getBalance(from.publicKey);
console.log('Before Balance: ', balance);

const to = solanaWeb3.Keypair.generate();

const transaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to.publicKey,
        lamports: solanaWeb3.LAMPORTS_PER_SOL / 100,
    }),
);

const signature = await solanaWeb3.sendAndConfirmTransaction(
    connection,
    transaction,
    [from],
);

console.log('SIGNATURE', signature);

let balance2 = await connection.getBalance(from.publicKey);
console.log('After Balance: ', balance2);



})();

// describe("reproduced bug", () => {
//     it('should be able to execute 60 transfer instructions without cryptid', async () => {
//       await sendTransaction(connection, tx, [key]);
//       await balances.recordAfter();
//       expect(balances.for(key.publicKey)).to.equal(
//         -(lamportsToTransfer + feeCalculator.lamportsPerSignature)
//       ); // fees only
//       expect(balances.for(recipient)).to.equal(60 * lamportsToTransfer); // fees only
//     });
// });