"use client";

import React from 'react';
import Image from 'next/image';
import { ConnectButton } from '@mysten/dapp-kit';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <Image src="/move-monsters-logo.png" alt="Logo" width={200} height={200} />
      </div>
      <ConnectButton />
    </header>
  );
};

export default Header;