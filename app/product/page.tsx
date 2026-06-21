import type { Metadata } from 'next';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

interface ProductPageProps {
  searchParams?: {
    search?: string;
    grade?: string;
    company?: string;
  };
}

const normalizeQuery = (value?: string) =>
  value?.trim().toLowerCase().replace(/[^a-z0-9]+/g, '') ?? '';

const getShopHeading = (searchParams?: ProductPageProps['searchParams']) => {
  const search = normalizeQuery(searchParams?.search);
  const grade = normalizeQuery(searchParams?.grade);
  const company = normalizeQuery(searchParams?.company);

  return grade
    ? `Grade: ${searchParams?.grade}`
    : company
    ? `Company: ${searchParams?.company}`
    : search
    ? `Search results for "${searchParams?.search}"`
    : 'All Products';
};

export function generateMetadata({ searchParams }: ProductPageProps): Metadata {
  const title = getShopHeading(searchParams);
  return {
    title,
    description: 'Browse motorcycle oils and tyres by grade, company, or search query.',
  };
}

export default function AllProductsPage({ searchParams }: ProductPageProps) {
  const search = normalizeQuery(searchParams?.search);
  const grade = normalizeQuery(searchParams?.grade);
  const company = normalizeQuery(searchParams?.company);

  const filteredProducts = products.filter((product) => {
    if (grade) {
      return normalizeQuery(product.grade) === grade;
    }

    if (company) {
      return normalizeQuery(product.company) === company;
    }

    if (!search) {
      return true;
    }

    const matchesText = [
      product.name,
      product.slug,
      product.company,
      product.grade,
      ...product.categories,
      ...(product.attributes?.map((attr) => attr.value) ?? []),
    ]
      .filter(Boolean)
      .some((text) => normalizeQuery(text).includes(search));

    return matchesText;
  });

  const heading = grade
    ? `Grade: ${searchParams?.grade}`
    : company
    ? `Company: ${searchParams?.company}`
    : search
    ? `Search results for "${searchParams?.search}"`
    : 'All Products';

  return (
    <>
      <div className="bg-linear-to-r from-gray-800 to-gray-600 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">{heading}</h1>
          <p className="mt-1">Complete collection of engine oils and tyres</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <p className="text-xl font-semibold">No products found.</p>
            <p className="mt-2">Try a different grade or company.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}