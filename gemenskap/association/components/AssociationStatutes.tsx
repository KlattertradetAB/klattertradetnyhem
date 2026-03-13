
import React from 'react';
import { useTranslations } from '../hooks';

const AssociationStatutes: React.FC = () => {
    const { t } = useTranslations();
    return (
        <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-300 bg-gray-100/70 dark:bg-slate-700/50 p-4 rounded-md h-48 overflow-y-auto border border-gray-300 dark:border-slate-600 dark:prose-invert">
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">{t.formStatutesHeader}</h4>
            <p>{t.formStatutesP1}</p>
            <ul className="space-y-2 list-disc list-inside">
                <li dangerouslySetInnerHTML={{ __html: t.formBenefit1 }}></li>
                <li>{t.formBenefit2}</li>
                <li>{t.formBenefit3}</li>
                <li>{t.formBenefit4}</li>
            </ul>
            <p className="mt-2 italic text-xs">{t.formBenefitDisclaimer}</p>
        </div>
    );
}

export default AssociationStatutes;
