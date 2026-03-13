import React from 'react';
import { Home, User, Image, Folder, Mail } from 'lucide-react';

export const VerticalMenu: React.FC = () => {
  const menuItems = [
    { label: 'Home Page', icon: <Home size={12} /> },
    { label: 'About Me', icon: <User size={12} /> },
    { label: 'Gallery', icon: <Image size={12} /> },
    { label: 'Projects', icon: <Folder size={12} /> },
    { label: 'Contact', icon: <Mail size={12} /> },
  ];

  return (
    <div className="w-[94px] shrink-0 flex flex-col gap-[11px]">
      {menuItems.map((item) => (
        <a 
          key={item.label}
          href="#" 
          className="group block w-[92px] h-[28px] bg-gray-box border border-gray-border hover:bg-gray-500 transition-all relative overflow-hidden"
        >
          <div className="flex items-center h-full px-2 gap-1 text-white group-hover:text-black font-bold text-xs">
             <span className="opacity-50 group-hover:opacity-100">{item.icon}</span>
             <span className="leading-none pt-0.5">{item.label}</span>
          </div>
          {/* Hover Glint Effect */}
          <div className="absolute top-0 -left-full w-full h-full bg-white/20 skew-x-12 group-hover:left-full transition-all duration-500 ease-in-out"></div>
        </a>
      ))}
    </div>
  );
};