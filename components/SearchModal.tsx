'use client';

import { useEffect, useRef, useState } from 'react';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

interface SearchResult {
  id: number;
  name?: string;
  title?: string;
  slug: string;
  excerpt?: string;
  image: string;
  type: 'product' | 'post';
}

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setResults([]);
    setError('');
    inputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const abortController = new AbortController();
    const delay = setTimeout(async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data = await response.json();
        const results: SearchResult[] = [
          ...(data.products || []).map((product: any) => ({
            id: product.id,
            name: product.name,
            slug: product.slug,
            image: product.images?.[0]?.src || '/placeholder.jpg',
            type: 'product',
          })),
          ...(data.posts || []).map((post: any) => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            image: post.image || '/placeholder.jpg',
            type: 'post',
          })),
        ];

        setResults(results);
      } catch (err) {
        if ((err as any).name !== 'AbortError') {
          setError('Unable to load search results. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      clearTimeout(delay);
      abortController.abort();
    };
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6">
      <div className="w-full max-w-3xl rounded-3xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black/10 overflow-hidden">
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 px-5 py-4">
          <div className="flex items-center gap-3">
            <MagnifyingGlassIcon className="w-6 h-6 text-amber-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Search Motomix</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Type to search products and blog posts</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-4">
          <label className="sr-only" htmlFor="search-query">Search query</label>
          <input
            id="search-query"
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for oils, tyres, maintenance tips, brands..."
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-5 pb-6">
          {loading && (
            <div className="rounded-3xl border border-dashed border-amber-500 bg-amber-50 p-6 text-center text-amber-700">
              Loading results…
            </div>
          )}

          {!loading && error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
              {error}
            </div>
          )}

          {!loading && !query.trim() && (
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 text-center text-gray-700">
              Start typing to see matching products and blog posts.
            </div>
          )}

          {!loading && query.trim() && results.length === 0 && (
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 text-center text-gray-700">
              No results found for <span className="font-semibold">{query}</span>.
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-4">
              {results.map((result) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  href={result.type === 'product' ? `/product/${result.slug}` : `/blog/${result.slug}`}
                  onClick={onClose}
                  className="group block overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 transition hover:border-amber-300 hover:bg-amber-50 dark:border-gray-700 dark:bg-gray-950 dark:hover:border-amber-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-3xl bg-gray-100">
                      <Image src={result.image} alt={result.name || result.title || 'Result'} fill className="object-cover" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{result.name || result.title}</p>
                          {result.type === 'post' && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{result.excerpt}</p>}
                        </div>
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700 dark:bg-amber-500/20 dark:text-amber-100">
                          {result.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
