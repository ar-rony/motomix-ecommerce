import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/posts';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, UserIcon, ClockIcon, ArrowLeftIcon, TagIcon } from '@heroicons/react/24/outline';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: post.metaTitle || `${post.title} | Motorcycle Oil & Tyre Blog`,
    description: post.metaDescription || post.excerpt.slice(0, 160),
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt.slice(0, 160),
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image || '/images/og-default.jpg', width: 1200, height: 630 }],
      url: `https://localhost:3000/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt.slice(0, 160),
      images: [post.image || '/images/og-default.jpg'],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) notFound();

  // related posts logic same as before
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(tag => post.tags.includes(tag))))
    .slice(0, 3);

  return (
     <>
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-amber-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="text-gray-500 hover:text-amber-600">Blog</Link>
            <span className="mx-2">/</span>
            <span className="font-semibold">{post.title}</span>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-8">
        {/* Hero Image */}
        <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
          <Image src={post.image || '/placeholder.jpg'} alt={post.title} fill className="object-cover" />
        </div>

        {/* Post Header */}
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4" /> {post.date}</span>
            <span className="flex items-center gap-1"><UserIcon className="w-4 h-4" /> {post.author}</span>
            <span className="flex items-center gap-1"><ClockIcon className="w-4 h-4" /> {post.readTime} min read</span>
            <span className="flex items-center gap-1"><TagIcon className="w-4 h-4" /> {post.category}</span>
          </div>
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          
          {/* Post Content */}
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t">
            <span className="font-semibold">Tags:</span>
            {post.tags.map(tag => (
              <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="bg-gray-100 hover:bg-amber-100 text-gray-700 px-2 py-1 rounded text-sm">
                #{tag}
              </Link>
            ))}
          </div>

          {/* Back to Blog */}
          <div className="mt-8">
            <Link href="/blog" className="inline-flex items-center gap-1 text-amber-600 hover:gap-2 transition">
              <ArrowLeftIcon className="w-4 h-4" /> Back to all posts
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(related => (
                <Link href={`/blog/${related.slug}`} key={related.id} className="group">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image src={related.image || '/placeholder.jpg'} alt={related.title} fill className="object-cover group-hover:scale-105 transition" />
                  </div>
                  <h3 className="font-semibold mt-2 group-hover:text-amber-600">{related.title}</h3>
                  <p className="text-sm text-gray-500">{related.date}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}