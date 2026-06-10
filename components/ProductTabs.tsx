'use client';
import { useState } from 'react';
import { Product } from '@/data/products';

interface TabProps {
  product: Product;
}

export default function ProductTabs({ product }: TabProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'additional' | 'reviews' | 'shipping'>('description');

  const tabs = [
    { id: 'description', label: 'DESCRIPTION' },
    { id: 'additional', label: 'ADDITIONAL INFORMATION' },
    { id: 'reviews', label: 'REVIEWS (0)' },
    { id: 'shipping', label: 'SHIPPING & DELIVERY' },
  ];

  return (
    <div className="mt-12">
      <div className="border-b flex flex-wrap gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-2 px-1 text-sm font-semibold ${
              activeTab === tab.id
                ? 'border-b-2 border-amber-600 text-amber-600'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="py-6">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
            <p className="mt-2">
              A ac scelerisque adipiscing a vel augue vestibulum facilisi id aptent justo sociis neque a inceptos curae.
              A dis convallis natoque a sem ad adipiscing at per ullamcorper urna quam eleifend feugiat ut nostra nibh sem aliquam odio.
            </p>
            <h3 className="text-lg font-semibold mt-4">MAECENAS IACULIS</h3>
            <p>Nunc per mollis potenti amet imperdiet blandit dis eu sociosqu accumsan dapibus. Iaculis viverra tellus ridiculus a sed vestibulum dapibus. Ante a mollis habitant duis urna cum iaculis ullamcorper luctus.</p>
          </div>
        )}

        {activeTab === 'additional' && (
          <table className="w-full text-sm">
            <tbody>
              {product.attributes?.map((attr) => (
                <tr key={attr.name} className="border-b">
                  <td className="py-2 font-semibold w-1/3">{attr.name}</td>
                  <td className="py-2">{attr.value}</td>
                </tr>
              ))}
              <tr className="border-b"><td className="py-2 font-semibold">Category</td><td>{product.categories.join(', ')}</td></tr>
              <tr className="border-b"><td className="py-2 font-semibold">Stock Status</td><td>{product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}</td></tr>
            </tbody>
          </table>
        )}

        {activeTab === 'reviews' && (
          <div className="text-center py-8 text-gray-500">
            <p>No reviews yet. Be the first to review this product.</p>
            <button className="mt-3 bg-amber-600 text-white px-4 py-1 rounded">Write a review</button>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div>
            <p>Free shipping on orders over $200. Delivery within 3-5 business days.</p>
            <p className="mt-2">Returns accepted within 30 days. Please check our <a href="#" className="text-amber-600">Returns Policy</a>.</p>
          </div>
        )}
      </div>
    </div>
  );
}