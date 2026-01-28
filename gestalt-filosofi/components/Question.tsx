
import React from 'react';
import { QuestionData } from '../types';

interface QuestionProps {
  data: QuestionData;
  value: string;
  onChange: (id: string, value: string) => void;
}

const Question: React.FC<QuestionProps> = ({ data, value, onChange }) => {
  return (
    <div className="mb-6 group">
      <label
        htmlFor={data.id}
        className="block mb-2 font-semibold text-slate-800 transition-colors group-focus-within:text-blue-700"
      >
        {data.label}
      </label>
      {data.type === 'textarea' ? (
        <textarea
          id={data.id}
          value={value}
          onChange={(e) => onChange(data.id, e.target.value)}
          placeholder={data.placeholder || "Klicka här för att skriva..."}
          className="w-full min-h-[120px] p-4 text-base bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-y placeholder:italic"
        />
      ) : (
        <input
          id={data.id}
          type="text"
          value={value}
          onChange={(e) => onChange(data.id, e.target.value)}
          placeholder={data.placeholder || "Skriv ditt svar..."}
          className="w-full p-4 text-base bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      )}
    </div>
  );
};

export default Question;
