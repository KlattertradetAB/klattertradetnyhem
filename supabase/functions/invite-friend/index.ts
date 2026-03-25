// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is missing from environment variables.")
    }

    const { email, message, inviterName } = await req.json()

    if (!email) {
      throw new Error("Email is required.")
    }

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #fafafa; padding: 40px; border-radius: 10px;">
        <h2 style="color: #333; margin-bottom: 20px;">Du har blivit inbjuden!</h2>
        <p style="color: #555; font-size: 16px; line-height: 1.5;">
          <strong>${inviterName}</strong> har bjudit in dig till Horizonten Gemenskap – en plats för personlig utveckling och trygga samtal.
        </p>
        ${message ? `<div style="background: #fff; padding: 20px; border-left: 4px solid #f97316; margin: 20px 0; font-style: italic; color: #444;">"${message}"</div>` : ''}
        <div style="margin-top: 30px;">
          <a href="https://klattertradet.se" style="background: #4f46e5; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; display: inline-block;">Gå till Horizonten</a>
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 40px;">Detta är ett automatiskt meddelande och går inte att svara på.</p>
      </div>
    `

    // By default, you can only send emails from domains you have verified on Resend.
    // Replace 'onboarding@resend.dev' with your verified domain handle if needed (e.g. hej@klattertradet.se)
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'Horizonten Gemenskap <onboarding@resend.dev>', 
        to: email,
        subject: 'Inbjudan till Horizonten Gemenskap',
        html: htmlContent
      })
    })

    const resData = await res.json()

    if (!res.ok) {
      console.error(resData)
      throw new Error("Failed to send email via Resend API.")
    }

    return new Response(
      JSON.stringify(resData),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 },
    )
  }
})
