
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export const BookSection: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      id: 0,
      title: 'Introduktion',
      content: 'Här får du en översikt över bokens innehåll och struktur. Vi introducerar ämnet och ger en bakgrund till varför denna bok är viktig just nu för att förstå myndighetsinducerat trauma.',
      image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2670&auto=format&fit=crop'
    },
    {
      id: 1,
      title: 'Utdrag av definition ur boken',
      content: (
        <>
          <h3 className="font-bold text-xl mb-4 text-brand-dark dark:text-white">Kapitel 1<br />Definition och avgränsning</h3>
          
          <p className="mb-4">
            Myndighetsinducerat trauma är ett djupt och komplext trauma som uppstår när en individ- eller flera individer inom ett system som en familj blir utsatta för ingripanden från myndighet som är i sådan pass grad att det över tid ger symptom på livet som gör att poängen Utredningsmaterialet utgör minst hälften. I denna process berövas de gradvis sin autonomi, sin röst, sitt tolkningsföreträde, sitt eget narrativ och i många fall även sin relation till varandra.
          </p>
          <p className="mb-4">
            Detta är ett trauma som initialt uppvisar alla de kriterier som återfinns i diagnosen för posttraumatiskt stressyndrom (PTSD). Över tid och i processessen utgör symptomen poäng i PCL-5 (Screnning för komplex PTSD. Nedan kallat c-PTSD) som övergår gränsvärdet för mallen i totalpoäng.
          </p>
          <p className="mb-4">
            Till skillnad från många andra trauman skapas Myndighetsinducerat trauma i en process som vi beskriver nedan i 7 nivåer. Dessa nivåer utgör inte en kronologi på individnivå där det självklart finns individuella skillnader men vi hävdar av egen erfarenhet, vi hävdar ur profession och detta med stöd i forskning. Tillhörande processen vi beskriver har vi utformat ett utredningsmaterial vi kommer prata om och belysa i det sista kapitlet.
          </p>
          <p className="mb-4">
            En annan central aspekt av definitionen är att det process som utgör Myndighetsinducerat trauma successivt går in i vad Eva Langes teori vilken hon själv kallar ”våldets normaliseringsprocess” där det går in i en fas av normalisering där den våldsutsatta personen börjar skuldbelägga sig själv och inte längre förmår ta sig ur den destruktiva processen.
          </p>
          <p className="mb-4">
            Den utsattas sanning vänds successivt mot personen själv och utåt sett kan det uppfattas som att individen saknar ambition att lösa den påtvingade situationen eller att personen själv har gjort tillräckligt fel för att förtjäna den skada som förövaren utsätter dem och deras barn för (I svenskt talspråk ”ingen rök utan eld”)
          </p>
          <p className="mb-4">
            Myndighetsinducerat trauma uppstår inte som ett resultat av illvilja i en enskild myndighetsutövares grundläggande personliga ambition eller att intentionen bakom gällande lagstiftning skulle vara felaktig. Det har heller inget att göra med det narrativ som myndigheten presenterar för den utsatta, deras familj eller för sig själva. Den skada som vi beskriver har enbart att göra med vad som faktiskt har gjorts eller inte gjorts, hur det utförts och hur de som möter myndigheterna påverkats utav det- oavsett den personliga ambitionen bakom handlingen.
          </p>
          <p className="mb-4">
            Denna skada har för att förtydliga lite inte med lagstiftningens ursprungliga syfte eller intention att göra utan svårigheten att hålla sig inom det lagrum som är oss givna utan att tolka dessa till sin egen personliga fördel.
          </p>
          <p className="mb-0">
            Vår förhoppning är att denna bok ska vara en motivatotor att titta på vad socialt arbete är, vad tanken Vad- och hur nära vi är den ambition som får oss att somna på kvällen - respektive kliva upp på morgonen.
          </p>
        </>
      ),
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2573&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Gratis föreläsning',
      content: 'Som ett exklusivt bonusmaterial får du tillgång till en inspelad föreläsning där författarna utvecklar sina tankegångar, ger konkreta exempel och sammanfattar bokens viktigaste poänger.',
      image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2670&auto=format&fit=crop'
    },
  ];

  return (
    <div className="bg-brand-bg dark:bg-[#121212] py-20 md:py-32 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left: Navigation */}
          <div className="lg:w-1/3">
            <h6 className="text-brand-secondary font-bold text-lg mb-2">Vad innehåller boken</h6>
            <h2 className="text-brand-dark dark:text-white text-3xl md:text-4xl font-bold mb-8 transition-colors">Ta del av introduktion och sammanfattning av kapitel</h2>
            
            <div className="flex flex-col gap-4 sticky top-32">
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => setActiveChapter(index)}
                  className={`text-left px-6 py-4 rounded-large transition-all duration-300 flex items-center justify-between group ${
                    activeChapter === index 
                      ? 'bg-brand-primary text-white shadow-lg' 
                      : 'bg-white dark:bg-gray-800 dark:text-gray-300 hover:bg-brand-secondary/20 dark:hover:bg-gray-700 hover:scale-[1.02] hover:shadow-md'
                  }`}
                >
                  <span className="font-bold">
                    {index + 1}. {chapter.title}
                  </span>
                  {activeChapter === index && <CheckCircle size={20} />}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:w-2/3">
             <div className="bg-white dark:bg-gray-800 p-2 rounded-medium shadow-card h-full transition-colors duration-300">
               <div className="relative h-[300px] md:h-[400px] rounded-medium overflow-hidden mb-8">
                 <img 
                   src={chapters[activeChapter].image} 
                   alt={typeof chapters[activeChapter].title === 'string' ? chapters[activeChapter].title : 'Kapitelbild'} 
                   className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                   <h3 className="text-white text-2xl font-bold">{chapters[activeChapter].title}</h3>
                 </div>
               </div>
               
               <div className="px-6 pb-6">
                 {/* Changed from <p> to <div> to support nested elements (paragraphs) in activeChapter 1 */}
                 <div className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6 transition-colors">
                   {chapters[activeChapter].content}
                 </div>
                 
                 <div className="p-6 bg-brand-bg dark:bg-gray-700 rounded-medium border-l-4 border-brand-secondary transition-colors">
                   <p className="italic text-brand-dark dark:text-gray-100 font-medium text-xl transition-colors">
                     "Kunskap är nyckeln till förändring. Detta kapitel ger dig verktygen att förstå helheten."
                   </p>
                 </div>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
