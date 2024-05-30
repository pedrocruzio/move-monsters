"use client";

import React from 'react';
import MonacoEditor from '../components/MonacoEditor';
import Instructions from '../components/Instructions';
import Console from '../components/Console';
import Navigation from '../components/Navigation';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 h-full">
          <Instructions />
        </div>
        <div className="w-2/3 flex flex-col h-full">
          <div className="flex-1 h-full">
            <MonacoEditor />
          </div>
          <Console />
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Home;