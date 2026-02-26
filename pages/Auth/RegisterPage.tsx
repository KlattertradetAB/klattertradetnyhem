import React, { useState } from 'react'
import { AuthLayout } from '@/components/auth-layout'
import { Button } from '@/components/button'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import { Field, Label } from '@/components/fieldset'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Strong, Text, TextLink } from '@/components/text'
import { Logo } from '@/components/logo'
import { authService } from '@/gemenskap/services/authService'
import { Page } from '@/types'

interface RegisterPageProps {
    setPage: (page: Page) => void
}

export default function RegisterPage({ setPage }: RegisterPageProps) {
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [country, setCountry] = useState('Sweden')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await authService.register({
                email,
                password,
                fullName,
                membershipLevel: 2,
                membershipActive: true
            })
            setSuccess(true)
        } catch (err: any) {
            console.error('Signup Error:', err);
            setError(err.message || 'Ett oväntat fel uppstod.')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <AuthLayout>
                <div className="space-y-8 text-center py-4">
                    <div className="flex justify-center">
                        <img
                            src="/assets/logo2.png"
                            alt="Horizonten"
                            className="h-24 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                        />
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-2xl font-black text-white">Kontrollera din e-post</h2>
                        <Text className="text-slate-300 leading-relaxed">
                            Vi har skickat en bekräftelselänk till <Strong className="text-orange-400">{email}</Strong>.
                            Vänligen klicka på länken i mailet för att aktivera ditt konto.
                        </Text>
                    </div>
                    <Button onClick={() => setPage(Page.LOGIN)} className="w-full bg-orange-500 hover:bg-orange-600 text-slate-950 font-black py-4 rounded-2xl shadow-lg shadow-orange-500/20">
                        Tillbaka till inloggning
                    </Button>
                </div>
            </AuthLayout>
        )
    }

    return (
        <AuthLayout>
            <form onSubmit={handleRegister} className="grid w-full grid-cols-1 gap-8">
                <div className="flex justify-center mb-2">
                    <img
                        src="/assets/logo2.png"
                        alt="Horizonten"
                        className="h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    />
                </div>
                <h2 className="text-2xl font-black text-white text-center">Skapa konto</h2>

                {error && (
                    <Text className="text-red-600 dark:text-red-400 font-medium">
                        {error}
                    </Text>
                )}

                <Field>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Field>
                <Field>
                    <Label>Namn</Label>
                    <Input
                        name="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </Field>
                <Field>
                    <Label>Lösenord</Label>
                    <Input
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                </Field>
                <Field>
                    <Label>Land</Label>
                    <Select
                        name="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <option>Sweden</option>
                        <option>Norway</option>
                        <option>Denmark</option>
                        <option>Finland</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                        <option>United States</option>
                    </Select>
                </Field>
                <CheckboxField>
                    <Checkbox name="remember" required className="border-white/20 data-[checked]:bg-orange-500 data-[checked]:border-orange-500" />
                    <Label className="text-slate-400 text-sm">Jag godkänner användarvillkoren och att mina uppgifter hanteras enligt integritetspolicyn.</Label>
                </CheckboxField>
                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-slate-950 font-black py-4 rounded-2xl shadow-lg shadow-orange-500/20" disabled={loading}>
                    {loading ? 'Skapar konto...' : 'Skapa konto'}
                </Button>
                <Text>
                    Har du redan ett konto?{' '}
                    <button type="button" onClick={() => setPage(Page.LOGIN)}>
                        <Strong>Logga in</Strong>
                    </button>
                </Text>
            </form>
        </AuthLayout>
    )
}
