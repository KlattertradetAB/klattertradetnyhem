import React, { useState, useEffect } from 'react'
import { AuthLayout } from '@/components/auth-layout'
import { Button } from '@/components/button'
import { Field, Label } from '@/components/fieldset'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Strong, Text } from '@/components/text'
import { supabase } from '@/gemenskap/services/supabase'
import { Page } from '@/types'

interface ResetPasswordPageProps {
    setPage: (page: Page) => void
}

export default function ResetPasswordPage({ setPage }: ResetPasswordPageProps) {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (password.length < 6) {
            setError('Lösenordet måste vara minst 6 tecken.')
            return
        }

        if (password !== confirmPassword) {
            setError('Lösenorden matchar inte.')
            return
        }

        setLoading(true)

        const { error: updateError } = await supabase.auth.updateUser({
            password,
        })

        if (updateError) {
            setError(updateError.message)
        } else {
            setSuccess(true)
        }

        setLoading(false)
    }

    if (success) {
        return (
            <AuthLayout>
                <div className="space-y-6 text-center">
                    <div className="flex justify-center mb-2">
                        <img
                            src="/assets/logo2.png"
                            alt="Horizonten"
                            className="h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                        />
                    </div>
                    <Heading>Lösenordet är uppdaterat</Heading>
                    <Text>
                        Ditt lösenord har ändrats. Du kan nu logga in med ditt nya lösenord.
                    </Text>
                    <Button onClick={() => setPage(Page.LOGIN)} className="w-full bg-orange-500 hover:bg-orange-600 text-slate-950 font-black py-4 rounded-2xl shadow-lg shadow-orange-500/20">
                        Logga in
                    </Button>
                </div>
            </AuthLayout>
        )
    }

    return (
        <AuthLayout>
            <form onSubmit={handleReset} className="grid w-full max-w-sm grid-cols-1 gap-8">
                <div className="flex justify-center mb-2">
                    <img
                        src="/assets/logo2.png"
                        alt="Horizonten"
                        className="h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    />
                </div>
                <Heading>Välj nytt lösenord</Heading>
                <Text>
                    Ange ditt nya lösenord nedan.
                </Text>

                {error && (
                    <Text className="text-red-600 dark:text-red-400 font-medium">
                        {error}
                    </Text>
                )}

                <Field>
                    <Label>Nytt lösenord</Label>
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
                    <Label>Bekräfta lösenord</Label>
                    <Input
                        type="password"
                        name="confirm-password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                </Field>

                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-slate-950 font-black py-4 rounded-2xl shadow-lg shadow-orange-500/20" disabled={loading}>
                    {loading ? 'Sparar...' : 'Spara nytt lösenord'}
                </Button>

                <Text>
                    Kommer du ihåg ditt lösenord?{' '}
                    <button type="button" onClick={() => setPage(Page.LOGIN)}>
                        <Strong>Logga in</Strong>
                    </button>
                </Text>
            </form>
        </AuthLayout>
    )
}
