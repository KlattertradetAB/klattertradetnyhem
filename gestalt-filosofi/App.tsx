
import React, { useState, useEffect } from 'react';
import Question from './components/Question';
import { analyzeReflections } from './services/geminiService';

interface AppProps {
  onBack?: () => void;
}

const App: React.FC<AppProps> = ({ onBack }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Question map to help with download and email labels
  const questionLabels: Record<string, string> = {
    'ex_1': 'Hur kan tanken om "existens före essens" påverka en persons syn på sin egen framtid?',
    'ex_2': 'Exempel på existentiell ångest i terapi?',
    'ex_3': 'Ansvaret för ens egna val - befriande eller betungande?',
    'fe_1': 'Fenomenologisk inställning vid starka känslor?',
    'fe_2': 'Exempel på epoché (att sätta i parentes)?',
    'fe_3': 'Fenomenologiskt vs medicinskt perspektiv?',
    'case_1': 'Reflektioner för Fall 1: "Valets tyngd"',
    'case_2a': 'Reflektioner för Fall 2: "Tomheten inom mig" (Arbetssätt)',
    'case_2b': 'Frågor och observationer för Fall 2'
  };

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gestalt_worksheet_answers');
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
      } catch (e) {
        console.error("Could not load saved answers");
      }
    }
  }, []);

  // Save progress on change
  useEffect(() => {
    localStorage.setItem('gestalt_worksheet_answers', JSON.stringify(answers));
  }, [answers]);

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleAnalyzeAndSend = async () => {
    const answeredCount = Object.values(answers).filter((v: string) => v.trim().length > 0).length;
    if (answeredCount < 3) {
      alert("Svara på några fler frågor innan du skickar in!");
      return;
    }

    setIsAnalyzing(true);

    // 1. Get AI Analysis for immediate feedback
    const result = await analyzeReflections(answers);
    setAnalysis(result);
    setIsAnalyzing(false);

    // 2. Prepare and trigger email to Billy
    const emailHeader = "GUESTALT ARBETSBLAD - SVAR\n============================\n\n";
    const emailBodyContent = Object.entries(questionLabels)
      .map(([id, label]) => `FRÅGA: ${label}\nSVAR: ${answers[id] || "(Inget svar)"}`)
      .join("\n\n----------------------------\n\n");

    const fullBody = emailHeader + emailBodyContent;
    const subject = encodeURIComponent("Gestalt Arbetsblad - Inskickade svar");
    const body = encodeURIComponent(fullBody);

    // Open user's email client
    window.location.href = `mailto:billy@klattertradet.se?subject=${subject}&body=${body}`;
  };

  const handleDownload = () => {
    let content = "GUESTALT ARBETSBLAD - SVAR\n";
    content += "============================\n\n";

    Object.entries(questionLabels).forEach(([id, label]) => {
      content += `FRÅGA: ${label}\n`;
      content += `SVAR: ${answers[id] || "(Inget svar)"}\n`;
      content += "----------------------------\n\n";
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gestalt_arbetsblad_svar.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:px-8">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 no-print">
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={onBack}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-800 rounded-xl hover:bg-slate-50 transition-all font-medium shadow-sm active:scale-95"
          >
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Tillbaka
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-800 rounded-xl hover:bg-slate-50 transition-all font-medium shadow-sm active:scale-95"
          >
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Skriv ut / PDF
          </button>
        </div>
        <div className="text-xs text-slate-400 italic font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
          Vi hanterar all infomation från dig enligt vår integritets- & sekretess policy
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white p-6 md:p-14 rounded-3xl shadow-custom border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-slate-800"></div>

        <header className="border-b border-slate-100 pb-10 mb-12">
          <h1 className="serif-font text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
            Arbetsblad: Existentialism och Fenomenologi
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-light">
            En reflekterande guide som fördjupar förståelsen för Gestaltterapins filosofiska fundament.
          </p>
        </header>

        <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-12 italic text-slate-600 leading-relaxed">
          Här får du möjlighet att fördjupa dig i områdena Existentialismens och Fenomenologi och förhoppningsvis hur centrala roller de speglar inom Gestaltterapin. Vi hoppas även att om än lite så kan detta ge någonting till dig också i ditt privatliv!
        </section>

        <article className="prose prose-slate max-w-none mb-16 text-slate-700">
          <p>
            Ett särskilt fokus kommer att ligga på att klargöra varför humanismen trots dess popularitet inte bör ses som en integrerad del av den genuina Gestaltterapins filosofiska grund.
            Existentialism och Humanism är olika filosofiska skolor och bör därav behandlas som olika.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="p-6 bg-blue-50/40 rounded-2xl border border-blue-100/50">
              <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center text-xs font-black">1</span>
                Grunderna
              </h4>
              <p className="text-sm text-blue-800/80 leading-relaxed">En grundlig introduktion till existentialismen och fenomenologin i Gestaltterapins ramverk.</p>
            </div>
            <div className="p-6 bg-slate-50/80 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 bg-slate-200 text-slate-600 rounded-md flex items-center justify-center text-xs font-black">2</span>
                Distinktioner
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">En analys av skillnaderna mellan den filosofiska kärnan och humanistiska strömningar.</p>
            </div>
          </div>
        </article>

        {/* DEL 1 */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="serif-font text-3xl font-bold text-slate-900">Del 1: Att utforska Existentialismen</h2>
            <div className="h-px flex-1 bg-slate-100"></div>
          </div>
          <p className="mb-10 text-slate-500 italic max-w-2xl">
            Existentialismen betonar individens frihet, ansvar och sökande efter mening i en synbarligen meningslös värld.
          </p>

          <Question
            data={{ id: 'ex_1', label: 'Hur kan tanken om "existens före essens" påverka en persons syn på sin egen framtid och sina möjligheter?', type: 'textarea' }}
            value={answers['ex_1'] || ''}
            onChange={handleAnswerChange}
          />

          <Question
            data={{ id: 'ex_2', label: 'Ge ett exempel på en situation där en klient i terapi skulle kunna uppleva existentiell ångest. Hur kan terapeutens förståelse för detta begrepp vara hjälpsam?', type: 'textarea' }}
            value={answers['ex_2'] || ''}
            onChange={handleAnswerChange}
          />

          <Question
            data={{ id: 'ex_3', label: 'På vilket sätt kan ansvaret för ens egna val kännas både befriande och betungande? Diskutera.', type: 'textarea' }}
            value={answers['ex_3'] || ''}
            onChange={handleAnswerChange}
          />
        </div>

        {/* DEL 2 */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="serif-font text-3xl font-bold text-slate-900">Del 2: Fenomenologins roll</h2>
            <div className="h-px flex-1 bg-slate-100"></div>
          </div>
          <p className="mb-10 text-slate-500 italic max-w-2xl">
            Fenomenologin syftar till att studera fenomen som de uppenbarar sig i vårt medvetande. Det handlar inte om varför något händer, utan hur det upplevs.
          </p>

          <Question
            data={{ id: 'fe_1', label: 'Hur kan en fenomenologisk inställning (att beskriva upplevelsen utan att tolka den) vara användbar när en person berättar om en stark känsla som ilska eller sorg?', type: 'textarea' }}
            value={answers['fe_1'] || ''}
            onChange={handleAnswerChange}
          />

          <Question
            data={{ id: 'fe_2', label: 'Ge ett exempel på en förutfattad mening eller fördom som en terapeut skulle kunna behöva "sätta i parentes" (epoché) för att fullt ut förstå en klients unika upplevelse.', type: 'textarea' }}
            value={answers['fe_2'] || ''}
            onChange={handleAnswerChange}
          />

          <Question
            data={{ id: 'fe_3', label: 'På vilket sätt skiljer sig ett fenomenologiskt perspektiv från ett medicinskt eller diagnostiskt perspektiv när det gäller att förstå mänskligt lidande?', type: 'textarea' }}
            value={answers['fe_3'] || ''}
            onChange={handleAnswerChange}
          />
        </div>

        {/* DEL 3 */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="serif-font text-3xl font-bold text-slate-900">Del 3: Praktik & Case</h2>
            <div className="h-px flex-1 bg-slate-100"></div>
          </div>

          <div className="bg-amber-50/40 p-10 rounded-3xl border border-amber-100/50 mb-8 shadow-sm">
            <h3 className="serif-font text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
              Fallbeskrivning 1: "Valets tyngd"
            </h3>
            <p className="text-slate-700 mb-8 leading-relaxed">
              <em>Anna (35 år) känner sig olycklig på sitt jobb men vågar inte sluta då hon inte vet vad hon annars skulle göra. Hon känner sig fångad av omständigheterna.</em>
            </p>
            <Question
              data={{ id: 'case_1', label: 'Mina anteckningar/reflektioner för Fall 1:', type: 'textarea' }}
              value={answers['case_1'] || ''}
              onChange={handleAnswerChange}
            />
          </div>

          <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="serif-font text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              Fallbeskrivning 2: "Tomheten inom mig"
            </h3>
            <p className="text-slate-700 mb-8 leading-relaxed">
              <em>Erik (28 år) beskriver en känsla av tomhet och meningslöshet trots att han har ett "bra liv" på pappret.</em>
            </p>
            <Question
              data={{ id: 'case_2a', label: 'Rollspel/diskussion: Hur skulle du som Gestaltterapeut arbeta med detta uttalande?', type: 'textarea' }}
              value={answers['case_2a'] || ''}
              onChange={handleAnswerChange}
            />
            <Question
              data={{ id: 'case_2b', label: 'Vilka frågor skulle du ställa? Vilka observationer skulle du göra?', type: 'textarea' }}
              value={answers['case_2b'] || ''}
              onChange={handleAnswerChange}
            />
          </div>
        </div>

        {/* Beautiful Actions Section */}
        <div className="no-print mt-24 mb-12 overflow-hidden bg-slate-50 rounded-3xl border border-slate-100">
          <div className="p-10 md:p-14 text-center">
            <h3 className="serif-font text-3xl font-bold text-slate-900 mb-4">Redo att slutföra?</h3>
            <p className="text-slate-500 mb-10 max-w-lg mx-auto">
              Skicka in dina svar till oss och få en omedelbar AI-reflektion som stöd för din process.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-semibold rounded-2xl hover:bg-slate-50 border border-slate-200 transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow active:scale-[0.98]"
              >
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Ladda hem svaren
              </button>

              <button
                onClick={handleAnalyzeAndSend}
                disabled={isAnalyzing}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 active:scale-[0.98]"
              >
                {isAnalyzing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Skickar in...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Skicka in svaret & få en reflektion
                  </>
                )}
              </button>
            </div>
          </div>

          {analysis && (
            <div className="px-10 pb-14 md:px-14 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="p-8 bg-blue-900 rounded-2xl text-white shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Vår Reflektion
                </h4>
                <div className="whitespace-pre-wrap italic text-blue-50 leading-loose prose prose-invert max-w-none font-medium">
                  {analysis}
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-24 pt-12 border-t border-slate-100 text-center">
          <p className="serif-font text-2xl font-bold text-slate-900 mb-6 italic">Som avslut så kan vi fråga oss: Vad händer nu?</p>
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-slate-600 leading-relaxed text-lg font-light">
              Du får gärna skicka in dina svar och få en reflektion tillbaka från oss och vi rekomenderar samtidigt att du besöker vår blogg: <a href="http://www.klattertradet.se/blogg" className="text-blue-600 hover:text-blue-700 underline underline-offset-4 decoration-blue-200 font-semibold transition-colors">www.klattertradet.se/blogg</a> samtidigt så påminner vi om våra community möjligheter
            </p>
          </div>
          <div className="flex flex-col items-center justify-center mt-16 gap-4">
            <div className="flex items-center gap-4 text-xs font-bold tracking-widest text-slate-300 uppercase">
              <span>Klätterträdet © 2024</span>
              <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
              <span>Horisonten Community</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
