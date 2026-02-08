
import React, { useRef, useState, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';
import { Mic, MicOff, Activity, Radio, AlertCircle } from 'lucide-react';

const Live: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [volume, setVolume] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  // Refs for audio handling
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<Promise<any> | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);

  // Helpers - Manual implementation of base64 encode/decode as per guidelines
  const createBlob = (data: Float32Array): Blob => {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = data[i] * 32768;
    }
    const uint8 = new Uint8Array(int16.buffer);
    let binary = '';
    const len = uint8.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(uint8[i]);
    }
    const b64 = btoa(binary);

    return {
      data: b64,
      mimeType: 'audio/pcm;rate=16000',
    };
  };

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const connectToLive = async () => {
    setStatus('connecting');
    setErrorMsg('');
    try {
      // Use process.env.API_KEY directly and recreate instance on each connection.
      const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyC6RE-isFzuCBOsJZ1SlMG0j-vM7K9foxI';
      const ai = new GoogleGenAI({ apiKey });

      // Initialize Input Audio
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      inputContextRef.current = inputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = inputCtx.createMediaStreamSource(stream);
      const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);

      sourceRef.current = source;
      processorRef.current = scriptProcessor;

      // Initialize Output Audio
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;
      nextStartTimeRef.current = 0;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            console.log('Live Session Opened');
            setStatus('connected');
            setIsConnected(true);

            // Start processing mic input
            scriptProcessor.onaudioprocess = (e) => {
              if (isMuted) return;

              const inputData = e.inputBuffer.getChannelData(0);

              // Simple visualization volume
              let sum = 0;
              for (let i = 0; i < inputData.length; i++) sum += inputData[i] * inputData[i];
              setVolume(Math.sqrt(sum / inputData.length));

              const pcmBlob = createBlob(inputData);
              // CRITICAL: Always use the sessionPromise resolves to send realtime input to avoid stale closures.
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Access text using .text property if available, but for audio we use inlineData
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && audioContextRef.current) {
              const ctx = audioContextRef.current;
              // Gapless playback management
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);

              const audioBuffer = await decodeAudioData(
                decode(base64Audio),
                ctx,
                24000,
                1
              );

              const bufferSource = ctx.createBufferSource();
              bufferSource.buffer = audioBuffer;
              bufferSource.connect(ctx.destination);
              bufferSource.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
            }
          },
          onclose: () => {
            console.log('Session Closed');
            setStatus('disconnected');
            setIsConnected(false);
          },
          onerror: (e) => {
            console.error('Session Error', e);
            setStatus('error');
            setErrorMsg('Connection error occurred.');
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          }
        }
      });

      sessionRef.current = sessionPromise;

    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('Failed to access microphone or connect.');
    }
  };

  const disconnect = async () => {
    if (sourceRef.current) sourceRef.current.disconnect();
    if (processorRef.current) processorRef.current.disconnect();
    if (inputContextRef.current) await inputContextRef.current.close();
    if (audioContextRef.current) await audioContextRef.current.close();

    // Explicitly close the session
    sessionRef.current?.then(session => {
      session.close();
    });

    setIsConnected(false);
    setStatus('disconnected');
    setVolume(0);
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 flex items-center justify-center min-h-[80vh]">
      <div className="glass bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] p-10 md:p-20 text-center max-w-2xl w-full shadow-2xl relative overflow-hidden">

        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/10 rounded-full transition-all duration-1000 ${isConnected ? 'scale-150 opacity-50' : 'scale-100 opacity-20'}`} aria-hidden="true"></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full transition-all duration-1000 delay-100 ${isConnected ? 'scale-125 opacity-40' : 'scale-100 opacity-10'}`} aria-hidden="true"></div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-2">Gemini Live</h2>
          <p className="text-white/60 mb-12 text-lg">Real-time conversational AI</p>

          <div className="relative mx-auto w-40 h-40 mb-12 flex items-center justify-center" aria-hidden="true">
            <div
              className="absolute inset-0 bg-orange-500 rounded-full blur-2xl transition-all duration-75"
              style={{ opacity: 0.2 + volume * 2, transform: `scale(${1 + volume})` }}
            ></div>
            <div className="w-32 h-32 bg-gradient-to-tr from-orange-600 to-red-600 rounded-full flex items-center justify-center shadow-lg border border-white/20 relative">
              {status === 'connecting' ? (
                <Activity className="animate-spin text-white" size={40} />
              ) : isConnected ? (
                <Radio className={`text-white ${volume > 0.01 ? 'animate-pulse' : ''}`} size={40} />
              ) : (
                <MicOff className="text-white/50" size={40} />
              )}
            </div>
          </div>

          <div className="mb-8 min-h-[24px]" aria-live="polite" role="status">
            {status === 'connecting' && <span className="text-orange-300 animate-pulse">Establishing connection...</span>}
            {status === 'connected' && <span className="text-green-400 font-medium tracking-wide">LISTENING</span>}
            {status === 'disconnected' && <span className="text-white/40">Ready to connect</span>}
            {status === 'error' && <span className="text-red-400 flex items-center justify-center gap-2"><AlertCircle size={16} /> {errorMsg || 'Error connecting'}</span>}
          </div>

          <div className="flex justify-center gap-6">
            {!isConnected ? (
              <button
                onClick={connectToLive}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-3 border border-white/20 focus:outline-none"
                aria-label="Starta konversation"
              >
                <Mic size={20} aria-hidden="true" />
                Start Conversation
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-4 rounded-xl transition-all border border-white/20 focus:outline-none ${isMuted ? 'bg-red-500/20 text-red-300' : 'bg-white/10 text-white'}`}
                  aria-label={isMuted ? "Slå på ljud" : "Stäng av ljud"}
                >
                  {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                </button>
                <button
                  onClick={disconnect}
                  className="px-8 py-4 bg-red-500/80 hover:bg-red-600 text-white rounded-xl font-bold transition-all hover:scale-105 border border-red-400/30 focus:outline-none"
                  aria-label="Avsluta session"
                >
                  End Session
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;
