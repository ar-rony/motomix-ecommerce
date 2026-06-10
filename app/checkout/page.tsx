'use client';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { cart, dispatch } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.items.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    // Simulate order creation
    const orderId = Math.floor(Math.random() * 10000);
    localStorage.removeItem('cart');
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Order placed!');
    router.push(`/order-confirmation/${orderId}`);
  };

  if (cart.items.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <form onSubmit={handleSubmit} className="lg:w-2/3 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="border p-2 rounded" required value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
            <input type="text" placeholder="Last Name" className="border p-2 rounded" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
          </div>
          <input type="text" placeholder="Address" className="w-full border p-2 rounded" required value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="City" className="border p-2 rounded" required value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
            <input type="text" placeholder="State" className="border p-2 rounded" required value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Pincode" className="border p-2 rounded" required value={formData.pincode} onChange={e => setFormData({ ...formData, pincode: e.target.value })} />
            <input type="tel" placeholder="Phone" className="border p-2 rounded" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded w-full hover:bg-blue-700">
            Place Order (Mock)
          </button>
        </form>
        <div className="lg:w-1/3 bg-gray-50 p-4 rounded-lg">
          <h2 className="font-bold text-lg">Your Order</h2>
          {cart.items.map(item => (
            <div key={item.id} className="flex justify-between py-1 text-sm">
              <span>{item.name} x{item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="border-t mt-2 pt-2 font-bold flex justify-between">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}