import React from 'react';
import { X, FileText } from 'lucide-react';

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ isOpen, onClose, pdfUrl, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-5xl h-[85vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800/50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/10 p-2 rounded-lg text-orange-500">
              <FileText size={20} />
            </div>
            <h3 className="font-bold text-white text-lg">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 bg-slate-800 relative">
          <iframe
            src={`${pdfUrl}#toolbar=0&view=FitH`}
            className="w-full h-full border-none rounded-b-2xl"
            title={title}
          />
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
