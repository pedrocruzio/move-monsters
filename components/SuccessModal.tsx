import React from 'react';
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: () => void;
  onNextLesson: () => void;
}

const MINT_FUNCTION = 'mint_nft';
const PACKAGE_ID = '0x9dad0c38e9cf1db6cf2b9cd1f01c3b4cbc7df3cf84a2f1dce19cc22022e65ac4';
const MODULE_NAME = 'move_monsters_module'; // Correct module name

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, onClaim, onNextLesson }) => {
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const handleClaim = async () => {
    const transactionBlock = new TransactionBlock();
    transactionBlock.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::${MINT_FUNCTION}`,
      arguments: [transactionBlock.pure('Lesson Completed NFT'), transactionBlock.pure('This NFT is awarded for completing a lesson')],
    });

    try {
      const serializedTransaction = transactionBlock.serialize();

      signAndExecuteTransaction(
        {
          transaction: serializedTransaction,
          chain: 'sui:testnet',
        },
        {
          onSuccess: (result) => {
            console.log('Minting response:', result);
            onClaim();
            alert('Congratulations! Claim your NFT');
          },
          onError: (error) => {
            console.error('Error minting NFT:', error);
          },
        }
      );
    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg text-center">
        <h2 className="text-2xl mb-4">Congrats! Claim your NFT</h2>
        <button onClick={handleClaim} className="bg-blue-500 text-white p-2 w-full mb-2">
          Claim NFT
        </button>
        <button onClick={onNextLesson} className="bg-green-500 text-white p-2 w-full">
          Next Lesson
        </button>
        <button onClick={onClose} className="mt-4 text-gray-500">
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;