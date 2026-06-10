import { notFound } from 'next/navigation';
import { products, Product } from '@/data/products';
import Image from 'next/image';
import AddToCartButton from '@/components/AddToCartButton';
import ProductTabs from '@/components/ProductTabs';
import RelatedProducts from '@/components/RelatedProducts';
// import { FacebookIcon, TwitterIcon, InstagramIcon, Share2Icon } from 'lucide-react';

// Generate static params at build time
export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

// Helper function to find product by slug (case-insensitive)
function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

// 👇 IMPORTANT: params is now a Promise in Next.js 15+
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;  // await the promise
  const product = getProduct(slug);
  
  if (!product) {
    notFound();
  }

  // Related products: same category, exclude current
  const related = products
    .filter((p) => p.categories.some((cat) => product.categories.includes(cat)) && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4 border-b">
        <div className="container mx-auto px-4 text-sm">
          <span className="text-gray-500">Home / Shop / Motorcycle /</span>
          <span className="font-semibold ml-1">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Product Main Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Image Gallery */}
          <div className="lg:w-1/2">
            <div className="sticky top-4">
              <div className="relative h-96 md:h-[500px] w-full bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.images[0]?.src || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {[product.images[0]?.src, product.images[0]?.src, product.images[0]?.src].map((img, idx) => (
                  <div key={idx} className="relative w-20 h-20 bg-gray-100 rounded border cursor-pointer">
                    <Image src={img || '/placeholder.jpg'} alt="thumb" fill className="object-contain p-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2">
              <span className="text-3xl font-bold text-amber-700">${product.price}</span>
              {product.regular_price && (
                <span className="text-gray-400 line-through ml-2">${product.regular_price}</span>
              )}
            </div>
            <div className="mt-4 text-gray-600" dangerouslySetInnerHTML={{ __html: product.description }} />
            
            {/* Add to Cart / View Cart Button */}
            <div className="mt-6">
              <AddToCartButton product={product} />
            </div>

            {/* Category & Share */}
            <div className="mt-6 pt-4 border-t">
              <p className="text-sm">
                <strong>Category:</strong> {product.categories.join(', ')}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm font-medium">Share:</span>
                {/* <div className="flex gap-2">
                  <FacebookIcon className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
                  <TwitterIcon className="w-5 h-5 text-gray-600 hover:text-blue-400 cursor-pointer" />
                  <InstagramIcon className="w-5 h-5 text-gray-600 hover:text-pink-500 cursor-pointer" />
                  <Share2Icon className="w-5 h-5 text-gray-600 hover:text-green-600 cursor-pointer" />
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <ProductTabs product={product} />

        {/* Extra Content Blocks */}
        <div className="grid md:grid-cols-2 gap-8 my-12">
          <div className="bg-gray-50 p-6 rounded">
            <h3 className="text-xl font-bold mb-3">MAECENAS IACULIS</h3>
            <p className="text-gray-600">
              Nunc per mollis potenti amet imperdiet blandit dis eu sociosqu accumsan dapibus.
              Iaculis viverra tellus ridiculus a sed vestibulum dapibus.
            </p>
            <ul className="list-disc ml-5 mt-3 space-y-1">
              <li>100% synthetic base (engine oil) or natural rubber compound (tyres)</li>
              <li>Abitur parturient praesent ipsum</li>
              <li>Minceptos pri 187cm/31.3" tall</li>
              <li>Diam parturient dictumst nibh mu</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded">
            <h3 className="text-xl font-bold mb-3">FEUGIAT PARTURIENT</h3>
            <p className="text-gray-600">
              Venenatis duis tristique accumsan netus enim in posuere torquent ut ullamcorper integer aliquam.
            </p>
            <div className="mt-4">
              <p><strong>Model's height:</strong> 5'9" (175 cm)</p>
              <p><strong>Model's wearing:</strong> Size Large</p>
            </div>
            <div className="mt-3">
              <h4 className="font-semibold">ALIQUET</h4>
              <p className="text-sm">Quam suspendisse adipiscing quis pretium nostra cubilia.</p>
            </div>
            <div className="mt-2">
              <h4 className="font-semibold">CURABITUR VELIT</h4>
              <p className="text-sm">Main: 76% Polyester, 24% Elastane (for reference).</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && <RelatedProducts products={related} />}
      </div>

      {/* Brand Strip */}
      <div className="border-y py-4 my-8">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
          <span>ALESSI</span> <span>evasolo</span> <span>FLOS</span> <span>HAY</span>
          <span>Joseph</span> <span>KLÜBER</span> <span>Louis poulsen</span>
        </div>
      </div>

     
    </>
  );
}