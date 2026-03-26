import React from 'react';
import './PremiumBadge.css';

interface PremiumBadgeProps {
  onClick?: () => void;
  className?: string;
}

const PremiumBadge: React.FC<PremiumBadgeProps> = ({ onClick, className }) => {
  return (
    <div className={`premium-badge-wrapper ${className || ''}`} onClick={onClick}>
      <div className="premium-badge-glow"></div>
      <div className="premium-badge-card">
        <div className="premium-badge-glass-content">
          <div className="premium-badge-ribbon">
            <span>PREMIUM</span>
          </div>
          <div className="premium-badge-visual">
            <div className="gem-shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumBadge;
