import React from 'react';
import { Section } from '../types';
import { ArrowRight, Brain, Activity, TrendingUp } from 'lucide-react';

interface HeroProps {
  setSection: (section: Section) => void;
}

const Hero: React.FC<HeroProps> = ({ setSection }) => {
  return (
    <div className="relative bg-hkm-sand text-hkm-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1>
              <span className="block text-sm font-semibold uppercase tracking-wide text-hkm-teal mb-2">
                Horizontens Kvalitetsmarkering
              </span>
              <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                <span className="block text-hkm-dark">Din Försäkran om</span>
                <span className="block text-hkm-teal mt-2">Specialistkompetens</span>
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              HKM är mer än en stämpel – det är ett levande bevis på att din kunskap andas. Symbolen för att du upprätthåller högsta standard inom traumamedvetenhet och neurobiologisk reglering.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <button
                onClick={() => setSection(Section.CHECKLIST)}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-hkm-teal hover:bg-teal-700 md:py-4 md:text-lg md:px-10 shadow-lg transition-transform transform hover:-translate-y-0.5"
              >
                Är du redo? <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md bg-white p-8">
              <h3 className="text-2xl font-serif text-hkm-dark mb-6 border-b pb-4">Varför HKM?</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Brain className="h-6 w-6 text-hkm-gold" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-hkm-dark">Bottom-Up Expertis</h4>
                    <p className="mt-1 text-gray-600">Du behärskar den dynamiska kopplingen mellan kropp och psyke.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Activity className="h-6 w-6 text-hkm-gold" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-hkm-dark">Systemförståelse</h4>
                    <p className="mt-1 text-gray-600">Navigera myndighetsinducerat trauma och komplexa strukturer.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-hkm-gold" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-hkm-dark">Ingen Stagnation</h4>
                    <p className="mt-1 text-gray-600">Ett löfte om att vara del av en ständigt växande Horizont.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;