'use client';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function AddToCartButton({ product }: { product: Product }) {
  const { cart, dispatch } = useCart();

  // Check if product already in cart
  const isInCart = cart.items.some(item => item.id === product.id);

  const handleAdd = () => {
    if (isInCart) return; // Should not happen, but safety
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.images[0]?.src,
        quantity: 1,
      },
    });
    toast.success(`${product.name} added to cart`);
  };

  if (product.stock_status !== 'instock') {
    return (
      <button disabled className="bg-gray-300 text-gray-600 px-6 py-3 rounded font-semibold cursor-not-allowed">
        Out of Stock
      </button>
    );
  }

  if (isInCart) {
    return (
      <Link href="/cart">
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-semibold transition">
          View Cart →
        </button>
      </Link>
    );
  }

  return (
    <button onClick={handleAdd} className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded font-semibold transition">
      Add to Cart
    </button>
  );
}