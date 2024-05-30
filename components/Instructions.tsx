import React from 'react';
import { marked } from 'marked';

interface InstructionsProps {
  contentHtml: string;
}

const Instructions: React.FC<InstructionsProps> = ({ contentHtml }) => {
  const htmlContent = marked(contentHtml);

  return (
    <div className="p-5 bg-black text-white h-full overflow-y-auto">
      <div className="markdown-body text-sm" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default Instructions;