# Get Your Stripe Price IDs

You have the Product IDs, but you need the **Price IDs** for the payment integration.

## 🏷️ **Your Product IDs:**
- **Product 1**: `prod_SkuWeeuBPreKHX` (likely Patience - $18)
- **Product 2**: `prod_SkuWqY1ZJwARPk` (likely Reliance - $23)

## 🎯 **Next Steps - Get Price IDs:**

### 1. **Go to Stripe Dashboard**
1. Open [Stripe Dashboard](https://dashboard.stripe.com/products)
2. Find your products with the IDs above

### 2. **Get Price IDs for Each Product**

**For Product `prod_SkuWeeuBPreKHX`:**
1. Click on this product
2. Look for the **Price** section
3. Copy the Price ID (starts with `price_`)
4. This should be your **Patience Plan ($18 SGD)**

**For Product `prod_SkuWqY1ZJwARPk`:**
1. Click on this product  
2. Look for the **Price** section
3. Copy the Price ID (starts with `price_`)
4. This should be your **Reliance Plan ($23 SGD)**

### 3. **Update Your Configuration**

Once you have the Price IDs (they look like `price_1234567890abcdef`), update:

**In `src/services/paymentService.js`:**
```javascript
patience: {
  name: 'Patience', 
  price: 'SGD 18',
  priceId: 'price_YOUR_ACTUAL_PATIENCE_PRICE_ID_HERE',
  features: ['Advanced matching', '15 daily matches', 'Priority messaging', 'Read receipts']
},
reliance: {
  name: 'Reliance',
  price: 'SGD 23', 
  priceId: 'price_YOUR_ACTUAL_RELIANCE_PRICE_ID_HERE',
  features: ['Premium matching', 'Unlimited matches', 'VIP messaging', 'All filters']
}
```

**In Netlify Environment Variables:**
- `STRIPE_PATIENCE_PRICE_ID=price_your_patience_price_id`
- `STRIPE_RELIANCE_PRICE_ID=price_your_reliance_price_id`

**In Supabase Environment Variables:**
- Add the same Price IDs to your Supabase project settings

## 🧪 **Test Cards for Development:**
- **Success**: `4242 4242 4242 4242`
- **Declined**: `4000 0000 0000 0002`  
- **Any future date and CVC**

## ❓ **Can't Find Price IDs?**

If you can't find the Price IDs in your products, you may need to create them:

1. **In Stripe Dashboard** → **Products** → Click your product
2. **Click "Add Price"**
3. **Set pricing**:
   - **Patience**: $18.00 SGD, Monthly recurring
   - **Reliance**: $23.00 SGD, Monthly recurring
4. **Save and copy the Price ID**

Once you have both Price IDs, share them and I'll help you configure everything!