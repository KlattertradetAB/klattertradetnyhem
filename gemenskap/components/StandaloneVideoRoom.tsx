import React, { useEffect, useState } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { Loader2 } from 'lucide-react';
import { supabase } from '../services/supabase';

// This component acts as a full-screen dedicated page for video meetings
export function StandaloneVideoRoom() {
    const [roomName, setRoomName] = useState<string>('');
    const [userName, setUserName] = useState<string>('Gäst');

    useEffect(() => {
        // Extract room name from URL query parameter
        const params = new URLSearchParams(window.location.search);
        const room = params.get('room');
        if (room) {
            // Prepend a unique hard-to-guess prefix so Klätterträdet rooms don't collide with public Jitsi ones
            setRoomName(`Klattertradet_${room.replace(/[^a-zA-Z0-9_-]/g, '')}`);
        } else {
            setRoomName('Klattertradet_Mote_Gemenskap');
        }

        // Try to fetch user name if they are logged in via Supabase
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                const { data } = await supabase.from('profiles').select('full_name').eq('id', session.user.id).single();
                if (data?.full_name) {
                    setUserName(data.full_name);
                }
            }
        };
        fetchUser();
    }, []);

    if (!roomName) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
                <h2 className="text-2xl font-bold text-white">Förbereder ditt mötesrum...</h2>
            </div>
        );
    }

    return (
        <div className="w-full h-screen bg-slate-950 flex flex-col relative">


            {/* Jitsi Meeting Container */}
            <div className="flex-1 w-full bg-slate-950 relative overflow-hidden">
                {/* Visual mask to hide Jitsi logo in top-left corner if config fails */}
                <div className="absolute top-0 left-0 w-24 h-16 bg-slate-950 z-[5] pointer-events-none"></div>

                <JitsiMeeting
                    domain="meet.jit.si"
                    roomName={roomName}
                    configOverwrite={{
                        startWithAudioMuted: false,
                        startWithVideoMuted: false,
                        disableModeratorIndicator: true,
                        prejoinPageEnabled: true,
                        enableWelcomePage: false,
                        enableClosePage: true,
                        hideLobbyButton: false,
                        doNotStoreRoom: true,
                        hideConferenceSubject: true,
                        hideConferenceTimer: true,
                        disableDeepLinking: true,
                        subject: ' ',
                    }}
                    interfaceConfigOverwrite={{
                        TOOLBAR_BUTTONS: [
                            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                            'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                            'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                            'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
                            'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
                            'security'
                        ],
                        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                        SHOW_JITSI_WATERMARK: false,
                        SHOW_BRAND_WATERMARK: false,
                        SHOW_WATERMARK_FOR_GUESTS: false,
                        HIDE_DEEP_LINKING_LOGO: true,
                        SHOW_PROMOTIONAL_CLOSE_PAGE: false,
                        JITSI_WATERMARK_LINK: 'https://klattertradet.se',
                        BRAND_WATERMARK_LINK: 'https://klattertradet.se',
                        DEFAULT_LOGO_URL: '',
                        DEFAULT_WELCOME_PAGE_LOGO_URL: '',
                        ENABLE_FEEDBACK_ANIMATION: false,
                    }}
                    userInfo={{
                        displayName: userName,
                        email: 'gemenskap@klattertradet.se'
                    }}
                    getIFrameRef={(iframeRef) => {
                        iframeRef.style.height = '100%';
                        iframeRef.style.width = '100%';
                        iframeRef.style.border = 'none';
                    } }
                    onApiReady={(externalApi) => {
                        // Redirect to home page when call ends
                        externalApi.addListener('videoConferenceLeft', () => {
                            window.location.href = '/';
                        });
                    } } />
            </div>
        </div>
    );
}
