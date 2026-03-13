
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import type { Word } from '../types';

interface TypewriterEffectProps {
  wordsByLine: Word[][];
  className?: string;
  cursorClassName?: string;
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  wordsByLine,
  className,
  cursorClassName,
}) => {
  // Flatten the words and characters into a single array of renderable elements
  // to make the stagger effect work correctly across lines.
  const renderableElements: React.ReactNode[] = [];
  wordsByLine.forEach((line, lineIndex) => {
    line.forEach((word, wordIndex) => {
      word.text.split("").forEach((char, charIndex) => {
        renderableElements.push(
          <motion.span
            key={`char-${lineIndex}-${wordIndex}-${charIndex}`}
            variants={{
                hidden: { opacity: 0, display: 'none' },
                visible: { opacity: 1, display: 'inline-block' },
            }}
            className={cn(`dark:text-white text-black`, word.className)}
          >
            {char}
          </motion.span>
        );
      });
      // Add a space after each word
       renderableElements.push(<span key={`space-${lineIndex}-${wordIndex}`}>&nbsp;</span>);
    });
    // Add a line break after each line except the last one
    if (lineIndex < wordsByLine.length - 1) {
      renderableElements.push(<br key={`br-${lineIndex}`} />);
    }
  });


  return (
    <div className={cn("text-base sm:text-xl md:text-3xl lg:text-4xl font-bold text-center", className)}>
      <motion.div
        variants={{
          hidden: {},
          visible: {},
        }}
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.08 }} // Adjusted for a slightly faster character reveal
        className="inline-block"
      >
        {renderableElements}
      </motion.div>
    </div>
  );
};
