import React, { useState } from 'react';
import { ChecklistItem } from '../types';
import { CheckCircle, Circle } from 'lucide-react';

const Checklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: '2', text: 'Jag söker kontinuerlig spegling för att undvika sekundärt trauma.', checked: false },
    { id: '3', text: 'Jag vill att mina klienter enkelt ska kunna verifiera min specialistkompetens.', checked: false },
    { id: '4', text: 'Jag har blivit utbildad hos en aktör som godkänts av HKM och Horizonten att utbilda och legitimera enligt MiT (Myndighetsinducerat trauma).', checked: false },
  ]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const allChecked = items.every(item => item.checked);

  return (
    <div className="bg-hkm-sand py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-hkm-dark">Din Checklista för HKM</h2>
          <p className="mt-4 text-lg text-gray-600">
            Är du redo att ta nästa steg i din professionella resa?
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-10 space-y-6">
            {items.map((item) => (
              <div 
                key={item.id} 
                onClick={() => toggleItem(item.id)}
                className={`flex items-start cursor-pointer p-4 rounded-lg transition-colors duration-200 border-2 ${item.checked ? 'border-hkm-teal bg-teal-50' : 'border-transparent hover:bg-gray-50'}`}
              >
                <div className="flex-shrink-0 mt-1">
                  {item.checked ? (
                    <CheckCircle className="h-6 w-6 text-hkm-teal" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div className="ml-4">
                  <p className={`text-lg font-medium ${item.checked ? 'text-hkm-dark' : 'text-gray-500'}`}>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-8 bg-gray-50 sm:px-10">
            {allChecked ? (
              <div className="text-center animate-fade-in">
                <p className="text-hkm-teal font-bold text-lg mb-4">Du är redo för Horizonten.</p>
                <button className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-hkm-teal hover:bg-teal-700 shadow-md">
                  Ansök om HKM-Certifiering
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-500 italic">Markera alla punkter ovan för att gå vidare.</p>
                <button disabled className="mt-4 w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-400 bg-gray-200 cursor-not-allowed">
                  Ansök om HKM-Certifiering
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checklist;