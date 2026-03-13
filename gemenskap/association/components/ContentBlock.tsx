import React from 'react';

interface ContentBlockProps {
  title: string;
  children: React.ReactNode;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({ title, children }) => {
  return (
    <div className="text-justify">
      <h2 className="text-brown-primary font-bold text-xs uppercase mb-3 border-b border-brown-primary/20 inline-block pb-1">
        {title}
      </h2>
      <div className="text-gray-300">
        {children}
      </div>
    </div>
  );
};