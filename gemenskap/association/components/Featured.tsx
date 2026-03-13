import React from 'react';
import { Users, Book, Layers, Calendar } from 'lucide-react';

export const Featured: React.FC = () => {
  const stats = [
    { icon: <Users size={24} />, label: 'Författare', value: '2' },
    { icon: <Layers size={24} />, label: 'Kapitel', value: '12' },
    { icon: <Book size={24} />, label: 'Sidor', value: '250+' },
    { icon: <Calendar size={24} />, label: 'Lansering', value: '2025' },
  ];

  return (
    <section className="bg-brand-primary py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-white group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-secondary transition-colors">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="font-medium opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative Triangle */}
      <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[100px] border-l-transparent border-b-[100px] border-b-white"></div>
    </section>
  );
};