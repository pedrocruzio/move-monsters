import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: () => void;
  onNextLesson: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, onClaim, onNextLesson }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg text-center">
        <h2 className="text-2xl mb-4">Congrats! Claim your NFT</h2>
        <button onClick={onClaim} className="bg-blue-500 text-white p-2 w-full mb-2">
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