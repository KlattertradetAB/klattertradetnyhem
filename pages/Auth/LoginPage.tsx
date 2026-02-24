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

interface LoginPageProps {
    setPage: (page: Page) => void
}

export default function LoginPage({ setPage }: LoginPageProps) {
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
            setError(loginError.message)
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
            // Redirect handled by App.tsx listener
            setPage(Page.GEMENSKAP_APP)
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
            <form onSubmit={handleLogin} className="grid w-full max-w-sm grid-cols-1 gap-8">
                <Logo className="h-6 text-zinc-950 dark:text-white" />
                <Heading>Sign in to your account</Heading>

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
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>

                    <Button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full bg-white border border-zinc-300 text-zinc-900 hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-700"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                        Sign in with Google
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
