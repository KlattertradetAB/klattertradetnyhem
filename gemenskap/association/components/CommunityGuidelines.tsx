
import React from 'react';
import { useTranslations } from '../hooks';

const CommunityGuidelines: React.FC = () => {
    const { t } = useTranslations();
    return (
        <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-300 bg-gray-100/70 dark:bg-slate-700/50 p-4 rounded-md h-48 overflow-y-auto border border-gray-300 dark:border-slate-600 dark:prose-invert">
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">{t.guidelinesTitle}</h4>
            <p className="mb-4">{t.guidelinesIntro}</p>
            <ul className="space-y-2 list-disc list-inside">
                <li><strong>{t.guidelineRespectTitle}:</strong> {t.guidelineRespectDesc}</li>
                <li><strong>{t.guidelineInclusionTitle}:</strong> {t.guidelineInclusionDesc}</li>
                <li><strong>{t.guidelineConstructiveTitle}:</strong> {t.guidelineConstructiveDesc}</li>
                <li><strong>{t.guidelineConfidentialityTitle}:</strong> {t.guidelineConfidentialityDesc}</li>
                <li><strong>{t.guidelineSafetyTitle}:</strong> {t.guidelineSafetyDesc}</li>
            </ul>
        </div>
    );
}

export default CommunityGuidelines;
