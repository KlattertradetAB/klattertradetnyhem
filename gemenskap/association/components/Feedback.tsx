import React, { useState } from 'react';

const FEEDBACK_STORAGE_KEY = 'handbook-feedback';

const Feedback: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        // Delay resetting state to allow for fade-out animation
        setTimeout(() => {
            setFeedbackText('');
            setShowSuccessMessage(false);
        }, 300);
    };

    const handleExport = () => {
        try {
            const feedbackData = localStorage.getItem(FEEDBACK_STORAGE_KEY);
            if (!feedbackData || feedbackData === '[]') {
                alert('Det finns ingen feedback att exportera.');
                return;
            }
            const prettyJson = JSON.stringify(JSON.parse(feedbackData), null, 2);
            const blob = new Blob([prettyJson], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'handbook-feedback.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to export feedback:", error);
            alert('Ett fel uppstod vid export av feedback.');
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (feedbackText.trim() === '') {
            alert('Vänligen skriv din feedback innan du skickar.');
            return;
        }

        try {
            const existingFeedbackJSON = localStorage.getItem(FEEDBACK_STORAGE_KEY);
            const existingFeedback = existingFeedbackJSON ? JSON.parse(existingFeedbackJSON) : [];
            
            const newFeedback = {
                text: feedbackText,
                timestamp: new Date().toISOString(),
            };
            
            const updatedFeedback = [...existingFeedback, newFeedback];
            localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(updatedFeedback));
            
            setFeedbackText('');
            setShowSuccessMessage(true);
            
        } catch (error) {
            console.error("Failed to save feedback:", error);
            alert('Ett fel uppstod när din feedback skulle sparas.');
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={openModal}
                className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-14 h-14 bg-blue-600 dark:bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-200 dark:focus:ring-offset-slate-900 transition-all duration-300 ease-in-out flex items-center justify-center z-50 animate-fade-in"
                aria-label="Lämna feedback"
            >
                {/* Speech bubble icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/60 dark:bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="feedback-modal-title"
                >
                    <div
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 relative transform transition-all duration-300 ease-in-out"
                        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 hover:text-slate-800 dark:hover:text-slate-200"
                            aria-label="Stäng modal"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        <h2 id="feedback-modal-title" className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                            Lämna feedback
                        </h2>

                        {!showSuccessMessage ? (
                            <>
                                <p className="text-slate-600 dark:text-slate-400 mb-6">
                                    Hittat ett fel, har ett förslag eller vill ge annan feedback om handboken? Vi uppskattar din hjälp! Din feedback sparas lokalt.
                                </p>
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="feedback-textarea" className="sr-only">Din feedback</label>
                                    <textarea
                                        id="feedback-textarea"
                                        value={feedbackText}
                                        onChange={(e) => setFeedbackText(e.target.value)}
                                        placeholder="Skriv din feedback här..."
                                        rows={6}
                                        required
                                        className="w-full p-3 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-blue-600 dark:focus:border-blue-500 transition-shadow outline-none resize-y placeholder:text-slate-500 dark:placeholder:text-slate-400 dark:text-white"
                                    ></textarea>

                                    <div className="flex justify-between items-center mt-6">
                                        <button
                                            type="button"
                                            onClick={handleExport}
                                            className="px-4 py-2 text-sm rounded-lg font-semibold text-blue-600 dark:text-blue-400 bg-transparent hover:bg-blue-100/50 dark:hover:bg-blue-900/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Exportera feedback
                                        </button>
                                        <div className="flex justify-end gap-4">
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="px-6 py-2 rounded-lg font-semibold text-slate-700 dark:text-slate-300 bg-slate-200/70 dark:bg-slate-700/70 hover:bg-slate-300/80 dark:hover:bg-slate-600/80 transition-colors"
                                            >
                                                Avbryt
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-6 py-2 rounded-lg font-semibold text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors shadow"
                                            >
                                                Skicka feedback
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="animate-fade-in">
                                <div className="text-center py-8">
                                    <div className="mx-auto bg-green-100 dark:bg-green-900/50 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                                        <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Tack!</h3>
                                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                                        Din feedback har sparats lokalt i din webbläsare.
                                    </p>
                                </div>
                                <div className="flex justify-end gap-4 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowSuccessMessage(false)}
                                        className="px-6 py-2 rounded-lg font-semibold text-slate-700 dark:text-slate-300 bg-slate-200/70 dark:bg-slate-700/70 hover:bg-slate-300/80 dark:hover:bg-slate-600/80 transition-colors"
                                    >
                                        Lämna mer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-6 py-2 rounded-lg font-semibold text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors shadow"
                                    >
                                        Stäng
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Feedback;
