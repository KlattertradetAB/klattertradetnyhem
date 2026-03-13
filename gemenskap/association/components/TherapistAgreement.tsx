
import React, { useState } from 'react';
import { PenTool, AlertCircle, Download, Send } from 'lucide-react';
import ContractDocument from './ContractDocument';

const TherapistAgreement: React.FC = () => {
  const [therapistName, setTherapistName] = useState('');
  const [therapistOrgNum, setTherapistOrgNum] = useState('');
  const [signDate, setSignDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Signature and Checkbox State
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [infoCertified, setInfoCertified] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);

  const handleSignatureSave = (dataUrl: string) => {
    setSignatureData(dataUrl);
  };

  const handleSignatureClear = () => {
    setSignatureData(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Intresseanmälan & Signerat Samarbetsavtal - ${therapistName}`);
    const body = encodeURIComponent(
`Hej Billy,

Härmed skickar jag min intresseanmälan och bekräftar att jag har tagit del av samt signerat samarbetsavtalet digitalt.

Mina uppgifter:
Namn: ${therapistName}
Person-/Org.nummer: ${therapistOrgNum}
Datum för underskrift: ${signDate}

Status:
[x] Jag har accepterat villkoren i avtalet.
[x] Jag intygar att mina uppgifter är korrekta.
[x] Digital signatur har genererats och bifogas (mentalt/via systemlogg).

Vänligen granska min anmälan och återkom för motsignering.

Hälsningar,
${therapistName}`
    );
    
    window.location.href = `mailto:billy@klattertradet.se?subject=${subject}&body=${body}`;
  };
  
  return (
    <div className="pb-12 print:pb-0 font-sans text-slate-800">
      <style>{`
        @media print {
          @page {
            margin: 20mm;
          }
          body {
            background-color: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          .print-break-inside-avoid {
            break-inside: avoid;
          }
          /* Hide parent headers and footers from the main app */
          header, footer, nav {
            display: none !important;
          }
        }
      `}</style>
      <div className="max-w-5xl mx-auto px-4 pt-8 print:p-0 print:max-w-none">
        
        {/* Intro Box - Hidden on Print */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 shadow-sm no-print">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-full mt-1">
              <AlertCircle className="text-blue-600 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-2 font-serif">Process för intresseanmälan och avtalstecknande</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Detta avtal fungerar inledningsvis som en intresseanmälan. Om du vill bli en del av Horizonten & Klätterträdet:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-slate-700 ml-1">
                <li className="pl-2"><span className="font-semibold">Fyll i dina uppgifter</span> i fälten nedan.</li>
                <li className="pl-2"><span className="font-semibold">Läs igenom avtalet</span> noga.</li>
                <li className="pl-2"><span className="font-semibold">Godkänn och signera</span> längst ner i dokumentet (Sektion 9).</li>
                <li className="pl-2">Klicka på "Skicka in" för att meddela ledningen.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Input Bar - Hidden on Print */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8 no-print">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <PenTool size={18} className="text-slate-500" />
              1. Fyll i dina uppgifter
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Terapeutens Namn</label>
                <input 
                  type="text" 
                  value={therapistName}
                  onChange={(e) => setTherapistName(e.target.value)}
                  placeholder="Förnamn Efternamn"
                  className="w-full border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2 border bg-white text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Person-/Org.nummer</label>
                <input 
                  type="text" 
                  value={therapistOrgNum}
                  onChange={(e) => setTherapistOrgNum(e.target.value)}
                  placeholder="ÅÅMMDD-XXXX"
                  className="w-full border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2 border bg-white text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Datum för underskrift</label>
                <input 
                  type="date" 
                  value={signDate}
                  onChange={(e) => setSignDate(e.target.value)}
                  className="w-full border-slate-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2 border bg-white text-slate-900"
                />
              </div>
            </div>
        </div>

        {/* Contract Preview - Visible on Print */}
        <div className="bg-white shadow-lg print:shadow-none max-w-[210mm] mx-auto min-h-[297mm] p-[20mm] print:p-0 mb-24 print:mb-0 relative text-slate-900">
          <ContractDocument 
            therapistName={therapistName}
            therapistOrgNum={therapistOrgNum}
            signDate={signDate}
            signatureData={signatureData}
            termsAccepted={termsAccepted}
            infoCertified={infoCertified}
            setTermsAccepted={setTermsAccepted}
            setInfoCertified={setInfoCertified}
            onSignatureSave={handleSignatureSave}
            onSignatureClear={handleSignatureClear}
          />
        </div>

        {/* Action Bar (Only visible when signed) */}
        {signatureData && termsAccepted && infoCertified && (
           <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg flex flex-col sm:flex-row justify-center items-center gap-4 no-print z-50 animate-in slide-in-from-bottom duration-300">
             <div className="text-sm text-slate-500 font-medium mb-2 sm:mb-0 sm:mr-4">
                Avtalet är klart! Välj nästa steg:
             </div>
             <div className="flex gap-3 w-full sm:w-auto">
               <button 
                 onClick={handlePrint}
                 className="flex-1 sm:flex-none border-2 border-slate-900 text-slate-900 px-6 py-3 rounded-md font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
               >
                 <Download size={20} />
                 Spara PDF
               </button>
               <button 
                 onClick={handleSendEmail}
                 className="flex-1 sm:flex-none bg-emerald-600 text-white px-8 py-3 rounded-md font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
               >
                 <Send size={20} />
                 Skicka in
               </button>
             </div>
           </div>
        )}

      </div>
    </div>
  );
};

export default TherapistAgreement;
