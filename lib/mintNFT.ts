// import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';
// import { TransactionBlock } from '@mysten/sui.js/transactions';
// import { useState } from 'react';

// const MINT_FUNCTION = 'mint_nft';
// const PACKAGE_ID = '0x9dad0c38e9cf1db6cf2b9cd1f01c3b4cbc7df3cf84a2f1dce19cc22022e65ac4';

// const mintNFT = async (name: string, description: string) => {
//   const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
//   const [digest, setDigest] = useState('');

//   const transactionBlock = new TransactionBlock();
//   transactionBlock.moveCall({
//     target: `${PACKAGE_ID}::lesson_nft::${MINT_FUNCTION}`,
//     arguments: [transactionBlock.pure(name), transactionBlock.pure(description)],
//   });

//   try {
//     const serializedTransaction = transactionBlock.serialize();

//     signAndExecuteTransaction(
//       {
//         transaction: serializedTransaction,
//         chain: 'sui:testnet',
//       },
//       {
//         onSuccess: (result) => {
//           console.log('Minting response:', result);
//           setDigest(result.digest);
//           alert('Congratulations! Claim your NFT');
//         },
//         onError: (error) => {
//           console.error('Error minting NFT:', error);
//         },
//       }
//     );
//   } catch (error) {
//     console.error('Error minting NFT:', error);
//   }
// };

// export default mintNFT;