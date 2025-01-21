// app/api/payment-notification/route.js
import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase';
import pb from '@/services/pocketbaseservice';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const notification = await request.json();
    
    // Verify the transaction status
    if (notification.transaction_status === 'settlement' || 
        notification.transaction_status === 'capture') {
      
      // Extract order details from the order_id
      const orderData = JSON.parse(Buffer.from(notification.order_id, 'base64').toString('utf-8'));
      console.log(notification)
      // Create order record in PocketBase
      const data = {
        total_price: parseFloat(notification.gross_amount),
        customer: '', // ID relasi untuk customer
        status_order: 'pending',        // Status order awal
        menu:[],        // Array ID relasi menu
        no_table: 2, // Nomor meja
        items: [],       // Array ID relasi item
        payment_status: 'completed',    // Status pembayaran
      };

      await pb.collection('orders').create(data);

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: 'Invalid transaction status' });
  } catch (error) {
    console.error('Payment notification error:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing notification' },
      { status: 500 }
    );
  }
}