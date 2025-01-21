import { useState } from 'react';
import { generateOrderId } from '../../utils/generateorder';

export const PaymentButton = ({
  amount,
  customerName,
  customerEmail,
  itemDetails,
}) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const orderId = generateOrderId();

      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          amount,
          customerName,
          customerEmail,
          itemDetails,
        }),
      });

      const data = await response.json();
      
      // Redirect to Midtrans payment page
      console.log(data)
      window.location.href = data.paymentUrl;
    } catch (error) {
      console.error('Payment error:', error);
      alert('Error processing payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
    >
      {loading ? 'Processing...' : 'Pay Now'}
    </button>
  );
};