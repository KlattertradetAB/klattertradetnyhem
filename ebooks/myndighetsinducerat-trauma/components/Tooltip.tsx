import React, { useState, useRef, useId } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <span
      ref={wrapperRef}
      className="relative inline-block cursor-help group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] focus-visible:ring-offset-2 rounded-sm"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      tabIndex={0}
      aria-describedby={tooltipId}
    >
      {children}
      {isVisible && (
        <div
          id={tooltipId}
          ref={tooltipRef}
          role="tooltip"
          className="absolute z-50 px-4 py-2 text-sm text-[var(--bg-color)] bg-[var(--text-color)] rounded-md shadow-lg opacity-95 pointer-events-none whitespace-nowrap -translate-x-1/2 left-1/2 bottom-full mb-2 group-hover:opacity-100 transition-opacity duration-200"
        >
          {content}
          <div className="absolute left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[var(--text-color)] bottom-[-16px]"></div>
        </div>
      )}
    </span>
  );
};