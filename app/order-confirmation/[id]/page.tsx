'use client';
import Link from 'next/link';

export default function OrderConfirmation({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-green-600">Order Placed!</h1>
      <p className="mt-4">Your order ID: #{params.id}</p>
      <p className="mt-2">We will contact you shortly for payment and delivery.</p>
      <Link href="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded">Continue Shopping</Link>
    </div>
  );
}