import React, { useEffect, useState } from 'react';
import { getSurveyStatistics } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface Statistics {
    totalResponses: number;
    woundCounts: Record<string, number>;
    secondaryWoundCounts: Record<string, number>;
    emotionalStateCounts: Record<string, number>;
    legacyCount?: number;
    newFormatCount?: number;
}

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<Statistics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getSurveyStatistics();
            setStats(data);
            setLoading(false);
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    if (!stats) {
        return <div className="text-center p-8 text-red-500">Kunde inte ladda statistik.</div>;
    }

    const codeToName: Record<string, string> = {
        'O': 'Övergivenhet',
        'A': 'Avvisad',
        'F': 'Förödmjukad',
        'S': 'Sviken',
        'R': 'Orättvisa',
        'E': 'Ensamhet'
    };

    const primaryData = Object.entries(stats.woundCounts || {}).map(([code, count]) => ({
        name: codeToName[code] || code,
        count,
    })).sort((a, b) => b.count - a.count);

    const secondaryData = Object.entries(stats.secondaryWoundCounts || {}).map(([code, count]) => ({
        name: codeToName[code] || code,
        count,
    })).sort((a, b) => b.count - a.count);

    const emotionalData = Object.entries(stats.emotionalStateCounts || {}).map(([state, count]) => ({
        name: state,
        count,
    })).sort((a, b) => b.count - a.count);

    const COLORS = ['#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899'];
    const STATE_COLORS: Record<string, string> = {
        'Regulated': '#10b981', // Green
        'Compensated': '#f59e0b', // Amber
        'Overwhelmed': '#ef4444'  // Red
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Enkätstatistik: Fördjupad Analys
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Totalt antal svar</h2>
                        <p className="text-4xl font-bold text-amber-500">{stats.totalResponses}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Primary Wounds */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6">Primära Sår (Top 1)</h2>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={primaryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                                    <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={60} />
                                    <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} allowDecimals={false} />
                                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                    <Bar dataKey="count" name="Antal" radius={[4, 4, 0, 0]}>
                                        {primaryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Secondary Wounds */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6">Sekundära Sår (Top 2)</h2>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={secondaryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                                    <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={60} />
                                    <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} allowDecimals={false} />
                                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                    <Bar dataKey="count" name="Antal" radius={[4, 4, 0, 0]}>
                                        {secondaryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[(index + 1) % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Emotional States */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6">Emotionellt Tillstånd</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={emotionalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                                <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                                <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} allowDecimals={false} />
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                <Bar dataKey="count" name="Antal" radius={[4, 4, 0, 0]}>
                                    {emotionalData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={STATE_COLORS[entry.name] || '#9ca3af'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="text-center text-xs text-gray-400 mt-8">
                    Debug: Totalt: {stats.totalResponses} | Legacy: {stats.legacyCount || 0} | Enhanced: {stats.newFormatCount || 0}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
