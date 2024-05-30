"use client";

import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <Image src="/move-monsters-logo.png" alt="Logo" width={200} height={200} />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Connect Wallet</button>
    </header>
  );
};

export default Header;