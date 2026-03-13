import React, { useState } from 'react';
import { Building, User, CheckCircle, Calendar, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface MarkerData {
    id: string;
    name: string;
    type: 'business' | 'person';
    role: string;
    city: string;
    address: string;
    certifiedSince: string;
    // SVG coordinate space: viewBox "0 0 500 700"
    // Approx positions relative to the Scandinavian outline below
    x: number;
    y: number;
}

const MARKERS: MarkerData[] = [
    {
        id: '1',
        name: 'Traumacentrum Väst AB',
        type: 'business',
        role: 'Specialistklinik för komplex traumabehandling',
        city: 'Göteborg',
        address: 'Avenyn 14, 411 36 Göteborg',
        certifiedSince: '15 Mars 2024',
        x: 148,
        y: 480,
    },
    {
        id: '2',
        name: 'Mindful Recovery Omsorg',
        type: 'business',
        role: 'Stödboenden med integrerat neurobiologiskt förhållningssätt',
        city: 'Stockholm',
        address: 'Sveavägen 44, 111 34 Stockholm',
        certifiedSince: '02 Oktober 2023',
        x: 232,
        y: 450,
    },
    {
        id: '3',
        name: 'Anna Lindström',
        type: 'person',
        role: 'Leg. Psykoterapeut & Gestaltterapeut',
        city: 'Uppsala',
        address: 'Dragarbrunnsgatan 52, 753 20 Uppsala',
        certifiedSince: '12 Maj 2024',
        x: 228,
        y: 420,
    },
    {
        id: '4',
        name: 'Erik Johansson',
        type: 'person',
        role: 'Specialistläkare & Handledare',
        city: 'Malmö',
        address: 'Stortorget 3, 211 22 Malmö',
        certifiedSince: '28 Augusti 2023',
        x: 185,
        y: 530,
    },
    {
        id: '5',
        name: 'Maria García',
        type: 'person',
        role: 'Socialsekreterare & Traumacoach',
        city: 'Gävle',
        address: 'Stortorget 9, 803 20 Gävle',
        certifiedSince: '05 Januari 2025',
        x: 225,
        y: 380,
    },
];

// ─── SVG paths ────────────────────────────────────────────────────────────────
// Simplified but recognisable outlines of Norway, Sweden and Finland
// in a 500×700 viewBox. Coordinates hand-tuned for visual accuracy.

const NORWAY_PATH =
    'M 60 80 L 50 100 L 40 130 L 55 160 L 45 190 L 60 220 ' +
    'L 55 250 L 70 280 L 60 310 L 75 340 L 65 370 L 80 400 ' +
    'L 75 430 L 90 450 L 85 480 L 100 510 L 95 540 L 110 560 ' +
    'L 120 580 L 130 570 L 145 555 L 155 540 L 165 520 L 160 500 ' +
    'L 155 480 L 160 460 L 155 440 L 162 420 L 158 400 ' +
    'L 165 380 L 160 360 L 170 340 L 165 310 L 175 290 ' +
    'L 168 270 L 175 250 L 170 230 L 180 210 L 175 190 ' +
    'L 185 170 L 175 150 L 185 130 L 180 110 L 175 90 ' +
    'L 160 70 L 140 60 L 120 55 L 100 60 L 80 65 Z';

const SWEDEN_PATH =
    'M 175 90 L 180 110 L 185 130 L 175 150 L 185 170 ' +
    'L 175 190 L 180 210 L 170 230 L 175 250 L 168 270 ' +
    'L 175 290 L 165 310 L 170 340 L 160 360 L 165 380 ' +
    'L 158 400 L 162 420 L 155 440 L 160 460 L 155 480 ' +
    'L 160 500 L 165 520 L 155 540 L 145 555 L 160 565 ' +
    'L 175 570 L 190 560 L 200 545 L 210 555 L 220 545 ' +
    'L 230 555 L 235 540 L 245 530 L 250 515 L 245 500 ' +
    'L 248 485 L 245 470 L 250 455 L 255 440 L 252 425 ' +
    'L 258 410 L 255 395 L 260 380 L 258 365 L 265 350 ' +
    'L 260 335 L 268 320 L 265 305 L 270 290 L 265 275 ' +
    'L 272 260 L 265 240 L 270 220 L 260 200 L 265 180 ' +
    'L 258 160 L 262 140 L 255 120 L 248 100 L 240 82 ' +
    'L 225 72 L 210 70 L 195 75 Z';

const FINLAND_PATH =
    'M 270 90 L 265 110 L 272 130 L 265 150 L 270 170 ' +
    'L 265 190 L 272 210 L 268 230 L 275 250 L 270 270 ' +
    'L 278 290 L 273 310 L 280 330 L 275 350 L 282 370 ' +
    'L 278 390 L 285 410 L 282 430 L 288 450 L 284 470 ' +
    'L 290 490 L 295 510 L 305 520 L 318 515 L 328 505 ' +
    'L 335 510 L 345 500 L 352 485 L 358 470 L 350 455 ' +
    'L 356 440 L 348 425 L 355 410 L 350 395 L 360 378 ' +
    'L 355 360 L 365 342 L 360 325 L 370 308 L 365 290 ' +
    'L 372 270 L 368 250 L 375 230 L 368 210 L 374 190 ' +
    'L 368 170 L 375 148 L 368 128 L 372 108 L 365 88 ' +
    'L 350 72 L 330 64 L 312 62 L 295 66 L 280 74 Z';

// ─── Component ─────────────────────────────────────────────────────────────--

const NordicMap: React.FC = () => {
    const { t } = useLanguage();
    const [activeMarker, setActiveMarker] = useState<MarkerData | null>(null);
    const [hoverMarker, setHoverMarker] = useState<string | null>(null);

    return (
        <div className="w-full flex flex-col items-center">
            <div className="relative w-full max-w-2xl mx-auto">
                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mb-4 text-xs font-bold uppercase tracking-widest text-white/50">
                    <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-amber-400 block shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                        {t.map_legend_business}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-orange-500 block shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                        {t.map_legend_person}
                    </span>
                </div>

                <svg
                    viewBox="30 50 360 540"
                    className="w-full drop-shadow-2xl"
                    style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}
                >
                    {/* Glow definitions */}
                    <defs>
                        <radialGradient id="glow-amber" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="glow-orange" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                        </radialGradient>
                        <filter id="country-glow">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Norway */}
                    <path
                        d={NORWAY_PATH}
                        fill="#1e293b"
                        stroke="#f97316"
                        strokeWidth="1.5"
                        strokeOpacity="0.4"
                        filter="url(#country-glow)"
                    />
                    <text x="95" y="320" fontSize="9" fill="#f97316" fillOpacity="0.6"
                        fontWeight="bold" textAnchor="middle" letterSpacing="1">{t.map_country_norway}</text>

                    {/* Sweden */}
                    <path
                        d={SWEDEN_PATH}
                        fill="#1e293b"
                        stroke="#f97316"
                        strokeWidth="1.5"
                        strokeOpacity="0.6"
                        filter="url(#country-glow)"
                    />
                    <text x="212" y="330" fontSize="9" fill="#f97316" fillOpacity="0.6"
                        fontWeight="bold" textAnchor="middle" letterSpacing="1">{t.map_country_sweden}</text>

                    {/* Finland */}
                    <path
                        d={FINLAND_PATH}
                        fill="#1e293b"
                        stroke="#f97316"
                        strokeWidth="1.5"
                        strokeOpacity="0.4"
                        filter="url(#country-glow)"
                    />
                    <text x="320" y="310" fontSize="9" fill="#f97316" fillOpacity="0.6"
                        fontWeight="bold" textAnchor="middle" letterSpacing="1">{t.map_country_finland}</text>

                    {/* Markers */}
                    {MARKERS.map((marker) => {
                        const isActive = activeMarker?.id === marker.id;
                        const isHover = hoverMarker === marker.id;
                        const color = marker.type === 'business' ? '#fbbf24' : '#f97316';
                        const glowId = marker.type === 'business' ? 'glow-amber' : 'glow-orange';

                        return (
                            <g
                                key={marker.id}
                                onClick={() => setActiveMarker(isActive ? null : marker)}
                                onMouseEnter={() => setHoverMarker(marker.id)}
                                onMouseLeave={() => setHoverMarker(null)}
                                style={{ cursor: 'pointer' }}
                            >
                                {/* Pulse ring */}
                                <circle
                                    cx={marker.x}
                                    cy={marker.y}
                                    r={isHover || isActive ? 18 : 14}
                                    fill={`url(#${glowId})`}
                                    opacity={isHover || isActive ? 1 : 0.7}
                                    style={{ transition: 'all 0.25s ease' }}
                                >
                                    <animate
                                        attributeName="r"
                                        values={`${isActive ? 18 : 14};${isActive ? 24 : 20};${isActive ? 18 : 14}`}
                                        dur="2s"
                                        repeatCount="indefinite"
                                    />
                                    <animate
                                        attributeName="opacity"
                                        values="0.7;0.2;0.7"
                                        dur="2s"
                                        repeatCount="indefinite"
                                    />
                                </circle>

                                {/* Outer ring */}
                                <circle
                                    cx={marker.x}
                                    cy={marker.y}
                                    r={isHover || isActive ? 9 : 7}
                                    fill="none"
                                    stroke={color}
                                    strokeWidth="1.5"
                                    strokeOpacity="0.5"
                                    style={{ transition: 'all 0.25s ease' }}
                                />

                                {/* Core dot */}
                                <circle
                                    cx={marker.x}
                                    cy={marker.y}
                                    r={isHover || isActive ? 5.5 : 4}
                                    fill={color}
                                    style={{
                                        filter: `drop-shadow(0 0 6px ${color})`,
                                        transition: 'all 0.25s ease',
                                    }}
                                />

                                {/* City label on hover */}
                                {(isHover || isActive) && (
                                    <text
                                        x={marker.x}
                                        y={marker.y - 13}
                                        fontSize="7"
                                        fill={color}
                                        textAnchor="middle"
                                        fontWeight="bold"
                                        letterSpacing="0.5"
                                    >
                                        {marker.city}
                                    </text>
                                )}
                            </g>
                        );
                    })}
                </svg>

                {/* Info panel – shown when a marker is clicked */}
                {activeMarker && (
                    <div
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm
              glass bg-black/80 backdrop-blur-2xl border border-white/20
              rounded-2xl shadow-2xl p-5 animate-fade-in z-20"
                    >
                        <button
                            onClick={() => setActiveMarker(null)}
                            className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>

                        <div className="flex items-start gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${activeMarker.type === 'business'
                                    ? 'bg-amber-500/20 text-amber-400'
                                    : 'bg-orange-500/20 text-orange-400'
                                }`}>
                                {activeMarker.type === 'business'
                                    ? <Building size={18} />
                                    : <User size={18} />}
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="font-black text-white text-sm">{activeMarker.name}</h4>
                                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${activeMarker.type === 'business'
                                            ? 'bg-amber-500/15 text-amber-400'
                                            : 'bg-orange-500/15 text-orange-400'
                                        }`}>
                                        <CheckCircle size={10} />
                                        {t.quality_certified_active}
                                    </span>
                                </div>
                                <p className="text-white/60 text-xs mt-0.5">{activeMarker.role}</p>
                                <p className="text-white/40 text-xs mt-1">{activeMarker.address}</p>
                                <div className="flex items-center gap-1.5 mt-2 text-white/30 text-[10px]">
                                    <Calendar size={11} />
                                    <span>{t.map_certified_since} {activeMarker.certifiedSince}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Click hint */}
            <p className="text-white/25 text-[11px] font-medium mt-2 text-center tracking-wide">
                {t.map_hint}
            </p>
        </div>
    );
};

export default NordicMap;
