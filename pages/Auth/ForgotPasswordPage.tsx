import React, { useState } from 'react'
import { AuthLayout } from '@/components/auth-layout'
import { Button } from '@/components/button'
import { Field, Label } from '@/components/fieldset'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Strong, Text } from '@/components/text'
import { Logo } from '@/components/logo'
import { supabase } from '@/gemenskap/services/supabase'
import { Page } from '@/types'

interface ForgotPasswordPageProps {
    setPage: (page: Page) => void
}

export default function ForgotPasswordPage({ setPage }: ForgotPasswordPageProps) {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/aterstall-losenord`,
        })

        if (resetError) {
            setError(resetError.message)
            setLoading(false)
        } else {
            setSuccess(true)
            setLoading(false)
        }
    }

    if (success) {
        return (
            <AuthLayout>
                <div className="space-y-6 text-center">
                    <Logo className="h-6 mx-auto" />
                    <Heading>Kontrollera din e-post</Heading>
                    <Text>
                        Vi har skickat en återställningslänk till <Strong>{email}</Strong>.
                        Vänligen klicka på länken för att återställa ditt lösenord.
                    </Text>
                    <Button onClick={() => setPage(Page.LOGIN)} className="w-full">
                        Tillbaka till logga in
                    </Button>
                </div>
            </AuthLayout>
        )
    }

    return (
        <AuthLayout>
            <form onSubmit={handleReset} className="grid w-full max-w-sm grid-cols-1 gap-8">
                <Logo className="h-6 text-zinc-950 dark:text-white" />
                <Heading>Återställ lösenord</Heading>
                <Text>
                    Ange din e-postadress så skickar vi en länk för att återställa ditt lösenord.
                </Text>

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

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Skickar...' : 'Skicka återställningslänk'}
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
