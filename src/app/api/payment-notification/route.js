import { NextResponse } from 'next/server';
import pb from '@/services/pocketbaseservice';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const notification = await request.json();
    console.log('Notification received:', notification);

    if (notification.transaction_status === 'settlement' ||
        notification.transaction_status === 'capture') {

      // Update status order dengan await untuk memastikan perubahan tersimpan
      try {
        const updatedOrder = await pb.collection('orders').update(notification.order_id, {
          payment_status: 'completed',
          transaction_id: notification.transaction_id,
          payment_type: notification.payment_type,
          status_order: 'pending' // Update status order juga
        });

        console.log('Order updated successfully:', updatedOrder);
        
        // Redirect ke root setelah sukses
        return NextResponse.redirect('https://endlessly-pretty-yeti.ngrok-free.app/');
      } catch (updateError) {
        console.error('Error updating order:', updateError);
        throw updateError; // Re-throw untuk ditangkap oleh error handler utama
      }
    }

    return NextResponse.json({ 
      success: false, 
      message: 'Invalid transaction status' 
    });
  } catch (error) {
    console.error('Payment notification error:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing notification' },
      { status: 500 }
    );
  }
}
