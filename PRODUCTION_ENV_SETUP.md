# FaddlMatch Production Environment Setup

## 🎯 Your Stripe Price IDs
- Patience Plan ($18 SGD): `VITE_STRIPE_PATIENCE_PRICE_ID`
- Reliance Plan ($23 SGD): `VITE_STRIPE_RELIANCE_PRICE_ID`

## 📋 Netlify Environment Variables Setup

Go to Netlify Dashboard → Your Site → Site Settings → Environment Variables and add:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Stripe Configuration (LIVE KEYS for production)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key

# Stripe Price IDs (LIVE)
VITE_STRIPE_PATIENCE_PRICE_ID=price_live_patience
VITE_STRIPE_RELIANCE_PRICE_ID=price_live_reliance

# Application Settings
NODE_ENV=production
VITE_APP_NAME=FaddlMatch
VITE_APP_URL=https://your-netlify-url.netlify.app

# Optional Sentry Monitoring
VITE_SENTRY_DSN=your-sentry-dsn
VITE_SENTRY_TRACES_SAMPLE_RATE=0.1
VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE=0.05
VITE_SENTRY_REPLAYS_ERROR_SAMPLE_RATE=1.0

# API Proxy
VITE_API_PROXY_ENABLED=true
```

## 🗃️ Supabase Edge Functions Environment Variables

Project Settings → API → Functions variables:

```bash
# Stripe Secret Keys
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase Project
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Email Provider
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# AI Providers (optional)
OPENAI_API_KEY=your-openai-api-key

# CORS for Edge Functions
ALLOWED_ORIGIN=https://your-production-domain
```

## 🧪 Test Mode vs Live Mode

- For Testing: use Stripe test keys and test Price IDs
- For Production: use live keys and live Price IDs (real cards are charged)

## ✅ Current Status

- Code reads Stripe Price IDs from environment
- Payment service enforces price ID presence
- Edge functions CORS locked to `ALLOWED_ORIGIN`
- Optional Sentry enabled via env

## 🚀 Next Steps

1. Populate env vars in Netlify and Supabase as above
2. Test subscription buttons (Patience and Reliance)
3. Confirm Stripe Elements loads and succeeds
4. Confirm webhook updates `subscriptions` and `payment_history`
5. Verify no CSP violations in console (Stripe allowed)