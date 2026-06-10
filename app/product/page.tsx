import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function AllProductsPage() {
  return (
    <>
      <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">All Products</h1>
          <p className="mt-1">Complete collection of engine oils and tyres</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}