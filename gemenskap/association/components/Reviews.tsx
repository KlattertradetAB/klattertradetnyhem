import React from 'react';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, role, content, rating, image }) => (
  <div className="bg-brand-bg dark:bg-gray-800 rounded-medium overflow-hidden relative group hover:-translate-y-2 transition-all duration-300 shadow-lg dark:shadow-none">
    {/* Header with Image */}
    <div className="bg-brand-primary/90 dark:bg-gray-900/90 p-6 pb-10 relative transition-colors">
       <div className="flex justify-between items-start">
         <div className="text-white">
           <h4 className="font-bold text-lg">{name}</h4>
           <p className="text-sm opacity-90">{role}</p>
         </div>
         <div className="flex gap-1">
           {[...Array(5)].map((_, i) => (
             <Star 
                key={i} 
                size={14} 
                className={i < rating ? "fill-brand-secondary text-brand-secondary" : "text-white/30"} 
             />
           ))}
         </div>
       </div>
    </div>
    
    {/* Avatar overlapped */}
    <div className="absolute top-16 left-6">
       <img 
         src={image} 
         alt={name} 
         className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-800 object-cover transition-colors"
       />
    </div>

    {/* Content */}
    <div className="pt-12 p-6">
      <p className="text-brand-text dark:text-gray-300 leading-relaxed transition-colors">
        "{content}"
      </p>
    </div>
  </div>
);

export const Reviews: React.FC = () => {
  const reviews = [
    {
      name: "Anna Lindberg",
      role: "Socionom",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2000&auto=format&fit=crop",
      content: "En otroligt viktig bok som sätter ord på det många upplever. Boken ger en djupare förståelse för hur systemet påverkar individen."
    },
    {
      name: "Johan Svensson",
      role: "Jurist",
      rating: 4,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2000&auto=format&fit=crop",
      content: "Välskriven och insiktsfull. Författarna lyckas väva samman juridik och psykologi på ett sätt som är tillgängligt för alla."
    },
    {
      name: "Maria Nilsson",
      role: "Psykolog",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2000&auto=format&fit=crop",
      content: "Teorin om myndighetsinducerat trauma är banbrytande. Rekommenderas varmt till alla som arbetar med människor i utsatta situationer."
    }
  ];

  return (
    <div className="bg-white dark:bg-[#0a0a0a] py-20 md:py-32 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h6 className="text-brand-secondary font-bold text-lg mb-2">Omdömen</h6>
          <h2 className="text-brand-dark dark:text-white text-3xl md:text-4xl font-bold transition-colors">Vad läsarna säger</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <ReviewCard key={idx} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
};