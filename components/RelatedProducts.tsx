import { Product } from '@/data/products';
import Link from 'next/link';
import Image from 'next/image';

export default function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden group hover:shadow-md transition">
            <Link href={`/product/${product.slug}`}>
              <div className="relative h-48 bg-gray-100">
                <Image src={product.images[0]?.src || '/placeholder.jpg'} alt={product.name} fill className="object-contain p-2" />
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-500">{product.categories[0]}</p>
                <h3 className="font-semibold text-sm">{product.name}</h3>
                <p className="text-amber-700 font-bold mt-1">${product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}