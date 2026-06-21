import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse all product categories.',
};

const categories = [
  {
    name: 'Engine Oil',
    slug: 'Engine Oil',
    description: 'Premium engine oils for motorcycles',
  },
  { name: 'Tyres', slug: 'Tyres', description: 'High-quality motorcycle tyres' },
  { name: 'Grades', slug: 'grades', description: 'Browse by oil grades' },
  {
    name: 'Companies',
    slug: 'companies',
    description: 'Browse by brand',
  },
];

export default function CategoriesPage() {
  return (
    <>
      <div className="bg-linear-to-r from-gray-800 to-gray-600 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="mt-1">Browse all available categories</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/product/category/${encodeURIComponent(cat.slug)}`}
              className="border rounded-lg p-6 hover:shadow-lg hover:border-amber-600 transition group"
            >
              <h3 className="text-xl font-bold group-hover:text-amber-600">
                {cat.name}
              </h3>
              <p className="text-gray-600 mt-2">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

