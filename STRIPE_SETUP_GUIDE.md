# FaddlMatch Stripe Payment Integration Setup Guide

## 🚨 **URGENT: Fix Subscription Upgrade Buttons**

The subscription upgrade buttons are not working because the Stripe integration needs proper configuration. Follow this guide to fix it.

## 🔧 **Issue Fixed**

✅ **Updated upgrade routing** from `/subscription-management?upgrade=` to `/stripe-payment-integration?tier=`
✅ **Added proper price ID configuration** in paymentService.js
✅ **Created environment variable template** for Stripe keys

## 📋 **Required Setup Steps**

### 1. **Create Stripe Account & Get Keys**

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create/login to your Stripe account
3. Get your API keys:
   - **Test Mode**: `pk_test_...` and `sk_test_...`
   - **Live Mode**: `pk_live_...` and `sk_live_...`

### 2. **Create Stripe Products & Price IDs**

In your Stripe Dashboard, create products for:

**Patience Plan ($18 SGD)**
- Product Name: "FaddlMatch Patience Plan"
- Price: SGD 18.00 monthly recurring
- Copy the Price ID (starts with `price_`)

**Reliance Plan ($23 SGD)**  
- Product Name: "FaddlMatch Reliance Plan"
- Price: SGD 23.00 monthly recurring
- Copy the Price ID (starts with `price_`)

### 3. **Configure Environment Variables**

#### **Local Development (.env)**
```bash
# Supabase
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Stripe (Test Mode)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Stripe Price IDs (from your Stripe Dashboard)
STRIPE_PATIENCE_PRICE_ID=price_1234567890abcdef
STRIPE_RELIANCE_PRICE_ID=price_0987654321fedcba
```

#### **Netlify Production**
1. Go to Netlify Dashboard → Your Site → Site Settings → Environment Variables
2. Add all the same variables with **live** Stripe keys:
   - `VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...`
   - `STRIPE_SECRET_KEY=sk_live_...`
   - Plus your actual Price IDs from Stripe

#### **Supabase Edge Functions**
1. Go to Supabase Dashboard → Project Settings → API
2. Add environment variables:
   - `STRIPE_SECRET_KEY=sk_test_...` (or `sk_live_...` for production)

### 4. **Update Price IDs in Code**

Edit `src/services/paymentService.js`:

```javascript
// Replace these with your actual Stripe Price IDs
patience: {
  name: 'Patience', 
  price: 'SGD 18',
  priceId: 'price_YOUR_ACTUAL_PATIENCE_PRICE_ID', // From Stripe Dashboard
  features: ['Advanced matching', '15 daily matches', 'Priority messaging', 'Read receipts']
},
reliance: {
  name: 'Reliance',
  price: 'SGD 23', 
  priceId: 'price_YOUR_ACTUAL_RELIANCE_PRICE_ID', // From Stripe Dashboard
  features: ['Premium matching', 'Unlimited matches', 'VIP messaging', 'All filters']
}
```

### 5. **Test the Payment Flow**

1. **Build and Deploy** your updated code
2. **Test Upgrade Buttons**: 
   - Go to subscription management page
   - Click "Upgrade to Patience" or "Upgrade to Reliance"
   - Should redirect to `/stripe-payment-integration?tier=patience`
3. **Test Payment Form**:
   - Should show Stripe card form
   - Use test card: `4242 4242 4242 4242`
   - Any future date and CVC

### 6. **Deploy Updated Code**

```bash
# Commit the fixes
git add .
git commit -m "Fix subscription upgrade buttons - proper Stripe routing and configuration

✅ FIXES:
- Updated upgrade routing to /stripe-payment-integration
- Added proper Stripe price ID configuration  
- Created environment setup guide
- Fixed payment flow redirects

🔧 CHANGES:
- src/pages/subscription-management/index.jsx: Fixed upgrade routing
- src/services/paymentService.js: Added proper price IDs
- Added .env.example for configuration
- Added STRIPE_SETUP_GUIDE.md

Now upgrade buttons will properly redirect to Stripe payment integration page.

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to GitHub
git push origin main
```

## 🎯 **What Was Fixed**

1. **Routing Issue**: Upgrade buttons now redirect to `/stripe-payment-integration?tier=X` instead of staying on subscription management page
2. **Price Configuration**: Added proper environment variable support for Stripe Price IDs
3. **Environment Setup**: Created comprehensive setup guide and example files

## ✅ **Expected Result**

After following this setup:
- ✅ Upgrade buttons will work properly
- ✅ Users will be redirected to Stripe payment form
- ✅ Payment processing will complete successfully
- ✅ Subscriptions will be properly recorded in database

## 🚨 **Critical Next Steps**

1. **Get your actual Stripe Price IDs** from Stripe Dashboard
2. **Update the environment variables** in Netlify and Supabase
3. **Replace placeholder Price IDs** in paymentService.js
4. **Test the complete payment flow** end-to-end

Your FaddlMatch subscription system will be fully functional once these steps are completed!

## 📞 **Support**

If you need help with Stripe setup, the key files to check are:
- `src/pages/subscription-management/index.jsx` (upgrade routing)
- `src/pages/stripe-payment-integration/index.jsx` (payment form)
- `src/services/paymentService.js` (price configuration)
- `supabase/functions/create-payment-intent/index.ts` (backend payment processing)