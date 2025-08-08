import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

// Declare Deno global variable for TypeScript compatibility
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

const allowedOrigin = Deno?.env?.get('ALLOWED_ORIGIN') || '*';
const fromAddress = Deno?.env?.get('RESEND_FROM_EMAIL') || 'onboarding@resend.dev';

serve(async (req) => {
  // ✅ CORS preflight
  if (req?.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      }
    });
  }

  try {
    const { to, subject, html, emailType, metadata } = await req?.json();
    
    // Resend API call
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno?.env?.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: Array.isArray(to) ? to : [to],
        subject: subject,
        html: html,
        tags: [
          { name: 'app', value: 'faddlmatch' },
          { name: 'type', value: emailType || 'general' }
        ]
      }),
    });

    if (!resendResponse?.ok) {
      const errorData = await resendResponse?.json()?.catch(() => ({}));
      throw new Error(`Resend API error: ${resendResponse.statusText} - ${errorData.message || 'Unknown error'}`);
    }

    const result = await resendResponse?.json();
    
    // Log successful email send (optional)
    console.log(`Email sent successfully: ${emailType || 'general'} to ${to}`);
    
    return new Response(JSON.stringify({
      success: true,
      messageId: result.id,
      emailType: emailType,
      timestamp: new Date().toISOString(),
      data: result
    }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowedOrigin
      }
    });
  } catch (error) {
    console.error('Email function error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: (error as Error).message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowedOrigin
      }
    });
  }
});