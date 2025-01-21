import { NextResponse } from 'next/server';
import axios from 'axios';

export const runtime = 'nodejs';

// Define allowed methods
export const dynamic = 'force-dynamic';
export const allowedMethods = ['POST'];

const MIDTRANS_CONFIG = {
  serverKey: process.env.SERVER_KEY || '',
  clientKey: process.env.CLIENT_KEY || '',
  isProduction: 'false'
};

export async function POST(request) {
  try {
    const paymentRequest = await request.json();
    console.log(MIDTRANS_CONFIG.serverKey)
    
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

    return NextResponse.json({
      paymentUrl: response.data.redirect_url,
      token: response.data.token,
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { message: 'Error creating payment' },
      { status: 500 }
    );
  }
}