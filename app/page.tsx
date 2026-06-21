'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { blogPosts } from '@/data/posts';
import ProductCard from '@/components/ProductCard';
import { StarIcon, TruckIcon, ShieldCheckIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'new' | 'bestsellers' | 'mostviewed'>('new');

  // Filter products by tab
  const getTabProducts = () => {
    if (activeTab === 'new') return products.filter(p => p.is_new).slice(0, 10);
    if (activeTab === 'bestsellers') return products.filter(p => p.is_bestseller).slice(0, 10);
    return products.sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 10);
  };

  return (
    <>
      {/* HERO SECTION - with motorcycle image and text for oils/tyres */}
      <section className="relative bg-black text-white h-70vh">
        <div className="absolute inset-0 z-0">
          <Image src="/bike.jpg" alt="Motorcycle" fill className="object-cover opacity-40" />
        </div>
        <div className="relative z-10 container items-center justify-center mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold">The Three Traction Level Control System.</h1>
            <p className="text-lg mt-4 text-gray-200">The price you pay on engine oil or tyres is the money you get back on performance. Just a little more incentive to get you certain the claims of covering long distances.</p>
            <div className="mt-8 flex gap-4">
              <Link href="/product/category/engine-oil" className="bg-amber-600 hover:bg-amber-700 px-6 py-3 rounded-md font-semibold">Shop Oils</Link>
              <Link href="/product/category/tyres" className="border border-white hover:bg-white hover:text-black px-6 py-3 rounded-md font-semibold transition">Shop Tyres</Link>
            </div>
          </div>
        </div>
      </section>



      {/* Featured Products with Tabs */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-2">Featured Products</h2>
        <p className="text-center text-gray-500 mb-6">A laoreet ad litora consequat a luctus a suspendisse</p>
        
        <div className="flex justify-center gap-8 border-b pb-2 mb-8">
          <button onClick={() => setActiveTab('new')} className={`pb-2 text-lg font-semibold ${activeTab === 'new' ? 'border-b-2 border-amber-600 text-amber-600' : 'text-gray-500'}`}>NEW ARRIVALS</button>
          <button onClick={() => setActiveTab('bestsellers')} className={`pb-2 text-lg font-semibold ${activeTab === 'bestsellers' ? 'border-b-2 border-amber-600 text-amber-600' : 'text-gray-500'}`}>BESTSELLERS</button>
          <button onClick={() => setActiveTab('mostviewed')} className={`pb-2 text-lg font-semibold ${activeTab === 'mostviewed' ? 'border-b-2 border-amber-600 text-amber-600' : 'text-gray-500'}`}>MOST VIEWED</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {getTabProducts().map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Text block: "Together This Affords a Sporty Position" */}
      <section className="bg-gray-100 py-12 mt-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h3 className="text-3xl font-bold">Together This Affords a Sporty Position.</h3>
            <p className="mt-4 text-gray-600">Is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances toil.</p>
            <Link href="/product" className="mt-6 bg-amber-600 text-white px-6 py-2 rounded">
              SHOP NOW
            </Link>
          </div>
          <div className="md:w-1/2 relative h-64">
            <Image src="/images/sporty-position.jpg" alt="Sporty riding" fill className="object-cover rounded-lg" />
          </div>
        </div>
      </section>

  {/* Text block: "Together This Affords a Sporty Position" */}
      <section className="bg-gray-100 py-12 mt-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-center">
           <div className="md:w-1/2 relative h-64 ">
            <Image src="/images/sporty-position.jpg" alt="Sporty riding" fill className="object-cover rounded-lg" />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-3xl font-bold">Together This Affords a Sporty Position.</h3>
            <p className="mt-4 text-gray-600">Is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances toil.</p>
            <Link href="/product" className=" bg-amber-600 text-white px-6 py-2 rounded mt-6">
              SHOP NOW
            </Link>
          </div>
         
        </div>
      </section>


      {/* Maneuverability And Lightness + Triumph Triple RS (adapted) */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h3 className="text-3xl font-bold">Maneuverability And Lightness</h3>
            <p className="text-xl mt-2 text-amber-400">Triumph Triple RS</p>
            <p className="mt-4 text-gray-300">Our premium tyre and oil combinations give you the ultimate control and feedback.</p>
            <Link href="/category" className="mt-6 border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition">
              Explore
            </Link>
          </div>
          <div className="md:w-1/2 relative h-80">
            <Image src="/images/triumph-triple.jpg" alt="Triumph" fill className="object-cover rounded" />
          </div>
        </div>
      </section>

      {/* Our New Article (blog preview) */}

<section className="container mx-auto px-4 py-12">
  <h2 className="text-3xl font-bold text-center mb-2">Our New Article</h2>
  <p className="text-center text-gray-500 mb-8">A laoreet ad litora consequat a luctus a suspendisse.</p>
  <div className="grid md:grid-cols-3 gap-8">
    {blogPosts.slice(0, 3).map((blog) => (
      <div key={blog.id} className="border rounded-lg overflow-hidden shadow hover:shadow-md transition">
        <Link href={`/blog/${blog.slug}`}>
          <div className="relative h-48 bg-gray-200">
            <Image src={blog.image || '/placeholder.jpg'} alt={blog.title} fill className="object-cover" />
          </div>
        </Link>
        <div className="p-4">
          <p className="text-xs text-gray-500">{blog.date}</p>
          <Link href={`/blog/${blog.slug}`}>
            <h3 className="font-bold text-lg mt-1 hover:text-amber-600">{blog.title}</h3>
          </Link>
          <p className="text-gray-600 text-sm mt-2 line-clamp-3">{blog.excerpt}</p>
          <Link href={`/blog/${blog.slug}`} className="text-amber-600 text-sm mt-2 inline-block hover:underline">
            Read more →
          </Link>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Newsletter & Social Proof */}
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold">Do You Like Theme?</h3>
          <p className="text-gray-600">Share With Your Friends!</p>
          <div className="flex justify-center gap-4 mt-4">
            <input type="email" placeholder="Your email address" className="border rounded px-4 py-2 w-64" />
            <button className="bg-amber-600 text-white px-6 py-2 rounded">Subscribe</button>
          </div>
          <p className="text-xs text-gray-400 mt-2">Will be used in accordance with our Privacy Policy</p>
          <div className="mt-6 flex justify-center gap-4 text-sm text-gray-500">
            <span>Jim Wood - Google Inc.</span>
          </div>
        </div>
      </div>

    </>
  );
}