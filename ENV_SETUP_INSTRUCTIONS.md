# 🔐 Environment Setup Instructions

## ✅ **Your .env file is ready!**

I've created a `.env` file with your **actual Stripe Price IDs** already configured:
- **Patience**: `price_1RpOh4DGNasEu2DUS6BDFnLX` 
- **Reliance**: `price_1RpOhhDGNasEu2DUqLAT8YI9`

## 📋 **What you need to fill in:**

### 1. **Supabase Configuration**
Replace in your `.env` file:
```bash
VITE_SUPABASE_URL=your-actual-supabase-url
VITE_SUPABASE_ANON_KEY=your-actual-supabase-anon-key
```

**Get these from**: Supabase Dashboard → Project Settings → API

### 2. **Stripe API Keys**
Replace in your `.env` file:

**For Testing:**
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key
STRIPE_SECRET_KEY=sk_test_your_test_secret_key
```

**For Production:**
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key  
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
```

**Get these from**: Stripe Dashboard → Developers → API Keys

## 🚀 **Test Your Setup**

### **Step 1: Local Development**
```bash
# Install dependencies
npm install

# Start development server  
npm start
```

### **Step 2: Test Subscription Buttons**
1. Go to subscription management page
2. Click "Upgrade to Patience" ($18)
3. Should redirect to Stripe payment form
4. Use test card: `4242 4242 4242 4242`

### **Step 3: Production Deployment**
1. Add same environment variables to **Netlify**
2. Add `STRIPE_SECRET_KEY` to **Supabase** environment variables
3. Switch to **live Stripe keys** for real payments

## ✅ **Current Status**

✅ **Stripe Price IDs**: Already configured with your actual IDs
✅ **Payment Routing**: Fixed to redirect to Stripe payment page  
✅ **Environment Template**: Ready for your API keys
✅ **Git Security**: .env file protected from commits

## 🎯 **Once Complete**

Your subscription buttons will work perfectly:
- **"Upgrade to Patience"** → Stripe form with SGD $18
- **"Upgrade to Reliance"** → Stripe form with SGD $23
- **Payment processing** → Successful subscription activation
- **User redirection** → Profile creation flow

Just fill in your API keys and your FaddlMatch subscription system will be fully functional! 🎉