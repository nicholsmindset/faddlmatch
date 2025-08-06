import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentHistory = () => {
  const [showAll, setShowAll] = useState(false);

  // Mock payment history data
  const paymentHistory = [
    {
      id: 1,
      date: new Date('2024-07-05'),
      amount: 18.00,
      plan: 'Patience Plan',
      status: 'completed',
      method: 'Credit Card',
      invoiceId: 'INV-2024-001'
    },
    {
      id: 2,
      date: new Date('2024-06-05'),
      amount: 18.00,
      plan: 'Patience Plan',
      status: 'completed',
      method: 'PayNow',
      invoiceId: 'INV-2024-002'
    },
    {
      id: 3,
      date: new Date('2024-05-05'),
      amount: 18.00,
      plan: 'Patience Plan',
      status: 'completed',
      method: 'Credit Card',
      invoiceId: 'INV-2024-003'
    },
    {
      id: 4,
      date: new Date('2024-04-05'),
      amount: 0.00,
      plan: 'Intention Plan',
      status: 'completed',
      method: 'Free',
      invoiceId: 'INV-2024-004'
    }
  ];

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-SG', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency: 'SGD'
    })?.format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'failed':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method?.toLowerCase()) {
      case 'credit card':
        return 'CreditCard';
      case 'paynow':
        return 'Smartphone';
      case 'bank transfer':
        return 'Building2';
      case 'free':
        return 'Gift';
      default:
        return 'DollarSign';
    }
  };

  const displayedHistory = showAll ? paymentHistory : paymentHistory?.slice(0, 3);

  const downloadInvoice = (invoiceId) => {
    // Mock download functionality
    console.log(`Downloading invoice: ${invoiceId}`);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-trust-blue/10 rounded-lg flex items-center justify-center">
            <Icon name="Receipt" size={20} className="text-trust-blue" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-xl text-foreground">
              Payment History
            </h2>
            <p className="text-sm text-muted-foreground">
              View your subscription payments and invoices
            </p>
          </div>
        </div>
      </div>
      {paymentHistory?.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="Receipt" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium text-lg text-foreground mb-2">
            No Payment History
          </h3>
          <p className="text-muted-foreground">
            Your payment history will appear here once you make your first payment.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {displayedHistory?.map((payment) => (
              <div
                key={payment?.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-smooth"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Icon 
                      name={getPaymentMethodIcon(payment?.method)} 
                      size={20} 
                      className="text-muted-foreground" 
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground">
                        {payment?.plan}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment?.status)}`}>
                        {payment?.status?.charAt(0)?.toUpperCase() + payment?.status?.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{formatDate(payment?.date)}</span>
                      <span>•</span>
                      <span>{payment?.method}</span>
                      <span>•</span>
                      <span className="font-mono">{payment?.invoiceId}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-semibold text-lg text-foreground">
                      {formatAmount(payment?.amount)}
                    </div>
                  </div>
                  
                  {payment?.amount > 0 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => downloadInvoice(payment?.invoiceId)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Icon name="Download" size={16} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {paymentHistory?.length > 3 && (
            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                onClick={() => setShowAll(!showAll)}
                className="text-trust-blue hover:text-trust-blue/80"
              >
                {showAll ? (
                  <>
                    <Icon name="ChevronUp" size={16} className="mr-2" />
                    Show Less
                  </>
                ) : (
                  <>
                    <Icon name="ChevronDown" size={16} className="mr-2" />
                    Show All ({paymentHistory?.length} transactions)
                  </>
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentHistory;