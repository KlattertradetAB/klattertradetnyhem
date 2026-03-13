import React from 'react';

interface GrayBoxProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const GrayBox: React.FC<GrayBoxProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-gray-box border border-gray-darkBorder p-3 h-full flex flex-col">
      <h3 className="text-gray-light text-xs font-bold mb-2 flex items-center gap-1 border-b border-gray-500 pb-1">
        {icon && <span className="text-brown-light">{icon}</span>}
        {title}
      </h3>
      <div className="text-gray-300 leading-[13px] text-justify flex-1">
        {children}
      </div>
    </div>
  );
};