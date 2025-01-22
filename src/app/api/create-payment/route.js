import { NextResponse } from 'next/server';
import axios from 'axios';
import pb from '@/services/pocketbaseservice';

export async function POST(request) {
  try {
    const paymentRequest = await request.json();
    
    // 1. Buat order utama
    const orderData = {
      total_price: parseInt(paymentRequest.amount),
      customer: paymentRequest.userId, // ID relasi untuk customer jika ada
      status_order: 'waiting_payment',
      no_table: paymentRequest.tableNumber,
      payment_status: 'pending',
      menu: paymentRequest.itemDetails.map(item => item.id) // Relasi ke menu
    };

    // Buat record di collection orders
    const order = await pb.collection('orders').create(orderData);
    console.log('Order created:', order.id);

    // 2. Buat order_items untuk setiap item
    const createdOrderItems = await Promise.all(
      paymentRequest.itemDetails.map(item => 
        pb.collection('order_items').create({
          order_id: order.id,
          menu_id: item.id,
          quantity: parseInt(item.quantity),
          price: parseInt(item.total_price),
          subtotal: parseInt(item.price) * parseInt(item.quantity)
        })
      )
    );

    // 3. Update orders dengan relasi ke order_items yang baru dibuat
    await pb.collection('orders').update(order.id, {
      items: createdOrderItems.map(item => item.id) // Tambahkan relasi ke order_items
    });

    // 4. Buat payload untuk Midtrans
    const payload = {
      transaction_details: {
        order_id: order.id,
        gross_amount: parseInt(paymentRequest.amount),
      },
      customer_details: {
        first_name: paymentRequest.customerName,
        email: paymentRequest.customerEmail,
      },
      item_details: paymentRequest.itemDetails.map(item => ({
        id: item.id,
        price: parseInt(item.price),
        name: item.name,
        quantity: parseInt(item.quantity)
      })),
      custom_field1: `${paymentRequest.tableNumber}`,
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
        error: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/`
      }
    };

    const auth = Buffer.from(process.env.SERVER_KEY + ':').toString('base64');
    const baseUrl = process.env.NODE_ENV === 'production'
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
      orderId: order.id
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { message: 'Error creating payment', details: error.message },
      { status: 500 }
    );
  }
}