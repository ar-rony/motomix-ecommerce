import type { Metadata } from 'next';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const normalizeQuery = (value?: string) =>
  value?.trim().toLowerCase().replace(/[^a-z0-9]+/g, '') ?? '';

const gradeOptions = ['10W-30', '10W-40', '20W-40', '20W-50'];
const companyOptions = ['Motul', 'Honda', 'Bajaj', 'TVS', 'Suzuki', 'Yamalube'];
const productCategories = ['Engine Oil', 'Tyres'];

const getCategoryType = (slug: string) => {
  const normalized = normalizeQuery(slug);
  if (gradeOptions.some((g) => normalizeQuery(g) === normalized)) return 'grade';
  if (companyOptions.some((c) => normalizeQuery(c) === normalized)) return 'company';
  if (
    normalized === normalizeQuery('grades') ||
    normalized === normalizeQuery('companies')
  )
    return 'list';
  if (productCategories.some((c) => normalizeQuery(c) === normalized))
    return 'category';
  return 'unknown';
};

const getCategoryTitle = (slug: string) => {
  const type = getCategoryType(slug);
  const normalized = normalizeQuery(slug);

  if (type === 'grade') return `Grade: ${slug}`;
  if (type === 'company') return `Company: ${slug}`;
  if (normalized === normalizeQuery('grades')) return 'Grades';
  if (normalized === normalizeQuery('companies')) return 'Companies';
  if (type === 'category')
    return normalized === normalizeQuery('Engine Oil') ? 'Engine Oils' : 'Tyres';
  return slug;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = getCategoryTitle(slug);
  return {
    title,
    description: `Browse ${title} motorcycle products.`,
  };
}

export async function generateStaticParams() {
  const allSlugs = [
    ...gradeOptions,
    ...companyOptions,
    'grades',
    'companies',
    'Engine Oil',
    'Tyres',
  ];
  return allSlugs.map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const type = getCategoryType(slug);
  const normalized = normalizeQuery(slug);

  let filteredProducts = products;

  if (type === 'grade') {
    filteredProducts = products.filter((product) =>
      normalizeQuery(product.grade) === normalized
    );
  } else if (type === 'company') {
    filteredProducts = products.filter((product) =>
      normalizeQuery(product.company) === normalized
    );
  } else if (normalized === normalizeQuery('grades')) {
    filteredProducts = products.filter((product) => !!product.grade);
  } else if (normalized === normalizeQuery('companies')) {
    filteredProducts = products.filter((product) => !!product.company);
  } else if (type === 'category') {
    const categoryName =
      normalized === normalizeQuery('Engine Oil') ? 'Engine Oil' : 'Tyres';
    filteredProducts = products.filter((product) =>
      product.categories.includes(categoryName)
    );
  }

  const title = getCategoryTitle(slug);
  const subtitle =
    type === 'grade'
      ? 'grade'
      : type === 'company'
      ? 'company'
      : type === 'category'
      ? 'category'
      : type === 'list'
      ? normalized === normalizeQuery('grades')
        ? 'grade'
        : 'company'
      : 'product';

  return (
    <>
      <div className="bg-linear-to-r from-gray-800 to-gray-600 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-1">Browse products filtered by {subtitle}.</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <p className="text-xl font-semibold">No products found.</p>
            <p className="mt-2">Try selecting a different {subtitle}.</p>
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