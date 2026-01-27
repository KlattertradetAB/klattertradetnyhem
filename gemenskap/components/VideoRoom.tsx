import React, { useState, useEffect, useRef } from 'react';
import {
    Video, VideoOff, Mic, MicOff, PhoneOff,
    Users, Maximize2, Settings, MessageSquare,
    Sparkles, Camera
} from 'lucide-react';

import CommunityChat from './CommunityChat';
import { Profile } from '../types';

interface VideoRoomProps {
    roomId: string;
    user: Profile; // Need user for chat
    onEndCall: () => void;
}

export const VideoRoom: React.FC<VideoRoomProps> = ({ roomId, user, onEndCall }) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [isJoining, setIsJoining] = useState(true);
    const [showChat, setShowChat] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                setStream(mediaStream);
                setIsJoining(false);
            } catch (err) {
                console.error("Error accessing camera:", err);
                setIsJoining(false);
            }
        };

        const timer = setTimeout(startCamera, 800);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    // Attach stream when video element or stream changes
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    const toggleMic = () => {
        if (stream) {
            stream.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsMuted(!isMuted);
        }
    };

    const toggleVideo = () => {
        if (stream) {
            stream.getVideoTracks().forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsVideoOff(!isVideoOff);
        }
    };

    if (isJoining) {
        return (
            <div className="flex-grow flex flex-col items-center justify-center bg-slate-950/40 animate-pulse">
                <div className="w-24 h-24 bg-orange-500/20 rounded-[2.5rem] flex items-center justify-center text-orange-400 mb-6 border border-orange-500/30">
                    <Camera size={40} className="animate-bounce" />
                </div>
                <h3 className="text-2xl font-black text-white italic tracking-tighter">Ansluter till kameran...</h3>
                <p className="text-slate-500 text-sm mt-2 uppercase tracking-widest font-bold">Säkrar anslutning</p>
            </div>
        );
    }

    return (
        <div className="flex-grow flex flex-col relative overflow-hidden bg-slate-950/20 h-full">
            {/* Main Video Stage */}
            <div className="flex-grow relative p-4 md:p-8 flex items-center justify-center min-h-0">
                <div className="relative w-full h-full max-w-5xl rounded-2xl md:rounded-[3rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.6)] border border-white/10 group bg-slate-900">
                    {/* Background glow effects */}
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-orange-500/20 transition-colors duration-1000"></div>

                    {/* The Video Stream */}
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted={isMuted}
                        className={`w-full h-full object-cover transition-all duration-700 ${isVideoOff ? 'opacity-0 scale-110 grayscale' : 'opacity-100 scale-100 grayscale-0'}`}
                    />

                    {/* Placeholder when video is off */}
                    {isVideoOff && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-3xl animate-in fade-in duration-500">
                            <div className="w-20 h-20 md:w-32 md:h-32 bg-slate-800 rounded-full flex items-center justify-center text-slate-600 mb-4 border border-white/5 shadow-2xl">
                                <VideoOff size={32} className="md:w-12 md:h-12" />
                            </div>
                            <p className="text-white font-black italic text-lg md:text-xl">Kameran är avstängd</p>
                        </div>
                    )}

                    {/* Participant Name Overlay */}
                    <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 bg-slate-950/60 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl shadow-2xl">
                        <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] md:text-sm font-black text-white uppercase tracking-widest whitespace-nowrap">Du (Värd)</span>
                    </div>

                    {/* Room Branding Overlay */}
                    <div className="absolute top-4 right-4 md:top-10 md:right-10 opacity-40 group-hover:opacity-100 transition-opacity">
                        <img src="/assets/logo2.png" alt="Horizonten" className="w-8 h-8 md:w-12 md:h-12 object-contain grayscale brightness-200" />
                    </div>
                </div>
            </div>

            {/* Participants Sidebar (Responsive: Bottom on mobile, Right on desktop) */}
            <div className="hidden">
                {[1, 2].map((p) => (
                    <div key={p} className="w-20 h-24 md:w-24 md:h-32 shrink-0 rounded-2xl md:rounded-3xl bg-slate-900/80 border border-white/10 overflow-hidden shadow-2xl hover:scale-105 transition-all cursor-pointer group relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Users size={20} className="text-slate-700 md:w-6 md:h-6 group-hover:text-orange-500/50 transition-colors" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                        <div className="absolute bottom-2 inset-x-0 text-center">
                            <span className="text-[8px] font-black text-white/60 uppercase tracking-tighter">Väntar...</span>
                        </div>
                    </div>
                ))}
                <div className="w-20 h-24 md:w-24 md:h-32 shrink-0 rounded-2xl md:rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-slate-600 hover:border-orange-500/50 hover:text-orange-500 transition-all cursor-pointer bg-white/5">
                    <Sparkles size={16} className="md:w-5 md:h-5 mb-1" />
                    <span className="text-[8px] font-black uppercase">Bjud in</span>
                </div>
            </div>

            {/* Deluxe Control Bar */}
            <div className="px-4 pb-4 md:px-12 md:pb-12 pt-2 relative z-10 shrink-0">
                <div className="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-3xl border border-white/10 rounded-2xl md:rounded-[2.5rem] p-2 md:p-4 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="hidden sm:flex items-center gap-4 px-2 md:px-6">
                        <div className="p-2 md:p-3 bg-orange-500/10 rounded-xl md:rounded-2xl text-orange-500">
                            <Video size={18} className="md:w-5 md:h-5" />
                        </div>
                        <div className="hidden md:block">
                            <h4 className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest leading-none mb-1">Live: {roomId}</h4>
                            <p className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-tight">HD • Krypterat</p>
                        </div>
                    </div>

                    <div className="flex flex-1 md:flex-initial justify-center items-center gap-2 md:gap-4 px-2">
                        <button
                            onClick={toggleMic}
                            className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all ${isMuted ? 'bg-red-500 text-white' : 'bg-white/5 text-slate-400 border border-white/10'}`}
                        >
                            {isMuted ? <MicOff size={18} className="md:w-6 md:h-6" /> : <Mic size={18} className="md:w-6 md:h-6" />}
                        </button>
                        <button
                            onClick={toggleVideo}
                            className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all ${isVideoOff ? 'bg-red-500 text-white' : 'bg-white/5 text-slate-400 border border-white/10'}`}
                        >
                            {isVideoOff ? <VideoOff size={18} className="md:w-6 md:h-6" /> : <Video size={18} className="md:w-6 md:h-6" />}
                        </button>
                        <button className="hidden sm:flex w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/5 text-slate-400 border border-white/10 items-center justify-center transition-all">
                            <Maximize2 size={18} className="md:w-6 md:h-6" />
                        </button>

                        <div className="w-[1px] h-6 md:h-8 bg-white/10 mx-1 md:mx-2 uppercase text-white"></div>

                        {/* Chat Toggle */}
                        <button
                            onClick={() => setShowChat(!showChat)}
                            className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all border ${showChat ? 'bg-white text-slate-900 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/5 text-slate-400 border-white/10'}`}
                        >
                            <MessageSquare size={18} className="md:w-5 md:h-5" />
                        </button>

                        <button
                            onClick={onEndCall}
                            className="px-4 md:px-8 h-10 md:h-14 bg-red-600 hover:bg-red-500 text-white rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center gap-2 md:gap-3 transition-all shadow-[0_10px_30px_rgba(220,38,38,0.3)] active:scale-95"
                        >
                            <PhoneOff size={16} className="md:w-5 md:h-5" />
                            <span className="hidden xs:inline">Avsluta</span>
                            <span className="xs:hidden">Lämna</span>
                        </button>
                    </div>

                    <div className="hidden sm:flex items-center gap-4 px-2 md:px-6">
                        {/* Right placeholder */}
                    </div>
                </div>
            </div>

            {/* Chat Overlay Section */}
            <div className={`absolute top-0 bottom-20 md:bottom-28 right-0 w-full sm:w-96 bg-slate-900/95 backdrop-blur-xl border-l border-white/10 z-20 transition-transform duration-300 ease-in-out ${showChat ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="h-full flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-slate-900 to-transparent z-10 pointer-events-none"></div>
                    <CommunityChat user={user} threadId={`video-${roomId}`} showHeader={false} />
                </div>
            </div>

        </div>
    );
};
