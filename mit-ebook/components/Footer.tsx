import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center text-sm text-[var(--secondary-text)] mt-24 pt-8 border-t border-[var(--border-color)] pb-10">
      <p>&copy; 2025 Billy Ljungberg & Malin Widerlöv. Alla rättigheter förbehållna.</p>
      <p className="mt-1">Utgiven av Horizonten förlag.</p>
    </footer>
  );
};