'use client';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const getSubcategories = (categoryName: string) => {
  const subs = new Set<string>();
  products
    .filter(p => p.categories.includes(categoryName))
    .forEach(p => {
      p.attributes?.forEach(attr => {
        if (attr.name === 'Viscosity' || attr.name === 'Size' || attr.name === 'Type') {
          subs.add(attr.value);
        }
      });
    });
  return Array.from(subs);
};

const getTopRatedProducts = (categoryName: string) => {
  return products
    .filter(p => p.categories.includes(categoryName))
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 4);
};

export default function CategoryContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  // State for filters (initialized with default values, updated after mount)
  const [filters, setFilters] = useState({
    sub: null as string | null,
    sort: 'default',
    minPrice: 0,
    maxPrice: 500,
    sale: false,
    instock: false,
  });
  const [mounted, setMounted] = useState(false);

  // Sync with URL search params after mount
  useEffect(() => {
    setFilters({
      sub: searchParams.get('sub'),
      sort: searchParams.get('sort') || 'default',
      minPrice: searchParams.get('min_price') ? parseInt(searchParams.get('min_price')!) : 0,
      maxPrice: searchParams.get('max_price') ? parseInt(searchParams.get('max_price')!) : 500,
      sale: searchParams.get('sale') === 'true',
      instock: searchParams.get('instock') === 'true',
    });
    setMounted(true);
  }, [searchParams]);

  const categoryMap: Record<string, string> = {
    'engine-oil': 'Engine Oil',
    'tyres': 'Tyres',
    'motorcycle': '',
  };
  const categoryName = categoryMap[slug] || (slug === 'motorcycle' ? '' : slug);
  
  // Apply filters
  let filteredProducts = categoryName 
    ? products.filter(p => p.categories.includes(categoryName))
    : products;

  if (filters.sub) {
    filteredProducts = filteredProducts.filter(p => 
      p.attributes?.some(attr => attr.value === filters.sub)
    );
  }
  if (filters.minPrice > 0) {
    filteredProducts = filteredProducts.filter(p => parseFloat(p.price) >= filters.minPrice);
  }
  if (filters.maxPrice < 500) {
    filteredProducts = filteredProducts.filter(p => parseFloat(p.price) <= filters.maxPrice);
  }
  if (filters.sale) {
    filteredProducts = filteredProducts.filter(p => 
      p.regular_price && parseFloat(p.regular_price) > parseFloat(p.price)
    );
  }
  if (filters.instock) {
    filteredProducts = filteredProducts.filter(p => p.stock_status === 'instock');
  }

  // Sorting
  if (filters.sort === 'price_low') {
    filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (filters.sort === 'price_high') {
    filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (filters.sort === 'rating') {
    filteredProducts.sort((a, b) => (b.views || 0) - (a.views || 0));
  } else if (filters.sort === 'newest') {
    filteredProducts.sort((a, b) => (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0));
  }

  const subcategories = categoryName ? getSubcategories(categoryName) : [];
  const topRated = categoryName ? getTopRatedProducts(categoryName) : products.slice(0, 4);

  const updateFilters = (updates: Partial<typeof filters>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    const newParams = new URLSearchParams();
    if (newFilters.sub) newParams.set('sub', newFilters.sub);
    if (newFilters.sort !== 'default') newParams.set('sort', newFilters.sort);
    if (newFilters.minPrice > 0) newParams.set('min_price', newFilters.minPrice.toString());
    if (newFilters.maxPrice < 500) newParams.set('max_price', newFilters.maxPrice.toString());
    if (newFilters.sale) newParams.set('sale', 'true');
    if (newFilters.instock) newParams.set('instock', 'true');
    router.push(`/category/${slug}?${newParams.toString()}`);
  };

  // Avoid rendering mismatched content before client mount
  if (!mounted) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <>
      <div className="bg-gray-50 py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-amber-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/" className="text-gray-500 hover:text-amber-600">Other</Link>
            <span className="mx-2">/</span>
            <span className="font-semibold">{categoryName || 'Motorcycle'}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="space-y-6">
              <div className="border rounded p-4">
                <h3 className="font-bold text-lg mb-3">FILTER BY PRICE</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Price: ${filters.minPrice} - ${filters.maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.maxPrice}
                    onChange={(e) => updateFilters({ maxPrice: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex gap-2 mt-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => updateFilters({ minPrice: parseInt(e.target.value) || 0 })}
                      className="border rounded p-1 w-20 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => updateFilters({ maxPrice: parseInt(e.target.value) || 500 })}
                      className="border rounded p-1 w-20 text-sm"
                    />
                    <button
                      onClick={() => updateFilters({ minPrice: 0, maxPrice: 500 })}
                      className="text-xs text-red-500"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              <div className="border rounded p-4">
                <h3 className="font-bold text-lg mb-3">PRODUCT STATUS</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.sale}
                      onChange={(e) => updateFilters({ sale: e.target.checked })}
                    />
                    <span>On sale</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.instock}
                      onChange={(e) => updateFilters({ instock: e.target.checked })}
                    />
                    <span>In stock</span>
                  </label>
                </div>
              </div>

              <div className="border rounded p-4">
                <h3 className="font-bold text-lg mb-3">TOP RATED PRODUCTS</h3>
                <div className="space-y-3">
                  {topRated.map(product => (
                    <Link href={`/product/${product.slug}`} key={product.id} className="flex gap-2 group">
                      <div className="w-12 h-12 relative bg-gray-100 rounded">
                        <Image src={product.images[0]?.src || '/placeholder.jpg'} alt={product.name} fill className="object-contain" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium group-hover:text-amber-600 line-clamp-2">{product.name}</h4>
                        <div className="text-amber-700 font-bold text-sm">${product.price}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:w-3/4">
            <div className="flex flex-wrap justify-between items-center mb-6">
              <p className="text-gray-500 text-sm">Showing {filteredProducts.length} products</p>
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort by:</span>
                <select
                  value={filters.sort}
                  onChange={(e) => updateFilters({ sort: e.target.value })}
                  className="border rounded p-1 text-sm"
                >
                  <option value="default">Default sorting</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Top rated</option>
                  <option value="newest">Newest first</option>
                </select>
              </div>
            </div>

            {subcategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => updateFilters({ sub: null })}
                  className={`px-3 py-1 text-sm rounded-full ${!filters.sub ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  All
                </button>
                {subcategories.map(sub => (
                  <button
                    key={sub}
                    onClick={() => updateFilters({ sub })}
                    className={`px-3 py-1 text-sm rounded-full ${filters.sub === sub ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded">
                <p className="text-gray-500">No products found.</p>
                <button onClick={() => updateFilters({ sub: null, minPrice: 0, maxPrice: 500, sale: false, instock: false, sort: 'default' })} className="mt-2 text-amber-600">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Brand Strip and Footer as before */}
      <div className="border-y py-4 my-8">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
          <span>ALESSI</span> <span>evasolo</span> <span>FLOS</span> <span>HAY</span>
          <span>Joseph</span> <span>KLÜBER</span> <span>Louis poulsen</span>
        </div>
      </div>

      <footer className="bg-black text-white py-10">
        {/* footer content – same as before */}
      </footer>
    </>
  );
}