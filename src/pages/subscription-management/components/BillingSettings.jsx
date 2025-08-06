import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BillingSettings = () => {
  const [autoRenewal, setAutoRenewal] = useState(true);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isEditing, setIsEditing] = useState(false);

  // Mock billing data
  const currentPlan = {
    name: 'Patience Plan',
    price: 18.00,
    nextBilling: new Date('2024-08-05'),
    paymentMethod: 'Credit Card ending in 4532'
  };

  const billingCycleOptions = [
    { value: 'monthly', label: 'Monthly', description: 'Billed every month' },
    { value: 'quarterly', label: 'Quarterly', description: 'Billed every 3 months (5% discount)' },
    { value: 'yearly', label: 'Yearly', description: 'Billed annually (15% discount)' }
  ];

  const paymentMethodOptions = [
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'paynow', label: 'PayNow' },
    { value: 'bank_transfer', label: 'Bank Transfer' }
  ];

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-SG', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency: 'SGD'
    })?.format(amount);
  };

  const handleSaveSettings = () => {
    // Mock save functionality
    console.log('Saving billing settings:', {
      autoRenewal,
      billingCycle,
      paymentMethod
    });
    setIsEditing(false);
  };

  const handleCancelSubscription = () => {
    // Mock cancellation functionality
    console.log('Initiating subscription cancellation');
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-premium-purple/10 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={20} className="text-premium-purple" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-xl text-foreground">
              Billing Settings
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage your subscription and payment preferences
            </p>
          </div>
        </div>
        
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <Icon name="Save" size={16} className="mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Icon name="Edit" size={16} className="mr-2" />
              Edit Settings
            </>
          )}
        </Button>
      </div>
      <div className="space-y-6">
        {/* Current Subscription Info */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-3">Current Subscription</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Plan</span>
              <p className="font-medium text-foreground">{currentPlan?.name}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Monthly Cost</span>
              <p className="font-medium text-foreground">{formatAmount(currentPlan?.price)}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Next Billing Date</span>
              <p className="font-medium text-foreground">{formatDate(currentPlan?.nextBilling)}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Payment Method</span>
              <p className="font-medium text-foreground">{currentPlan?.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Auto-Renewal Setting */}
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-islamic-green/10 rounded-lg flex items-center justify-center">
              <Icon name="RotateCcw" size={18} className="text-islamic-green" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Auto-Renewal</h4>
              <p className="text-sm text-muted-foreground">
                Automatically renew your subscription each billing cycle
              </p>
            </div>
          </div>
          
          <Button
            variant={autoRenewal ? "default" : "outline"}
            onClick={() => setAutoRenewal(!autoRenewal)}
            disabled={!isEditing}
            className={autoRenewal ? "bg-islamic-green hover:bg-islamic-green/90" : ""}
          >
            {autoRenewal ? "Enabled" : "Disabled"}
          </Button>
        </div>

        {/* Billing Cycle */}
        <div className="space-y-3">
          <label className="font-medium text-foreground">Billing Cycle</label>
          <Select
            options={billingCycleOptions}
            value={billingCycle}
            onChange={setBillingCycle}
            disabled={!isEditing}
            placeholder="Select billing cycle"
          />
        </div>

        {/* Payment Method */}
        <div className="space-y-3">
          <label className="font-medium text-foreground">Payment Method</label>
          <Select
            options={paymentMethodOptions}
            value={paymentMethod}
            onChange={setPaymentMethod}
            disabled={!isEditing}
            placeholder="Select payment method"
          />
        </div>

        {/* Payment Method Details */}
        {isEditing && (
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium text-foreground">Update Payment Details</h4>
            
            {paymentMethod === 'credit_card' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Card Number"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="col-span-2"
                />
                <Input
                  label="Expiry Date"
                  type="text"
                  placeholder="MM/YY"
                />
                <Input
                  label="CVV"
                  type="text"
                  placeholder="123"
                />
                <Input
                  label="Cardholder Name"
                  type="text"
                  placeholder="Full name on card"
                  className="col-span-2"
                />
              </div>
            )}

            {paymentMethod === 'paynow' && (
              <div>
                <Input
                  label="PayNow Mobile Number"
                  type="tel"
                  placeholder="+65 9123 4567"
                />
              </div>
            )}

            {paymentMethod === 'bank_transfer' && (
              <div className="space-y-4">
                <Input
                  label="Bank Account Number"
                  type="text"
                  placeholder="123-456789-001"
                />
                <Input
                  label="Bank Name"
                  type="text"
                  placeholder="DBS Bank"
                />
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button
              variant="ghost"
              onClick={() => setIsEditing(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              Cancel Changes
            </Button>
            
            <Button
              variant="default"
              onClick={handleSaveSettings}
              className="bg-trust-blue hover:bg-trust-blue/90"
            >
              <Icon name="Save" size={16} className="mr-2" />
              Save Settings
            </Button>
          </div>
        )}

        {/* Danger Zone */}
        <div className="pt-6 border-t border-border">
          <div className="bg-error/5 border border-error/20 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="AlertTriangle" size={20} className="text-error" />
              <h4 className="font-medium text-error">Danger Zone</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Canceling your subscription will downgrade your account to the free Intention plan at the end of your current billing cycle.
            </p>
            <Button
              variant="outline"
              onClick={handleCancelSubscription}
              className="border-error text-error hover:bg-error hover:text-white"
            >
              <Icon name="X" size={16} className="mr-2" />
              Cancel Subscription
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;