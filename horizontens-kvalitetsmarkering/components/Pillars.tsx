import React from 'react';
import { Share2, Shield, Zap } from 'lucide-react';

const Pillars: React.FC = () => {
  return (
    <div className="py-16 bg-white overflow-hidden lg:py-24">
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="relative">
          <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-hkm-dark sm:text-4xl font-serif">
            Kvalitetsmarkeringens Tre Pelare
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
            Genom HKM kliver du in i en kvalitetsstruktur byggd för din hållbarhet och utveckling.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Pillar 1 */}
          <div className="flex flex-col bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-8">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-hkm-teal text-white mb-6">
              <Share2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-hkm-dark mb-4">Specialist Branding & Nätverk</h3>
            <p className="mt-2 text-base text-gray-600 flex-grow">
              Synlighet som skapar tillit. Du får full rättighet att använda HKM-logotypen i all din marknadsföring och en listning som "Certifierad Praktiker" på Horizontens Hub.
            </p>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-hkm-teal font-semibold">Signalerar omedelbar trygghet</p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-8 mt-10 lg:mt-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-hkm-teal text-white mb-6">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-hkm-dark mb-4">Fördjupad Handledning</h3>
            <p className="mt-2 text-base text-gray-600 flex-grow">
              För att orka hålla andra, måste du själv bli hållen. Tillgång till Horizontens specialistteam med fokus på fixerade markörer och grundsår. 50% av tiden sker i grupp för relationell spegling.
            </p>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-hkm-teal font-semibold">Skydd mot sekundärt trauma</p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex flex-col bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-8 mt-10 lg:mt-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-hkm-teal text-white mb-6">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-hkm-dark mb-4">Dynamisk Kompetensutveckling</h3>
            <p className="mt-2 text-base text-gray-600 flex-grow">
              Alltid i framkant av Intrapersonell Neurobiologi. Årligt HKM-Forum och en obligatorisk online-modul (Annual Update) för att integrera de senaste bottom-up-strategierna.
            </p>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-hkm-teal font-semibold">Det Etiska Löftet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pillars;