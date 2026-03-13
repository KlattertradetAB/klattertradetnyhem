
import React, { useState, useEffect } from 'react';
import CTAButton from './CTAButton';
import AssociationStatutes from './AssociationStatutes';
import CommunityGuidelines from './CommunityGuidelines';
import { useTranslations } from '../hooks';

const ApplicationForm: React.FC = () => {
    const { t } = useTranslations();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [personalNumber, setPersonalNumber] = useState('');
    const [address, setAddress] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [understoodStatutes, setUnderstoodStatutes] = useState(false);
    const [boardInterest, setBoardInterest] = useState(false);
    const [useSameEmailForInvoice, setUseSameEmailForInvoice] = useState(true);
    const [invoiceEmail, setInvoiceEmail] = useState('');
    const [newsletter, setNewsletter] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string; personalNumber?: string; address?: string; invoiceEmail?: string; agreement?: string }>({});

    const validate = (fieldName?: 'name' | 'email' | 'personalNumber' | 'address' | 'invoiceEmail' | 'agreement'): boolean => {
        const newErrors: typeof errors = { ...errors };
        let isValid = true;

        if (!fieldName || fieldName === 'name') {
            if (!name.trim()) {
                newErrors.name = t.formNameRequired;
                isValid = false;
            } else {
                delete newErrors.name;
            }
        }

        if (!fieldName || fieldName === 'email') {
            if (!email.trim()) {
                newErrors.email = t.formEmailRequired;
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                newErrors.email = t.formEmailInvalid;
                isValid = false;
            } else {
                delete newErrors.email;
            }
        }

        if (!fieldName || fieldName === 'personalNumber') {
            if (!personalNumber.trim()) {
                newErrors.personalNumber = t.formPersonalNumberRequired;
                isValid = false;
            } else {
                delete newErrors.personalNumber;
            }
        }

        if (!fieldName || fieldName === 'address') {
            if (!address.trim()) {
                newErrors.address = t.formAddressRequired;
                isValid = false;
            } else {
                delete newErrors.address;
            }
        }

        if (!fieldName || fieldName === 'invoiceEmail') {
            if (!useSameEmailForInvoice && !invoiceEmail.trim()) {
                newErrors.invoiceEmail = t.formInvoiceEmailRequired;
                isValid = false;
            } else if (!useSameEmailForInvoice && invoiceEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invoiceEmail)) {
                newErrors.invoiceEmail = t.formEmailInvalid;
                isValid = false;
            } else {
                delete newErrors.invoiceEmail;
            }
        }

        if (!fieldName || fieldName === 'agreement') {
            if (!agreed || !understoodStatutes) {
                newErrors.agreement = t.formAgreementRequired;
                isValid = false;
            } else {
                delete newErrors.agreement;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const createMailtoLink = () => {
        const subject = encodeURIComponent(`Ansökan om medlemskap - ${name}`);
        const finalInvoiceEmail = useSameEmailForInvoice ? email : invoiceEmail;
        
        const body = encodeURIComponent(
`Hej,

Jag ansöker om medlemskap i Horizonten Gemenskap.

Mina uppgifter:
Namn: ${name}
Personnummer: ${personalNumber}
Adress: ${address}
E-post: ${email}
Faktura-e-post: ${finalInvoiceEmail}

Intresserad av styrelsearbete: ${boardInterest ? 'Ja' : 'Nej'}
Prenumerera på nyhetsbrev: ${newsletter ? 'Ja' : 'Nej'}

Jag intygar att jag har tagit del av och godkänner stadgar och regler.

Hälsningar,
${name}`
        );
        return `mailto:billy@klattertradet.se?subject=${subject}&body=${body}`;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            const mailtoLink = createMailtoLink();
            window.location.href = mailtoLink;
            setTimeout(() => {
                setSubmitted(true);
            }, 500);
        }
    };

    if (submitted) {
        return (
            <div className="container mx-auto px-6 py-16 max-w-2xl text-center">
                <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700">
                    <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">{t.formSuccessTitle}</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        {t.formSuccessMessage}
                    </p>
                    <div className="mt-10">
                        <button 
                            onClick={() => window.location.reload()} 
                            className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
                        >
                            {t.formSuccessBack}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{t.formTitle}</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t.formSubtitle}</p>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-slate-700 overflow-hidden">
                <div className="p-8 sm:p-12">
                    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                        {/* Personal Details */}
                        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                                    {t.formNameLabel} <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        onBlur={() => validate('name')}
                                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ${errors.name ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-slate-600 focus:ring-cyan-600'} bg-white/50 dark:bg-slate-900/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200`}
                                        placeholder={t.formNamePlaceholder}
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="personalNumber" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                                    {t.formPersonalNumberLabel} <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="personalNumber"
                                        id="personalNumber"
                                        value={personalNumber}
                                        onChange={(e) => setPersonalNumber(e.target.value)}
                                        onBlur={() => validate('personalNumber')}
                                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ${errors.personalNumber ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-slate-600 focus:ring-cyan-600'} bg-white/50 dark:bg-slate-900/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200`}
                                        placeholder={t.formPersonalNumberPlaceholder}
                                    />
                                    {errors.personalNumber && <p className="mt-1 text-sm text-red-500">{errors.personalNumber}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                                    {t.formEmailLabel} <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={() => validate('email')}
                                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ${errors.email ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-slate-600 focus:ring-cyan-600'} bg-white/50 dark:bg-slate-900/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200`}
                                        placeholder={t.formEmailPlaceholder}
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="address" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                                    {t.formAddressLabel} <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        autoComplete="street-address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        onBlur={() => validate('address')}
                                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ${errors.address ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-slate-600 focus:ring-cyan-600'} bg-white/50 dark:bg-slate-900/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200`}
                                        placeholder={t.formAddressPlaceholder}
                                    />
                                    {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Invoice Email Logic */}
                        <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
                            <div className="flex gap-x-3 items-center mb-4">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="invoice-same"
                                        name="invoice-same"
                                        type="checkbox"
                                        checked={useSameEmailForInvoice}
                                        onChange={(e) => setUseSameEmailForInvoice(e.target.checked)}
                                        className="h-5 w-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600 dark:border-slate-600 dark:bg-slate-700"
                                    />
                                </div>
                                <label htmlFor="invoice-same" className="text-sm leading-6 text-gray-600 dark:text-gray-300 font-medium">
                                    {t.formInvoiceEmailSame}
                                </label>
                            </div>

                            {!useSameEmailForInvoice && (
                                <div className="mt-2 animate-fade-in">
                                    <label htmlFor="invoiceEmail" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                                        {t.formInvoiceEmailLabel} <span className="text-red-500">*</span>
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="email"
                                            name="invoiceEmail"
                                            id="invoiceEmail"
                                            value={invoiceEmail}
                                            onChange={(e) => setInvoiceEmail(e.target.value)}
                                            onBlur={() => validate('invoiceEmail')}
                                            className={`block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ${errors.invoiceEmail ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-slate-600 focus:ring-cyan-600'} bg-white/50 dark:bg-slate-900/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200`}
                                            placeholder={t.formInvoiceEmailPlaceholder}
                                        />
                                        {errors.invoiceEmail && <p className="mt-1 text-sm text-red-500">{errors.invoiceEmail}</p>}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Board Interest */}
                        <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="board-interest"
                                        name="board-interest"
                                        type="checkbox"
                                        checked={boardInterest}
                                        onChange={(e) => setBoardInterest(e.target.checked)}
                                        className="h-5 w-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600 dark:border-slate-600 dark:bg-slate-700"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="board-interest" className="font-medium text-slate-900 dark:text-white">
                                        {t.formBoardInterestLabel}
                                    </label>
                                    <p className="text-gray-500 dark:text-gray-400 mt-1 italic">
                                        {t.formBoardInterestDesc}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Agreements & Statutes */}
                        <div className="border-t border-gray-200 dark:border-slate-700 pt-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AssociationStatutes />
                                <CommunityGuidelines />
                            </div>

                            <div className="space-y-4">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="agreed"
                                            name="agreed"
                                            type="checkbox"
                                            checked={agreed}
                                            onChange={(e) => setAgreed(e.target.checked)}
                                            className="h-5 w-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600 dark:border-slate-600 dark:bg-slate-700"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="agreed" className="font-medium text-slate-900 dark:text-white">
                                            {t.formAgreement} <span className="text-red-500">*</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="understood"
                                            name="understood"
                                            type="checkbox"
                                            checked={understoodStatutes}
                                            onChange={(e) => setUnderstoodStatutes(e.target.checked)}
                                            className="h-5 w-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600 dark:border-slate-600 dark:bg-slate-700"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="understood" className="font-medium text-slate-900 dark:text-white">
                                            {t.formUnderstood} <span className="text-red-500">*</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="newsletter"
                                            name="newsletter"
                                            type="checkbox"
                                            checked={newsletter}
                                            onChange={(e) => setNewsletter(e.target.checked)}
                                            className="h-5 w-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600 dark:border-slate-600 dark:bg-slate-700"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="newsletter" className="font-medium text-slate-900 dark:text-white">
                                            {t.formNewsletter}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {errors.agreement && <p className="text-sm text-red-500 font-medium">{errors.agreement}</p>}
                        </div>

                        <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4" dangerouslySetInnerHTML={{ __html: t.privacyPolicy }}></p>
                            <div className="flex flex-col items-center gap-4">
                                <CTAButton type="submit">
                                    {t.formSubmit}
                                </CTAButton>
                                <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                                    {t.formSubmitNote}
                                </p>
                            </div>
                            {Object.keys(errors).length > 0 && !errors.agreement && (
                                <p className="mt-4 text-sm text-red-500 text-center">{t.formError}</p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
  };

export default ApplicationForm;
