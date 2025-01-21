import axios from 'axios';

const MIDTRANS_CONFIG = {
  serverKey: process.env.SERVER_KEY || '',
  clientKey: process.env.CLIENT_KEY || '',
  isProduction: 'false' 
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const paymentRequest = req.body;
    
    const payload = {
      transaction_details: {
        order_id: paymentRequest.orderId,
        gross_amount: paymentRequest.amount,
      },
      customer_details: {
        first_name: paymentRequest.customerName,
        email: paymentRequest.customerEmail,
      },
      item_details: paymentRequest.itemDetails,
    };

    const auth = Buffer.from(MIDTRANS_CONFIG.serverKey + ':').toString('base64');
    const baseUrl = MIDTRANS_CONFIG.isProduction
      ? 'https://app.midtrans.com/snap/v1'
      : 'https://app.sandbox.midtrans.com/snap/v1';

    const response = await axios.post(`${baseUrl}/transactions`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
    });

    return res.status(200).json({
      paymentUrl: response.data.redirect_url,
      token: response.data.token,
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    return res.status(500).json({ message: 'Error creating payment' });
  }
}