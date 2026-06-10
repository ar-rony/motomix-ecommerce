'use client';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function CartPage() {
  const { cart, dispatch } = useCart();

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link href="/" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {cart.items.map(item => (
            <div key={item.id} className="flex flex-wrap gap-4 border-b py-4">
              <div className="w-24 h-24 relative bg-gray-100 rounded">
                <Image src={item.image || '/placeholder.jpg'} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 border rounded">
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 border rounded">
                    <PlusIcon className="w-4 h-4" />
                  </button>
                  <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="font-semibold">₹{item.price * item.quantity}</div>
            </div>
          ))}
        </div>
        <div className="lg:w-1/3 bg-gray-50 p-4 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between py-2">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <div className="flex justify-between py-2 border-t">
            <span className="font-bold">Total</span>
            <span className="font-bold text-xl">₹{total}</span>
          </div>
          <Link href="/checkout">
            <button className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}