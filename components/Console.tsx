import React from 'react';

interface ConsoleProps {
  output: string | null;
  error: string | null;
  correctCode: string | null;
}

const Console: React.FC<ConsoleProps> = ({ output, error, correctCode }) => {
  return (
    <div>
      {output && <div className="mt-4 p-2 bg-green-100 text-green-800">{output}</div>}
      {error && <div className="mt-4 p-2 bg-red-100 text-red-800">{error}</div>}
      {correctCode && (
        <div className="mt-4 p-2 bg-blue-100 text-blue-800">
          <h3>Correct Code:</h3>
          <pre className="bg-gray-800 text-white p-2 rounded">
            <code>{correctCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default Console;