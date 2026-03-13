
import React, { useState, useCallback, useRef, useEffect } from 'react';

interface ErrorState {
  therapistName?: string;
  therapistId?: string;
  agreed?: string;
  signature?: string;
}

interface ConsultantAgreementProps {
    onBack: () => void;
}

const ConsultantAgreement: React.FC<ConsultantAgreementProps> = ({ onBack }) => {
  const [therapistName, setTherapistName] = useState('');
  const [therapistId, setTherapistId] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [errors, setErrors] = useState<ErrorState>({});
  
  const [signatureMode, setSignatureMode] = useState<'draw' | 'type'>('draw');
  const [typedSignatureName, setTypedSignatureName] = useState('');

  const signingDate = new Date().toLocaleDateString('sv-SE');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);

  const getCoordinates = (event: MouseEvent | TouchEvent): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear first
    
    if (signatureMode === 'draw') {
        ctx.save();
        ctx.strokeStyle = '#e5e7eb'; // Light gray for grid lines
        ctx.lineWidth = 0.5;
        const gridSize = 20; // Size of each grid cell

        // Draw vertical lines
        for (let x = 0; x <= canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        // Draw horizontal lines
        for (let y = 0; y <= canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        ctx.restore();
    }
  }, [signatureMode]);
  
  const startDrawing = useCallback((event: MouseEvent | TouchEvent) => {
    const coords = getCoordinates(event);
    if (coords) {
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(coords.x, coords.y);
        isDrawingRef.current = true;
      }
    }
  }, []);

  const draw = useCallback((event: MouseEvent | TouchEvent) => {
    if (!isDrawingRef.current) return;
    event.preventDefault();
    const coords = getCoordinates(event);
    if (coords) {
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) {
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
      }
    }
  }, []);

  const stopDrawing = useCallback(() => {
    if (isDrawingRef.current) {
        isDrawingRef.current = false;
        const canvas = canvasRef.current;
        if(canvas) {
            const blank = document.createElement('canvas');
            blank.width = canvas.width;
            blank.height = canvas.height;
            if (canvas.toDataURL() !== blank.toDataURL()) {
                setSignature(canvas.toDataURL('image/png'));
            } else {
                setSignature(null);
            }
        }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || signatureMode !== 'draw') return;
    
    drawGrid(); // Draw grid when entering draw mode or on initial render

    const ctx = canvas.getContext('2d');
    if(ctx){
      ctx.strokeStyle = '#1f2937'; // Darker gray for better contrast
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    // Touch events
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [signatureMode, startDrawing, draw, stopDrawing, drawGrid]);

  useEffect(() => {
    if (signatureMode !== 'type') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (typedSignatureName.trim()) {
        const maxWidth = canvas.width - 40; // 20px padding on each side
        let fontSize = 70; // Starting font size
        
        ctx.font = `${fontSize}px "Dancing Script", cursive`;
        let textWidth = ctx.measureText(typedSignatureName).width;

        // Adjust font size if text is too wide
        while (textWidth > maxWidth && fontSize > 10) { // Don't go below 10px
            fontSize -= 1;
            ctx.font = `${fontSize}px "Dancing Script", cursive`;
            textWidth = ctx.measureText(typedSignatureName).width;
        }

        ctx.fillStyle = '#1f2937';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(typedSignatureName, canvas.width / 2, canvas.height / 2);
        setSignature(canvas.toDataURL('image/png'));
    } else {
        setSignature(null);
    }
  }, [signatureMode, typedSignatureName]);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      if (signatureMode === 'draw') { // Only redraw grid if in draw mode
        drawGrid(); 
      }
      setSignature(null);
      setTypedSignatureName('');
    }
  };
  
  const handleModeChange = (mode: 'draw' | 'type') => {
    if (mode === signatureMode) return;
    setSignatureMode(mode);
    clearSignature();
  };

  const validateField = useCallback((name: keyof ErrorState, value: string): string | undefined => {
    switch (name) {
      case 'therapistName':
        return value.trim() ? undefined : 'Namn måste fyllas i.';
      case 'therapistId':
        return value.trim() ? undefined : 'Personnummer/organisationsnummer måste fyllas i.';
      default:
        return undefined;
    }
  }, []);

  const handleTherapistNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTherapistName(value);
    setErrors(prevErrors => ({
      ...prevErrors,
      therapistName: validateField('therapistName', value)
    }));
  };

  const handleTherapistIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTherapistId(value);
    setErrors(prevErrors => ({
      ...prevErrors,
      therapistId: validateField('therapistId', value)
    }));
  };

  const validateForm = useCallback(() => {
    const newErrors: ErrorState = {};
    const nameError = validateField('therapistName', therapistName);
    const idError = validateField('therapistId', therapistId);

    if (nameError) newErrors.therapistName = nameError;
    if (idError) newErrors.therapistId = idError;
    if (!agreed) {
      newErrors.agreed = 'Du måste godkänna villkoren för att kunna signera.';
    }
    if (!signature) {
      newErrors.signature = 'En signatur krävs för att kunna signera avtalet.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [therapistName, therapistId, agreed, signature, validateField]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSigned(true);
      window.scrollTo(0, 0);
    }
  };

  const InputField: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; error?: string; placeholder: string; name: string; }> = ({ label, value, onChange, error, placeholder, name }) => (
    <div className="my-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-1 block w-full px-3 py-2 bg-white/80 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm text-slate-900`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && <p id={`${name}-error`} className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );

  if (isSigned) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl w-full bg-white/70 backdrop-blur-xl p-8 sm:p-10 lg:p-12 rounded-2xl shadow-2xl text-center border border-white/50">
            <button onClick={onBack} className="absolute top-4 left-4 flex items-center text-slate-600 hover:text-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Tillbaka
            </button>
          <svg className="mx-auto h-16 w-16 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Avtal Signerat!</h1>
          <p className="mt-4 text-base text-gray-600">
            Tack, {therapistName}. Ditt avtal har signerats digitalt den {signingDate}.
            En bekräftelse har skickats till din registrerade e-postadress. Vi ser fram emot vårt samarbete!
          </p>
          <div className="mt-8 p-6 bg-slate-50/80 border border-slate-200 rounded-lg text-left shadow-inner">
            <h2 className="text-lg font-semibold text-gray-800">Signeringsdetaljer</h2>
            <p className="mt-2 text-sm text-gray-600"><strong>Namn:</strong> {therapistName}</p>
            <p className="mt-1 text-sm text-gray-600"><strong>Person/Org.nr:</strong> {therapistId}</p>
            <p className="mt-1 text-sm text-gray-600"><strong>Signeringsdatum:</strong> {signingDate}</p>
            {signature && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 font-semibold">Signatur:</p>
                <div className="mt-1 bg-white border border-gray-300 rounded-md p-2 shadow-inner inline-block">
                  <img src={signature} alt="Terapeutens signatur" className="h-20" />
                </div>
              </div>
            )}
          </div>
          <button 
            onClick={onBack}
            className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Tillbaka till startsidan
          </button>
        </div>
      </div>
    );
  }

  const isButtonDisabled = !therapistName.trim() || !therapistId.trim() || !agreed || !signature || !!errors.therapistName || !!errors.therapistId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 font-sans text-slate-800 py-8 sm:py-12 px-4">
      <main className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl border border-white/50 relative">
        <button 
            onClick={onBack} 
            className="absolute top-6 left-6 flex items-center text-slate-500 hover:text-blue-600 transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Tillbaka
        </button>
        <header className="text-center border-b pb-6 mb-8 border-slate-300/50 pt-8 sm:pt-0">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Horizonten & Klätterträdet</h1>
          <p className="mt-2 text-lg text-slate-600">AVTAL FÖR ANSLUTEN TERAPEUT</p>
          <span className="mt-2 inline-block bg-slate-100 text-slate-500 text-xs font-medium px-2 py-1 rounded-full">Version: Oktober 2025, Granskad</span>
        </header>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="prose prose-slate max-w-none prose-h2:text-slate-900 prose-h2:font-bold prose-h2:border-b prose-h2:pb-2 prose-h2:mt-8 prose-h2:mb-6 prose-p:text-slate-700 prose-p:mb-4 prose-li:my-2">
              <h2 className="font-bold">Parter</h2>
              <p>Detta avtal ingås mellan:</p>
              <ol className="list-decimal list-inside space-y-2 mb-6">
                  <li><strong>Horizonten & Klätterträdet</strong> (”Plattformen”), organisationsnummer [fyll i].</li>
                  <li><strong>Terapeuten</strong>, innehavare av F-skatt.</li>
              </ol>
              
              <div className="bg-slate-50/70 p-4 rounded-lg my-6 border border-slate-200 not-prose shadow-sm">
                  <InputField
                      label="Terapeutens Namn"
                      name="therapistName"
                      value={therapistName}
                      onChange={handleTherapistNameChange}
                      error={errors.therapistName}
                      placeholder="Ange ditt fullständiga namn"
                  />
                  <InputField
                      label="Personnummer / Organisationsnummer"
                      name="therapistId"
                      value={therapistId}
                      onChange={handleTherapistIdChange}
                      error={errors.therapistId}
                      placeholder="ÅÅMMDD-XXXX eller 10 siffror"
                  />
              </div>
              <p className="mt-4"><strong>Avtalsdatum:</strong> {signingDate} (Fylls i vid undertecknande)</p>

              <h2 className="font-bold">1. Syfte</h2>
              <p>Plattformen erbjuder en digital boknings- och mötestjänst för traumaterapi (fokus på PTSD, C-PTSD och relaterade tillstånd). Terapin ska tillhandahållas genom evidensbaserade metoder i enlighet med Socialstyrelsens riktlinjer.</p>
              <p>Terapeuten ansluter sig som självständig konsult för att tillhandahålla kvalificerad terapi till klienter via Plattformen. Avtalet reglerar samarbete, bokning, ersättning och villkor.</p>
              
              <h2 className="font-bold">2. Terapeutens Åtaganden</h2>
              <div className="space-y-4">
                  <p><strong>2.1</strong> Tillhandahålla kvalificerad traumaterapi enligt Plattformens standarder, med evidensbaserade metoder och, vid behov, tekniker som beröring/perception (med klientens skriftliga samtycke och i enlighet med Patientsäkerhetslagen (2010:659)).</p>
                  <p><strong>2.2</strong> Uppvisa relevanta kvalifikationer (t.ex. legitimation som psykolog/psykoterapeut) och meddela förändringar. Terapeuten är ansvarig för och bär kostnaden för egna försäkringar, inklusive ansvarsförsäkring och patientskadeförsäkring.</p>
                  <p><strong>2.3</strong> Ange och uppdatera tillgänglighet i Plattformens bokningssystem.</p>
                  <p><strong>2.4</strong> Följa GDPR, Patientdatalagen (2008:355), gällande lagar och Plattformens riktlinjer för professionalitet.</p>
                  <p><strong>2.5</strong> Föra journaler enligt regelverk via Plattformens eller eget GDPR-säkrat system.</p>
              </div>

              <h2 className="font-bold">3. Plattformens Åtaganden</h2>
              <div className="space-y-4">
                  <p><strong>3.1</strong> Marknadsföra tjänsterna och rådgivande matcha klienter med terapeuter baserat på kvalifikationer, tillgänglighet och behov. Matchning sker utan att ingripa i terapeutens yrkesutövning eller kliniska bedömningar.</p>
                  <p><strong>3.2</strong> Tillhandahålla digitalt bokningssystem och videomöten.</p>
                  <p><strong>3.3</strong> Hantera fakturering till klient och betalningar samt rabatter utan att påverka Terapeutens ersättning.</p>
              </div>

              <h2 className="font-bold">4. Ekonomiska Villkor</h2>
              <div className="space-y-4">
                  <p><strong>4.1</strong> Ersättning till Terapeuten utgör [ange procentsats]% av det klientpris som anges i bokningssystemet vid bokningstillfället, exklusive moms.</p>
                  <p><strong>4.2</strong> Plattformen betalar ut Terapeutens ersättning månadsvis i efterskott till angivet bankkonto, baserat på genomförda sessioner föregående månad.</p>
                  <p><strong>4.3</strong> Terapeuten är själv ansvarig för att betala skatter, sociala avgifter och andra avgifter relaterade till sin verksamhet.</p>
              </div>

              <h2 className="font-bold">5. Avbokningsregler</h2>
              <p>Avbokning måste ske senast 24 timmar före bokad tid. Vid sen avbokning eller uteblivet besök har Plattformen rätt att debitera klienten fullt pris, och Terapeuten erhåller sin del av ersättningen som om sessionen genomförts.</p>
              
              <h2 className="font-bold">6. Avtalstid och Uppsägning</h2>
              <p>Avtalet gäller tills vidare med en ömsesidig uppsägningstid om tre (3) månader. Uppsägning ska ske skriftligen.</p>
              
              <h2 className="font-bold">7. Sekretess och Dataskydd</h2>
              <p>Båda parter förbinder sig att följa gällande sekretesslagstiftning och dataskyddsförordningen (GDPR). All klientinformation är strikt konfidentiell.</p>

              <h2 className="font-bold">8. Ansvarsbegränsning</h2>
              <p>Plattformen är inte part i vårdrelationen mellan Terapeut och klient och ansvarar inte för innehållet i eller utförandet av terapin. Terapeutens ansvar regleras av gällande lag och yrkesetiska riktlinjer.</p>

              <h2 className="font-bold">9. Tvist</h2>
              <p>Tvist rörande tolkning eller tillämpning av detta avtal ska i första hand lösas genom förhandling. Om enighet inte kan nås ska tvisten avgöras av allmän domstol.</p>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-300/50">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Signering av Avtal</h2>
            <div className="mt-4 p-4 bg-slate-50/70 border border-slate-200 rounded-lg shadow-sm">
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="agreed"
                            name="agreed"
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => {
                              setAgreed(e.target.checked);
                              setErrors(prevErrors => ({
                                ...prevErrors,
                                agreed: e.target.checked ? undefined : 'Du måste godkänna villkoren för att kunna signera.'
                              }));
                            }}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            aria-describedby="agreed-description"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="agreed" className="font-medium text-gray-700">
                            Godkännande av villkor
                        </label>
                        <p id="agreed-description" className="text-gray-600">
                            Jag har läst, förstått och godkänner samtliga villkor i detta avtal.
                        </p>
                    </div>
                </div>
                {errors.agreed && <p className="mt-2 text-sm text-red-600">{errors.agreed}</p>}
            </div>

            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Digital Signatur
                </label>
                <div className="flex border-b border-gray-300/80">
                    <button
                        type="button"
                        onClick={() => handleModeChange('draw')}
                        aria-pressed={signatureMode === 'draw'}
                        className={`-mb-px px-4 py-2 text-sm font-semibold border-b-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-t-md ${
                            signatureMode === 'draw' 
                            ? 'border-blue-600 text-blue-600' 
                            : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-400'
                        }`}
                    >
                        Rita
                    </button>
                    <button
                        type="button"
                        onClick={() => handleModeChange('type')}
                        aria-pressed={signatureMode === 'type'}
                        className={`-mb-px px-4 py-2 text-sm font-semibold border-b-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-t-md ${
                            signatureMode === 'type' 
                            ? 'border-blue-600 text-blue-600' 
                            : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-400'
                        }`}
                    >
                        Skriv
                    </button>
                </div>
                <div className="pt-4 mt-[-1px] border-t border-gray-300/80">
                    {signatureMode === 'type' && (
                        <div className="mb-4">
                            <label htmlFor="typed-signature" className="sr-only">Skriv ditt namn för signatur</label>
                            <input
                                id="typed-signature"
                                type="text"
                                value={typedSignatureName}
                                onChange={(e) => {
                                  setTypedSignatureName(e.target.value);
                                  // Clear signature error if user starts typing
                                  setErrors(prevErrors => ({ ...prevErrors, signature: undefined }));
                                }}
                                placeholder="Skriv ditt fullständiga namn här"
                                className="block w-full px-3 py-2 bg-white/80 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm text-slate-900"
                            />
                        </div>
                    )}
                    <div className="relative group">
                        <canvas
                            id="signature-canvas"
                            ref={canvasRef}
                            width="500"
                            height="200"
                            className={`w-full bg-white/80 border border-gray-300 rounded-lg shadow-sm ${signatureMode === 'draw' ? 'touch-none cursor-crosshair' : 'cursor-default'}`}
                            aria-label="Signaturfält"
                        />
                        <button
                            type="button"
                            onClick={clearSignature}
                            className="absolute top-2 right-2 px-3 py-1 text-xs font-semibold text-gray-600 bg-gray-100/80 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 opacity-50 group-hover:opacity-100 transition-opacity"
                            aria-label="Rensa signatur"
                        >
                            Rensa
                        </button>
                    </div>
                </div>
                {errors.signature && <p className="mt-1 text-sm text-red-600">{errors.signature}</p>}
            </div>


            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isButtonDisabled}
                aria-disabled={isButtonDisabled}
                className={`
                  px-8 py-3 w-full sm:w-auto
                  font-semibold text-white 
                  rounded-xl shadow-lg 
                  transition-all duration-300 ease-in-out
                  transform
                  focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500/50
                  ${isButtonDisabled 
                    ? 'bg-gray-400/70 cursor-not-allowed' 
                    : 'bg-blue-600/80 backdrop-blur-sm border border-white/30 hover:bg-blue-700/90 active:scale-95'}
                `}
              >
                Signera Avtal
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ConsultantAgreement;
