import React from 'react';

const Console: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white p-2 h-48 overflow-y-auto">
      <h2 className="text-lg font-bold">Console</h2>
      <div id="console-output">
      </div>
    </div>
  );
};

export default Console;
