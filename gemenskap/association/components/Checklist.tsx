
import React, { useState } from 'react';
import { CHECKLIST_DATA } from '../constants';
import { useTranslations } from '../hooks'; // Import useTranslations

interface ChecklistItemProps {
    id: string;
    label: React.ReactNode;
    isChecked: boolean;
    onToggle: (id: string) => void;
    isDisabled: boolean; // New prop to indicate if item is locked
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ id, label, isChecked, onToggle, isDisabled }) => {
    return (
        <li className="flex items-start">
            <input
                id={id}
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(id)}
                disabled={isDisabled && isChecked} // Disable only if checked AND locked
                className={`h-5 w-5 rounded border-slate-400 text-blue-600 focus:ring-blue-500 mt-1 mr-3 flex-shrink-0 ${
                    isDisabled && isChecked ? 'opacity-60 cursor-not-allowed' : ''
                }`}
                aria-labelledby={`${id}-label`}
            />
            <label
                id={`${id}-label`}
                htmlFor={id}
                className={`transition-colors ${
                    isChecked
                        ? 'line-through text-slate-500 dark:text-slate-400'
                        : 'cursor-pointer'
                }`}
            >
                {label}
            </label>
        </li>
    );
};

interface ChecklistProps {
    checkedItems: string[];
    onToggleCheckItem: (itemId: string) => void;
    onResetChecklist: () => void; // New prop for resetting
}

const Checklist: React.FC<ChecklistProps> = ({ checkedItems, onToggleCheckItem, onResetChecklist }) => {
    const { t } = useTranslations(); // Use translations
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);

    const handleResetAttempt = () => {
        setPassword('');
        setPasswordError('');
        setResetSuccess(false);
        setIsResetModalOpen(true);
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'Styrelse') { // Correct password
            onResetChecklist();
            setResetSuccess(true);
            setPasswordError('');
            setTimeout(() => {
                setIsResetModalOpen(false);
                setResetSuccess(false);
            }, 1500); // Close after success message
        } else {
            setPasswordError(t.checklistPasswordError);
        }
    };

    const isLocked = true; // All checked items are considered "locked" once checked for this feature

    return (
        <div className="space-y-8 mt-6">
            {CHECKLIST_DATA.map(category => (
                <div key={category.heading}>
                    <h3 className="text-xl font-semibold mb-4">{category.heading}</h3>
                    <ul className="space-y-3">
                        {category.items.map(item => (
                            <ChecklistItem
                                key={item.id}
                                id={item.id}
                                label={item.label}
                                isChecked={checkedItems.includes(item.id)}
                                onToggle={onToggleCheckItem}
                                isDisabled={isLocked} // Pass isLocked to disable checked items
                            />
                        ))}
                    </ul>
                </div>
            ))}
            
            <button
                onClick={handleResetAttempt}
                className="mt-8 px-6 py-3 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-lg font-semibold hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors shadow-sm"
            >
                {t.checklistResetButton}
            </button>

            {isResetModalOpen && (
                <div
                    className="fixed inset-0 bg-black/60 dark:bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setIsResetModalOpen(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="reset-modal-title"
                >
                    <div
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm p-6 relative transform transition-all duration-300 ease-in-out"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsResetModalOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-700/70"
                            aria-label="Stäng modal"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        <h2 id="reset-modal-title" className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                            {t.checklistResetButton}
                        </h2>
                        {!resetSuccess ? (
                            <>
                                <p className="text-slate-600 dark:text-slate-300 mb-4">{t.checklistResetConfirm}</p>
                                <form onSubmit={handlePasswordSubmit}>
                                    <label htmlFor="reset-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        {t.checklistPasswordPrompt}
                                    </label>
                                    <input
                                        id="reset-password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
                                        placeholder="••••••••"
                                        autoFocus
                                    />
                                    {passwordError && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{passwordError}</p>}
                                    <div className="flex justify-end gap-3 mt-6">
                                        <button
                                            type="button"
                                            onClick={() => setIsResetModalOpen(false)}
                                            className="px-4 py-2 rounded-lg font-semibold text-slate-700 dark:text-slate-300 bg-slate-200/70 dark:bg-slate-700/70 hover:bg-slate-300/80 dark:hover:bg-slate-600/80 transition-colors"
                                        >
                                            Avbryt
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 rounded-lg font-semibold text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors shadow"
                                        >
                                            Bekräfta
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-4">
                                <div className="mx-auto bg-green-100 dark:bg-green-900/50 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                                    <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">{t.checklistResetSuccess}</h3>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checklist;
