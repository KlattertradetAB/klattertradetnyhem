
import React from 'react';

export const TableOfContents: React.FC = () => {
  const handleNavigation = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const targetElement = document.getElementById(id.substring(1)); // Remove '#' from id
    if (targetElement) {
      // Offset slightly for the sticky toolbar
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const sections = [
    { id: '#chap1', label: 'Kapitel 1', title: 'Konceptuell Inramning' },
    { id: '#chap2', label: 'Kapitel 2', title: 'Definition' },
    { id: '#diagram-mit', label: 'Modell', title: 'Traumacykeln', isModell: true },
    { 
      id: '#chap3', 
      label: 'Kapitel 3', 
      title: 'Från subjekt till objekt',
      sub: [
        { id: '#sec3-1', title: '3.1 MiV – När lagen blir vapen' },
        { id: '#sec3-2', title: '3.2 Systemkritik vs Enskilda fall' },
        { id: '#sec3-4', title: '3.4 De fyra rörelserna' },
        { id: '#sec3-6', title: '3.6 Definition av MiV' }
      ]
    },
    { id: '#chap4', label: 'Kapitel 4', title: 'Systeminducerad retraumatisering' },
    { 
      id: '#chap5', 
      label: 'Kapitel 5', 
      title: 'Systemets objektifiering',
      sub: [
        { id: '#sec5-1', title: '5.1 Barnen blir verksamhetskapital' },
        { id: '#sec5-2', title: '5.2 Biopolitisk kontroll' },
        { id: '#sec5-3', title: '5.3 Konsekvensen: Det administrativa våldet' }
      ]
    },
    { 
      id: '#chap6', 
      label: 'Kapitel 6', 
      title: 'Föräldern som restprodukt',
      sub: [
        { id: '#sec6-1', title: '6.1 Othering / Andregörande' },
        { id: '#sec6-2', title: '6.2 Principen om neutralisering' },
        { id: '#sec6-3', title: '6.3 Från rättsbärare till objekt' },
        { id: '#sec6-4', title: '6.4 Kapital kontra avfall' }
      ]
    },
  ];

  return (
    <div className="mt-10 mb-4 p-6 md:p-10 border border-[var(--border-color)] rounded-lg bg-black/5">
      <h3 className="mt-0 mb-8 text-center font-sans text-sm uppercase tracking-widest text-[var(--secondary-text)]">
        Innehållsförteckning
      </h3>
      <nav>
        <ul className="list-none p-0 m-0">
          {sections.map((item, index) => (
            <li key={index} className="mb-4">
              <a
                href={item.id}
                onClick={(e) => handleNavigation(e, item.id)}
                className={`flex justify-between items-baseline text-[var(--text-color)] no-underline hover:text-[var(--accent-color)] transition-colors duration-200 group`}
              >
                <span className="text-xs font-sans font-bold uppercase tracking-tighter text-[var(--secondary-text)] mr-4 shrink-0">
                  {item.label}
                </span>
                <span className="flex-grow border-b border-dotted border-[var(--border-color)] mx-2 translate-y-[-4px] opacity-30 group-hover:opacity-100"></span>
                <span className={`font-bold text-right ${item.isModell ? 'italic text-[var(--info-green-light)]' : ''}`}>
                  {item.title}
                </span>
              </a>
              
              {item.sub && (
                <ul className="list-none pl-10 mt-2 space-y-1 border-l border-[var(--border-color)] ml-4">
                  {item.sub.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <a
                        href={subItem.id}
                        onClick={(e) => handleNavigation(e, subItem.id)}
                        className="text-sm text-[var(--secondary-text)] hover:text-[var(--accent-color)] transition-colors duration-200 block py-0.5"
                      >
                        {subItem.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
