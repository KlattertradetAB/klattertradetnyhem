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
import { supabase } from '@/gemenskap/services/supabase'
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

        const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    country: country,
                },
                emailRedirectTo: window.location.origin
            },
        })

        if (signUpError) {
            setError(signUpError.message)
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
                    <Heading>Check your email</Heading>
                    <Text>
                        Vill har skickat en bekräftelselänk till <Strong>{email}</Strong>.
                        Vänligen klicka på länken för att aktivera ditt konto.
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
            <form onSubmit={handleRegister} className="grid w-full max-w-sm grid-cols-1 gap-8">
                <Logo className="h-6 text-zinc-950 dark:text-white" />
                <Heading>Create your account</Heading>

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
                    <Label>Full name</Label>
                    <Input
                        name="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </Field>
                <Field>
                    <Label>Password</Label>
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
                    <Label>Country</Label>
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
                    <Checkbox name="remember" required />
                    <Label>I agree to the terms and conditions.</Label>
                </CheckboxField>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Creating account...' : 'Create account'}
                </Button>
                <Text>
                    Already have an account?{' '}
                    <button type="button" onClick={() => setPage(Page.LOGIN)}>
                        <Strong>Sign in</Strong>
                    </button>
                </Text>
            </form>
        </AuthLayout>
    )
}
