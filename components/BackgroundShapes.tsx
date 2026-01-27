import React from 'react';

const BackgroundShapes: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div 
        className="absolute bg-white/10 rounded-2xl shadow-[0_8px_32px_rgba(255,255,255,0.1)] animate-float"
        style={{ width: '120px', height: '80px', top: '20%', left: '10%', transform: 'rotate(15deg)', animationDelay: '0s' }}
      />
      <div 
        className="absolute bg-white/10 rounded-xl shadow-[0_8px_32px_rgba(255,255,255,0.1)] animate-float"
        style={{ width: '90px', height: '140px', top: '60%', right: '15%', transform: 'rotate(-20deg)', animationDelay: '2s' }}
      />
      <div 
        className="absolute bg-white/10 rounded-lg shadow-[0_8px_32px_rgba(255,255,255,0.1)] animate-float"
        style={{ width: '100px', height: '60px', bottom: '20%', left: '20%', transform: 'rotate(25deg)', animationDelay: '4s' }}
      />
      <div 
        className="absolute bg-white/10 rounded-lg shadow-[0_8px_32px_rgba(255,255,255,0.1)] animate-float"
        style={{ width: '80px', height: '120px', top: '10%', right: '30%', transform: 'rotate(-10deg)', animationDelay: '1s' }}
      />
      <div 
        className="absolute bg-white/10 rounded-2xl shadow-[0_8px_32px_rgba(255,255,255,0.1)] animate-float"
        style={{ width: '110px', height: '70px', bottom: '40%', right: '20%', transform: 'rotate(30deg)', animationDelay: '3s' }}
      />
      <div 
        className="absolute bg-white/10 rounded-[20px] shadow-[0_8px_32px_rgba(255,255,255,0.1)] animate-float"
        style={{ width: '95px', height: '95px', top: '40%', left: '5%', transform: 'rotate(-15deg)', animationDelay: '5s' }}
      />
    </div>
  );
};

export default BackgroundShapes;