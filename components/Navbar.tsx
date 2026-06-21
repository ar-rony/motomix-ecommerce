'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useCart } from '@/context/CartContext';
import SearchModal from '@/components/SearchModal';
import {
  MagnifyingGlassIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  SunIcon,
  MoonIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

const slideAnimationStyles = `
  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .animate-slide-in {
    animation: slideInFromRight 0.3s ease-out;
  }
  
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }
`;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<'grades' | 'companies' | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const { cart, removeFromCart } = useCart();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch for theme
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  const gradeOptions = ['10W-30', '10W-40', '20W-40', '20W-50'];
  const companyOptions = ['Motul', 'Honda', 'Bajaj', 'TVS', 'Suzuki', 'Yamalube'];
  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'SHOP', href: '/product' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 sticky top-0 z-50 transition-colors">
      <style>{slideAnimationStyles}</style>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
            MOTOMIX<span className='text-red-500 text-3xl'>...</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6" ref={menuRef}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold transition ${
                  pathname === item.href
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400'
                }`}
              >
                {item.name}
              </Link>
            ))}

            <div className="relative group">
              <Link
                href="/product/category/grades"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400"
              >
                GRADES
              </Link>
              <div className="pointer-events-none absolute left-0 top-full z-20 mt-2 hidden min-w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl group-hover:pointer-events-auto group-hover:block dark:border-gray-700 dark:bg-gray-950">
                {gradeOptions.map((grade) => (
                  <Link
                    key={grade}
                    href={`/product/category/${encodeURIComponent(grade)}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    {grade}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative group">
              <Link
                href="/product/category/companies"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400"
              >
                COMPANIES
              </Link>
              <div className="pointer-events-none absolute left-0 top-full z-20 hidden min-w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl group-hover:pointer-events-auto group-hover:block dark:border-gray-700 dark:bg-gray-950">
                {companyOptions.map((company) => (
                  <Link
                    key={company}
                    href={`/product/category/${encodeURIComponent(company)}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    {company}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/blog"
              className={`text-sm font-semibold transition ${
                pathname === '/blog'
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400'
              }`}
            >
              BLOG
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400"
              aria-label="Open search"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>

            {/* User */}
            <button className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400">
              <UserIcon className="w-5 h-5" />
            </button>

            {/* Cart Icon with Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400"
              aria-label="Open cart"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400"
              aria-label="Toggle theme"
            >
              {mounted && theme === 'dark' ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-600 dark:text-gray-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t dark:border-gray-700">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm uppercase font-semibold ${
                    pathname === item.href
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t pt-4">
                <p className="text-xs uppercase text-gray-500 mb-2">Grades</p>
                <Link
                  href="/product/category/grades"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-sm text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 py-1"
                >
                  All Grades
                </Link>
                {gradeOptions.map((grade) => (
                  <Link
                    key={grade}
                    href={`/product/category/${encodeURIComponent(grade)}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-sm text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 py-1 pl-4"
                  >
                    {grade}
                  </Link>
                ))}
              </div>
              <div className="border-t pt-4">
                <p className="text-xs uppercase text-gray-500 mb-2">Companies</p>
                <Link
                  href="/product/category/companies"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-sm text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 py-1"
                >
                  All Companies
                </Link>
                {companyOptions.map((company) => (
                  <Link
                    key={company}
                    href={`/product/category/${encodeURIComponent(company)}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-sm text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 py-1 pl-4"
                  >
                    {company}
                  </Link>
                ))}
              </div>
              <div className="border-t pt-4">
                <Link
                  href="/blog"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-sm uppercase font-semibold ${
                    pathname === '/blog'
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400'
                  }`}
                >
                  BLOG
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Cart Slide Menu */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black bg-opacity-80 animate-fade-in"
              onClick={() => setIsCartOpen(false)}
            />
            {/* Slide Panel */}
            <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl flex flex-col animate-slide-in">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                  Shopping Cart
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {cart.items.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                    Your cart is empty
                  </p>
                ) : (
                  <div className="space-y-4">
                    {cart.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3 border-b dark:border-gray-700 pb-3"
                      >
                        {/* Product Image */}
                        {(item.images && item.images[0]) || item.image ? (
                          <img
                            src={
                              item.images && item.images[0]
                                ? item.images[0].src
                                : item.image
                            }
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : null}
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            ${item.price}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Qty: {item.quantity}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.items.length > 0 && (
                <div className="border-t dark:border-gray-700 p-4 space-y-3">
                  <div className="flex justify-between font-semibold text-gray-800 dark:text-white">
                    <span>Total:</span>
                    <span>
                      $
                      {cart.items
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="block w-full bg-amber-600 hover:bg-amber-700 text-white text-center py-2 rounded font-semibold transition"
                  >
                    View Cart
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="block w-full bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-center py-2 rounded font-semibold transition"
                  >
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
}