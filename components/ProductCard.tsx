'use client';
import { Product } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

export default function ProductCard({ product, showAddToCart = true }: ProductCardProps) {
  const { dispatch, cart } = useCart();

  const isInCart = cart.items.some(item => item.id === product.id);
  const discount = product.regular_price && parseFloat(product.regular_price) > parseFloat(product.price)
    ? Math.round(((parseFloat(product.regular_price) - parseFloat(product.price)) / parseFloat(product.regular_price)) * 100)
    : 0;

  const addToCart = () => {
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

  // Deterministic rating and review count
  const rating = 3.5 + ((product.id * 13) % 15) / 10;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const reviewCount = (product.id * 7) % 45 + 5;

  return (
    <div className="group relative border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
      {discount > 0 && (
        <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          {discount}% OFF
        </div>
      )}
      {product.is_new && !discount && (
        <div className="absolute top-2 left-2 z-10 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
          NEW
        </div>
      )}

      <Link href={`/product/${product.slug}`}>
        <div className="relative h-48 w-full bg-gray-100">
          <Image 
            src={product.images[0]?.src || '/placeholder.jpg'} 
            alt={product.name} 
            fill 
            className="object-contain p-4 group-hover:scale-105 transition" 
          />
        </div>
      </Link>

      <div className="p-3">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-sm hover:text-amber-600 line-clamp-2">{product.name}</h3>
        </Link>
        
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-xs text-amber-500">
              {i < fullStars ? '★' : (i === fullStars && hasHalfStar ? '½' : '☆')}
            </span>
          ))}
          <span className="text-xs text-gray-400 ml-1">({reviewCount})</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-amber-700 font-bold">${product.price}</span>
          {product.regular_price && parseFloat(product.regular_price) > parseFloat(product.price) && (
            <span className="text-gray-400 text-xs line-through">${product.regular_price}</span>
          )}
        </div>

        {showAddToCart && (
          isInCart ? (
            // If product is already in cart, show a Link to cart page
            <Link href="/cart">
              <button className="mt-3 w-full text-sm py-1.5 rounded transition bg-green-600 text-white hover:bg-green-700 cursor-pointer">
                VIEW CART →
              </button>
            </Link>
          ) : (
            <button
              onClick={addToCart}
              disabled={product.stock_status !== 'instock'}
              className={`mt-3 w-full text-sm py-1.5 rounded transition ${
                product.stock_status === 'instock'
                  ? 'bg-gray-800 text-white hover:bg-amber-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.stock_status === 'instock' ? 'ADD TO CART' : 'OUT OF STOCK'}
            </button>
          )
        )}
      </div>
    </div>
  );
}