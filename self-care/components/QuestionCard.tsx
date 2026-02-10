import React, { forwardRef } from 'react';
import type { TranslatedQuestion } from '../types';

interface QuestionCardProps {
  question: TranslatedQuestion;
  questionIndex: number;
  selectedAnswer: number;
  onAnswerSelect: (questionIndex: number, answerValue: number) => void;
}

const QuestionCard = forwardRef<HTMLDivElement, QuestionCardProps>(({
  question,
  questionIndex,
  selectedAnswer,
  onAnswerSelect,
}, ref) => {

  const animationDelay = `${100 + questionIndex * 75}ms`;

  return (
    <div
      ref={ref}
      className="bg-white/40 dark:bg-brand-dark-surface/40 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-white/50 dark:border-white/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 opacity-0"
      style={{ animation: `slideInUp 0.5s ease-out ${animationDelay} forwards` }}
    >
      <div className="flex items-start space-x-4">
        <span className="flex-shrink-0 text-2xl font-bold text-brand-primary dark:text-brand-accent">
          {question.id}.
        </span>
        <div>
          <h3 className="text-lg font-semibold text-brand-text dark:text-brand-dark-text mb-4">
            {question.text}
          </h3>
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              return (
                <label
                  key={index}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ease-in-out transform active:scale-[0.98] focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-secondary dark:focus-within:ring-offset-brand-dark-surface ${isSelected
                      ? 'bg-brand-secondary/90 border-brand-primary text-white font-bold shadow-inner scale-[1.02]'
                      : 'bg-white/90 dark:bg-brand-dark-surface/80 border-gray-200 dark:border-gray-700 text-brand-text dark:text-brand-dark-text hover:border-brand-secondary hover:bg-white dark:hover:bg-brand-dark-surface hover:scale-[1.02]'
                    }`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={index}
                    checked={isSelected}
                    onChange={() => onAnswerSelect(questionIndex, index)}
                    className="hidden"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default QuestionCard;