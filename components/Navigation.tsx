import React from 'react';

const Navigation: React.FC = () => {
  return (
    <div className="bg-gray-800 p-4 flex justify-center space-x-4">
      <button className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">Show Answer</button>
      <button className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">Next Lesson</button>
    </div>
  );
};

export default Navigation;
