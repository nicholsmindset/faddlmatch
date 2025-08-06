# FaddlMatch Production Environment Setup

## 🎯 **Your Actual Stripe Price IDs**
- **Patience Plan ($18 SGD)**: `price_1RpOh4DGNasEu2DUS6BDFnLX`
- **Reliance Plan ($23 SGD)**: `price_1RpOhhDGNasEu2DUqLAT8YI9`

## 📋 **Netlify Environment Variables Setup**

Go to **Netlify Dashboard** → **Your Site** → **Site Settings** → **Environment Variables** and add:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Stripe Configuration (LIVE KEYS for production)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key

# Your Actual Stripe Price IDs (Already configured in code)
STRIPE_PATIENCE_PRICE_ID=price_1RpOh4DGNasEu2DUS6BDFnLX
STRIPE_RELIANCE_PRICE_ID=price_1RpOhhDGNasEu2DUqLAT8YI9

# Application Settings
NODE_ENV=production
VITE_APP_NAME=FaddlMatch
VITE_APP_URL=https://your-netlify-url.netlify.app
```

## 🗃️ **Supabase Environment Variables Setup**

Go to **Supabase Dashboard** → **Project Settings** → **API** → **Environment Variables** and add:

```bash
# Stripe Secret Key (LIVE for production)
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key

# Your Supabase Project Configuration (already configured)
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 🧪 **Test Mode vs Live Mode**

### **For Testing (use test keys):**
- `VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...`
- `STRIPE_SECRET_KEY=sk_test_...`
- Test card: `4242 4242 4242 4242`

### **For Production (use live keys):**
- `VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...`  
- `STRIPE_SECRET_KEY=sk_live_...`
- Real credit cards will be charged

## ✅ **Current Status**

✅ **Code Updated**: Price IDs are now configured in the codebase
✅ **Payment Service**: Updated with your actual Stripe Price IDs  
✅ **Ready to Deploy**: Just need environment variables configured

## 🚀 **Next Steps**

1. **Add environment variables** to Netlify (live Stripe keys)
2. **Add environment variables** to Supabase (live Stripe secret key)
3. **Test subscription buttons** - they should now work!
4. **Use test mode first** to verify everything works
5. **Switch to live mode** when ready for real payments

## 🎯 **Expected Result**

After configuring environment variables:
- ✅ "Upgrade to Patience" → Stripe payment form ($18 SGD)
- ✅ "Upgrade to Reliance" → Stripe payment form ($23 SGD)
- ✅ Successful payments will activate subscriptions
- ✅ Users will be redirected to profile creation

Your subscription system will be fully functional! 🎉