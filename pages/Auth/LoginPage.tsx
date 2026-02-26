import React, { useState } from 'react'
import { AuthLayout } from '@/components/auth-layout'
import { Button } from '@/components/button'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import { Field, Label } from '@/components/fieldset'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Strong, Text, TextLink } from '@/components/text'
import { Logo } from '@/components/logo'
import { supabase } from '@/gemenskap/services/supabase'
import { Page } from '@/types'
import { Mail, Lock, ShieldCheck, AlertCircle } from 'lucide-react'

interface LoginPageProps {
    setPage: (page: Page) => void
}

export default function LoginPage({ setPage }: LoginPageProps) {
    const [loginType, setLoginType] = useState<'member' | 'admin'>('member')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (loginError) {
            if (loginError.message.includes('Email not confirmed')) {
                setError('Din e-postadress är inte bekräftad ännu. Vänligen kontrollera din inkorg och klicka på aktiveringslänken.')
            } else {
                setError(loginError.message)
            }
            setLoading(false)
        } else {
            const { data } = await supabase.auth.getUser();
            if (data?.user) {
                // Record login event for sync
                await supabase.from('login_events').insert({
                    user_id: data.user.id,
                    logged_in_at: new Date().toISOString(),
                });
            }
            // Redirect handled by App.tsx listener, but we can nudge it
            if (loginType === 'admin') {
                setPage(Page.ADMIN_PANEL)
            } else {
                setPage(Page.GEMENSKAP_APP)
            }
        }
    }

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        })
    }

    return (
        <AuthLayout>
            <form onSubmit={handleLogin} className="grid w-full grid-cols-1 gap-8">
                <div className="flex justify-center mb-2">
                    <img
                        src="/assets/logo2.png"
                        alt="Horizonten"
                        className="h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    />
                </div>

                <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                    <button
                        type="button"
                        onClick={() => setLoginType('member')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${loginType === 'member' ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-white' : 'text-zinc-500'}`}
                    >
                        Medlem
                    </button>
                    <button
                        type="button"
                        onClick={() => setLoginType('admin')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${loginType === 'admin' ? 'bg-orange-500 text-white shadow-sm' : 'text-zinc-500'}`}
                    >
                        Styrelse / Admin
                    </button>
                </div>

                <Heading>{loginType === 'admin' ? 'Admin Inloggning' : 'Logga in på Gemenskapen'}</Heading>

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
                    <Label>Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Field>
                <div className="flex items-center justify-between">
                    <CheckboxField>
                        <Checkbox name="remember" />
                        <Label>Remember me</Label>
                    </CheckboxField>
                    <Text>
                        <button type="button" onClick={() => setPage(Page.FORGOT_PASSWORD)}>
                            <Strong>Forgot password?</Strong>
                        </button>
                    </Text>
                </div>
                <div className="space-y-4">
                    <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-slate-950 font-black py-4 rounded-2xl shadow-lg shadow-orange-500/20" disabled={loading}>
                        {loading ? 'Loggar in...' : 'Logga in'}
                    </Button>
                </div>
                <Text>
                    Don’t have an account?{' '}
                    <button type="button" onClick={() => setPage(Page.REGISTER)}>
                        <Strong>Sign up</Strong>
                    </button>
                </Text>
            </form>
        </AuthLayout>
    )
}
