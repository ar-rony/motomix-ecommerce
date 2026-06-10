import { notFound } from 'next/navigation';
import { products, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export async function generateStaticParams() {
  const allSubs = new Set<string>();
  products.forEach(p => {
    p.attributes?.forEach(attr => {
      if (attr.name === 'Viscosity' || attr.name === 'Size' || attr.name === 'Type') {
        allSubs.add(attr.value);
      }
    });
  });
  return Array.from(allSubs).map(sub => ({ subcategory: sub.toLowerCase().replace(/[^a-z0-9]+/g, '-'), original: sub }));
}

export default async function SubcategoryPage({ params }: { params: Promise<{ slug: string; subcategory: string }> }) {
  const { slug, subcategory } = await params;
  
  const categoryMap: Record<string, string> = { 'engine-oil': 'Engine Oil', 'tyres': 'Tyres' };
  const categoryName = categoryMap[slug];
  if (!categoryName) notFound();

  // Decode subcategory name from slug
  const subName = subcategory.replace(/-/g, ' ').toUpperCase();
  
  const filtered = products.filter(p => 
    p.categories.includes(categoryName) && p.attributes?.some(attr => attr.value === subName)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-sm mb-4">
        <Link href="/" className="text-gray-500">Home</Link> / 
        <Link href={`/category/${slug}`} className="text-gray-500 ml-1">{categoryName}</Link> / 
        <span className="font-semibold ml-1">{subName}</span>
      </div>
      <h1 className="text-3xl font-bold mb-6">{subName} {categoryName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}