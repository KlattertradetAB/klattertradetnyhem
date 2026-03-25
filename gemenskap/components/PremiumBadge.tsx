import React from 'react';
import './PremiumBadge.css';

interface PremiumBadgeProps {
  onClick?: () => void;
  className?: string;
}

const PremiumBadge: React.FC<PremiumBadgeProps> = ({ onClick, className }) => {
  return (
    <div className={`premium-badge-container ${className || ''}`} onClick={onClick}>
      <div className="premium-badge-card">
        <span></span>
      </div>
    </div>
  );
};

export default PremiumBadge;
