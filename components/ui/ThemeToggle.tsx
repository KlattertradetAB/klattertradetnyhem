import React from 'react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
  className?: string;
  size?: number;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, onToggle, className = "", size = 20 }) => {
  const maskId = React.useId();

  return (
    <label
      className={`themeToggle st-sunMoonThemeToggleBtn ${className}`}
      style={{ width: size + 12, height: size + 12 }}
    >
      <input 
        type="checkbox" 
        className="themeToggleInput" 
        checked={isDarkMode}
        onChange={onToggle}
      />
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="currentColor"
        stroke="none"
      >
        <mask id={maskId}>
          <rect x="0" y="0" width="20" height="20" fill="white"></rect>
          <circle cx="11" cy="3" r="8" fill="black"></circle>
        </mask>
        <circle
          className="sunMoon"
          cx="10"
          cy="10"
          r="8"
          mask={`url(#${maskId})`}
        ></circle>
        <g>
          <circle className="sunRay sunRay1" cx="18" cy="10" r="1.5"></circle>
          <circle className="sunRay sunRay2" cx="15.66" cy="15.66" r="1.5"></circle>
          <circle className="sunRay sunRay3" cx="10" cy="18" r="1.5"></circle>
          <circle className="sunRay sunRay4" cx="4.34" cy="15.66" r="1.5"></circle>
          <circle className="sunRay sunRay5" cx="2" cy="10" r="1.5"></circle>
          <circle className="sunRay sunRay6" cx="4.34" cy="4.34" r="1.5"></circle>
          <circle className="sunRay sunRay7" cx="10" cy="2" r="1.5"></circle>
          <circle className="sunRay sunRay8" cx="15.66" cy="4.34" r="1.5"></circle>
        </g>
      </svg>
    </label>
  );
};

export default ThemeToggle;
