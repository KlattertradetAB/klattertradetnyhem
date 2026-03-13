import React from 'react';

export const HeaderLinks: React.FC = () => {
  const links = ['Home', 'About', 'Portfolio', 'Services', 'Contact'];

  return (
    <div className="flex justify-end mb-5 border-b border-gray-700/50 pb-1">
      <ul className="flex text-xs font-bold text-gray-text">
        {links.map((link, index) => (
          <li 
            key={link} 
            className={`px-2 ${index !== links.length - 1 ? 'border-r border-gray-600' : ''}`}
          >
            <a href={`#${link.toLowerCase()}`} className="hover:text-white no-underline transition-colors">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};