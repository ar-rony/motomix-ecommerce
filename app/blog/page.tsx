import { blogPosts } from '@/data/posts';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, UserIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: 'Motorcycle Oils & Tyres Blog | Maintenance Tips, Buying Guides & News',
  description: 'Expert advice on engine oils, tyre selection, motorcycle maintenance, and safety. Read our latest articles to keep your bike running smoothly.',
  keywords: 'motorcycle blog, engine oil tips, tyre guide, bike maintenance, riding safety',
  openGraph: {
    title: 'Motorcycle Oils & Tyres Blog',
    description: 'Expert advice on engine oils, tyre selection, and motorcycle maintenance.',
    type: 'website',
    url: 'https://localhost:3000/blog',
    images: [{ url: '/images/og-blog.jpg', width: 1200, height: 630 }],
  },
};

export default function BlogPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Our Blog</h1>
          <p className="text-gray-200 mt-2">Latest news, tips, and articles about motorcycle care</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-64 w-full bg-gray-200">
                    <Image src={post.image || '/placeholder.jpg'} alt={post.title} fill className="object-cover" />
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4" /> {post.date}</span>
                    <span className="flex items-center gap-1"><UserIcon className="w-4 h-4" /> {post.author}</span>
                    <span className="flex items-center gap-1"><ClockIcon className="w-4 h-4" /> {post.readTime} min read</span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-2xl font-bold hover:text-amber-600 transition">{post.title}</h2>
                  </Link>
                  <p className="text-gray-600 mt-2">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 mt-4 text-amber-600 font-medium hover:gap-2 transition">
                    Read more <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Categories */}
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-3">Categories</h3>
              <ul className="space-y-2">
                {Array.from(new Set(blogPosts.map(p => p.category))).map(cat => (
                  <li key={cat}>
                    <Link href={`/blog?category=${encodeURIComponent(cat)}`} className="text-gray-600 hover:text-amber-600">
                      {cat} ({blogPosts.filter(p => p.category === cat).length})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts */}
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-3">Recent Posts</h3>
              <div className="space-y-3">
                {blogPosts.slice(0, 3).map(post => (
                  <Link href={`/blog/${post.slug}`} key={post.id} className="flex gap-3 group">
                    <div className="w-16 h-16 relative bg-gray-100 rounded flex-shrink-0">
                      <Image src={post.image || '/placeholder.jpg'} alt={post.title} fill className="object-cover rounded" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium group-hover:text-amber-600 line-clamp-2">{post.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{post.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(blogPosts.flatMap(p => p.tags))).map(tag => (
                  <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="bg-gray-100 hover:bg-amber-100 text-gray-700 px-2 py-1 rounded text-xs">
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}