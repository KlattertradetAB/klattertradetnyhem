
import React, { useState, useMemo } from 'react';
import type { AnalysisResult, WoundScore } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList, PieChart, Pie, Legend, Sector } from 'recharts';
import { ResetIcon, EmailIcon } from './icons';
import { useTranslations } from '../translations';
import { useTheme } from '../contexts/ThemeContext';

interface ResultsDisplayProps {
  result: AnalysisResult;
  onReset: () => void;
  userEmail: string;
}

interface CategoryInfo {
  title: string;
  description: string;
  color: string;
  textColor: string;
  badgeClasses: string;
}

const CustomTooltip = ({ active, payload }: any) => {
    const t = useTranslations();
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/80 dark:bg-brand-dark-surface/80 backdrop-blur-sm p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl text-brand-text dark:text-brand-dark-text">
        <p className="font-bold">{`${data.name}`}</p>
        <p className="text-brand-primary dark:text-brand-accent">{`${t.score}: ${data.score}`}</p>
      </div>
    );
  }
  return null;
};

type CategoryKey = 'regulated' | 'compensated' | 'overwhelmed';
type DisplayWoundScore = WoundScore & { categoryKey: CategoryKey };

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onReset, userEmail }) => {
  const t = useTranslations();
  const { colorMode } = useTheme();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const categories: Record<CategoryKey, CategoryInfo> = useMemo(() => ({
    regulated: {
      title: t.regulatedTitle,
      description: t.regulatedDescription,
      color: "border-green-500",
      textColor: "text-green-600 dark:text-green-400",
      badgeClasses: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
    },
    compensated: {
      title: t.compensatedTitle,
      description: t.compensatedDescription,
      color: "border-yellow-500",
      textColor: "text-yellow-600 dark:text-yellow-400",
      badgeClasses: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300",
    },
    overwhelmed: {
      title: t.overwhelmedTitle,
      description: t.overwhelmedDescription,
      color: "border-red-500",
      textColor: "text-red-600 dark:text-red-400",
      badgeClasses: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
    },
  }), [t]);

  const getCategoryKey = (score: number): CategoryKey => {
    if (score <= 7) return 'regulated';
    if (score <= 14) return 'compensated';
    return 'overwhelmed';
  };

  const displayScores: DisplayWoundScore[] = useMemo(() => {
    return [...result.allScores]
      .map(score => ({
        ...score,
        categoryKey: getCategoryKey(score.score),
      }))
      .sort((a, b) => b.score - a.score);
  }, [result.allScores]);
  
  const primaryWound = result.primaryWound;
  const secondaryWound = displayScores.find(s => s.code !== primaryWound.code);

  const totalScore = useMemo(() => Math.round(result.allScores.reduce((sum, s) => sum + s.score, 0)), [result.allScores]);

  const getTotalScoreCategory = useMemo(() => {
    if (totalScore <= 49) {
        return {
            title: t.regulatedMainTitle,
            description: t.regulatedMainDescription,
            color: 'green',
        };
    }
    if (totalScore <= 79) {
        return {
            title: t.compensatedMainTitle,
            description: totalScore <= 64 ? t.compensatedLowDescription : t.compensatedHighDescription,
            color: 'yellow',
        };
    }
    return {
        title: t.overwhelmedMainTitle,
        description: t.overwhelmedMainDescription,
        color: 'red',
    };
  }, [totalScore, t]);
  
  const categoryColors = {
      green: { border: "border-green-500", text: "text-green-600 dark:text-green-400", bg: "bg-green-500" },
      yellow: { border: "border-yellow-500", text: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-500" },
      red: { border: "border-red-500", text: "text-red-600 dark:text-red-400", bg: "bg-red-500" },
  };
  const totalScoreCategoryColor = categoryColors[getTotalScoreCategory.color as 'green' | 'yellow' | 'red'];

  const tickColor = colorMode === 'dark' ? '#f3f4f6' : '#111827';
  const gridColor = colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(55, 65, 81, 0.1)';
  const primaryBrandColor = `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--color-brand-primary').trim()})`;
  const secondaryBrandColor = `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--color-brand-secondary').trim()})`;
  const accentBrandColor = `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--color-brand-accent').trim()})`;
  
  const PIE_COLORS = [
    primaryBrandColor,
    secondaryBrandColor,
    '#10B981',
    accentBrandColor,
    '#F59E0B',
    '#EF4444',
  ];

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
    return (
      <g style={{ filter: `drop-shadow(0px 4px 12px ${fill}99)` }}>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          cornerRadius={5}
        />
        <text x={cx} y={cy - 10} textAnchor="middle" fill={tickColor} className="text-base font-semibold" >
          {payload.name}
        </text>
        <text x={cx} y={cy + 15} textAnchor="middle" fill={tickColor} className="text-2xl font-bold" >
          {`${payload.score}/20`}
        </text>
      </g>
    );
  };


  const formatResultsForSharing = (includeTotalScore = false): string => {
    let text = `**${t.userEmail}: ${userEmail}**\n\n`;
    text += `${t.resultsTitle}\n\n`;
     if (includeTotalScore) {
        text += `**${t.totalScore.toUpperCase()}**\n`;
        text += `${totalScore}/120 - ${getTotalScoreCategory.title}\n\n`;
    }
    text += `**${t.summaryTitle}**\n${result.summary}\n\n`;
    text += `**${t.primaryWoundTitle}: ${primaryWound.name} (${primaryWound.score}/20)**\n${primaryWound.description}\n\n`;
    if(secondaryWound) {
       text += `**${t.secondaryWoundTitle}: ${secondaryWound.name} (${secondaryWound.score}/20)**\n${secondaryWound.description}\n\n`;
    }
    text += `\n**${t.scoresOverviewTitle}**\n`;
    displayScores.forEach(s => {
      text += `- ${s.name}: ${s.score}/20 (${categories[s.categoryKey].title})\n`;
    });
    return text;
  };
  
  const handleSendToHorizonten = () => {
    const subject = encodeURIComponent(t.emailSubject);
    const bodyText = formatResultsForSharing(true);
    const body = encodeURIComponent(bodyText);
    window.location.href = `mailto:billy@klattertradet.se?subject=${subject}&body=${body}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white/30 dark:bg-brand-dark-surface/30 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50 dark:border-white/20">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-center text-brand-text dark:text-brand-dark-text mb-4 opacity-0" style={{ animation: 'slideInUp 0.5s ease-out 0.1s forwards' }}>{t.resultsTitle}</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8 opacity-0" style={{ animation: 'slideInUp 0.5s ease-out 0.2s forwards' }}>{t.resultsSubtitle}</p>
      
      <div className="bg-white/30 dark:bg-brand-dark-surface/30 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-white/50 dark:border-white/20 mb-8 opacity-0" style={{ animation: 'slideInUp 0.5s ease-out 0.3s forwards' }}>
        <h2 className="text-2xl font-bold text-brand-text dark:text-brand-dark-text mb-4">{t.topWoundsTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-brand-primary dark:text-brand-accent mb-2">{t.primaryWoundTitle}</h3>
            <div className="bg-white/50 dark:bg-brand-dark-surface/50 p-4 rounded-lg border border-brand-accent/40 transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl h-full">
              <h4 className="text-xl font-bold text-brand-secondary">{primaryWound.name}</h4>
              <p className="text-gray-700 dark:text-gray-200 text-sm mt-2 leading-relaxed">{primaryWound.description}</p>
            </div>
          </div>
          {secondaryWound && (
             <div>
                <h3 className="text-lg font-semibold text-brand-secondary dark:text-blue-400 mb-2">{t.secondaryWoundTitle}</h3>
                <div className="bg-white/50 dark:bg-brand-dark-surface/50 p-4 rounded-lg border border-brand-accent/40 transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl h-full">
                  <h4 className="text-xl font-bold text-brand-secondary">{secondaryWound.name}</h4>
                  <p className="text-gray-700 dark:text-gray-200 text-sm mt-2 leading-relaxed">{secondaryWound.description}</p>
                </div>
             </div>
          )}
        </div>
      </div>
      
      <div className="bg-white/30 dark:bg-brand-dark-surface/30 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-white/50 dark:border-white/20 mb-8 opacity-0" style={{ animation: 'slideInUp 0.5s ease-out 0.4s forwards' }}>
        <h2 className="text-2xl font-bold text-brand-text dark:text-brand-dark-text mb-4">{t.totalScoreTitle}</h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 text-center">
                <p className={`text-5xl font-bold ${totalScoreCategoryColor.text}`}>{totalScore}</p>
                <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">/ 120</p>
            </div>
            <div className="w-full">
                <h3 className={`text-xl font-bold ${totalScoreCategoryColor.text}`}>{getTotalScoreCategory.title}</h3>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 my-2">
                    <div className={`${totalScoreCategoryColor.bg} h-2.5 rounded-full`} style={{ width: `${(totalScore / 120) * 100}%` }}></div>
                </div>
                <p className="text-gray-700 dark:text-gray-200 text-sm mt-2 leading-relaxed">{getTotalScoreCategory.description}</p>
            </div>
        </div>
      </div>
      
      <div className="bg-white/30 dark:bg-brand-dark-surface/30 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-white/50 dark:border-white/20 mb-8 opacity-0" style={{ animation: 'slideInUp 0.5s ease-out 0.5s forwards' }}>
        <h2 className="text-2xl font-bold text-brand-text dark:text-brand-dark-text mb-3">{t.summaryTitle}</h2>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">{result.summary}</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 mb-8">
        <div 
          role="region"
          aria-label={t.woundDistributionTitle}
          className="lg:col-span-3 bg-white/30 dark:bg-brand-dark-surface/30 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-white/50 dark:border-white/20 opacity-0 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1" 
          style={{ animation: 'slideInUp 0.5s ease-out 0.6s forwards' }}
        >
          <h2 className="text-2xl font-bold text-brand-text dark:text-brand-dark-text mb-4">{t.woundDistributionTitle}</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={displayScores}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={140}
                  innerRadius={70}
                  dataKey="score"
                  nameKey="name"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  isAnimationActive={true}
                  animationDuration={1200}
                  animationEasing="ease-in-out"
                  animationBegin={200}
                >
                  {displayScores.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={PIE_COLORS[index % PIE_COLORS.length]} 
                      style={{
                          filter: `saturate(${activeIndex === index ? 1 : 0.6}) opacity(${activeIndex === index ? 1 : 0.7})`,
                          transition: 'filter 0.4s ease-in-out',
                      }}
                    />
                  ))}
                </Pie>
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{color: tickColor, right: '-20px'}}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div 
          role="region"
          aria-label={t.detailedBreakdownTitle}
          className="lg:col-span-2 bg-white/30 dark:bg-brand-dark-surface/30 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-white/50 dark:border-white/20 opacity-0 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1"
          style={{ animation: 'slideInUp 0.5s ease-out 0.7s forwards' }}
        >
          <h2 className="text-2xl font-bold text-brand-text dark:text-brand-dark-text mb-4">{t.detailedBreakdownTitle}</h2>
          <div style={{ width: '100%', height: 400 }}>
             <ResponsiveContainer>
                <BarChart data={displayScores} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid stroke={gridColor} strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 20]} tick={{ fill: tickColor, fontSize: 12 }} />
                    <YAxis type="category" dataKey="name" width={100} tick={{ fill: tickColor, fontSize: 12 }} style={{ textAnchor: 'end' }} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.1)' }} />
                    <Bar dataKey="score" radius={[0, 10, 10, 0]} isAnimationActive={true} animationDuration={1500} animationEasing="ease-out">
                    <LabelList dataKey="score" position="right" fill={tickColor} fontWeight="bold" />
                    {displayScores.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-white/30 dark:bg-brand-dark-surface/30 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-white/50 dark:border-white/20 mb-8 opacity-0" style={{ animation: 'slideInUp 0.5s ease-out 0.8s forwards' }}>
        <h2 className="text-2xl font-bold text-brand-text dark:text-brand-dark-text mb-4">{t.categoriesTitle}</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.values(categories).map((category, index) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${category.color} bg-white/40 dark:bg-brand-dark-surface/40`}>
              <h3 className={`font-bold ${category.textColor}`}>{category.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white/30 dark:bg-brand-dark-surface/30 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-white/50 dark:border-white/20 mb-8 opacity-0" style={{ animation: 'slideInUp 0.5s ease-out 0.9s forwards' }}>
        <h2 className="text-2xl font-bold text-brand-text dark:text-brand-dark-text mb-4">{t.recommendationTitle}</h2>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed" dangerouslySetInnerHTML={{ __html: totalScore > 60 ? t.recommendationHighScore : t.recommendationLowScore }} />
      </div>
       <div className="bg-white/30 dark:bg-brand-dark-surface/30 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-white/50 dark:border-white/20 mb-8 opacity-0" style={{ animation: 'slideInUp 0.5s ease-out 1.0s forwards' }}>
        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed text-center" dangerouslySetInnerHTML={{ __html: t.privacyInfo }} />
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0" style={{ animation: 'slideInUp 0.5s ease-out 1.1s forwards' }}>
        <button
          onClick={onReset}
          className="flex items-center justify-center bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95"
        >
          <ResetIcon className="w-5 h-5 mr-2" />
          {t.resetQuizButton}
        </button>
        <button
          onClick={handleSendToHorizonten}
          className="flex items-center justify-center bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95"
        >
          <EmailIcon className="w-5 h-5 mr-2" />
          {t.sendToHorizontenButton}
        </button>
      </div>

    </div>
  );
};

export default ResultsDisplay;
