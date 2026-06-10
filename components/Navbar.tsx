'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useCart } from '@/context/CartContext';
import {Image} from 'next/image';
import {
  MagnifyingGlassIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch for theme
  useState(() => setMounted(true), []);

  const cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'SHOP', href: '/product' },
    { name: 'BLOG', href: '/blog' },
    { name: 'Categories', href: '/category' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
          
             MOTOMIX<span className='text-red-500 text-3xl'>...</span>
           
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
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
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>

            {/* User */}
            <button className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400">
              <UserIcon className="w-5 h-5" />
            </button>

            {/* Cart Icon with Badge */}
            <Link href="/cart" className="relative text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400">
              <ShoppingCartIcon className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>

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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}