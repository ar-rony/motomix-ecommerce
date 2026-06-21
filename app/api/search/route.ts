import { NextResponse } from 'next/server';
import { products } from '@/data/products';
import { blogPosts } from '@/data/posts';

const normalize = (value: string) =>
  value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '');

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = normalize(url.searchParams.get('q') || '');

  if (!query) {
    return NextResponse.json({ products: [], posts: [] });
  }

  const matches = (text: string | undefined) =>
    normalize(text || '').includes(query);

  const productResults = products
    .filter((product) =>
      matches(product.name) ||
      matches(product.slug) ||
      matches(product.company) ||
      matches(product.grade) ||
      product.categories.some((category) => matches(category)) ||
      product.attributes?.some((attr) => matches(attr.value))
    )
    .slice(0, 8);

  const postResults = blogPosts
    .filter((post) =>
      matches(post.title) ||
      matches(post.excerpt) ||
      matches(post.category) ||
      post.tags.some((tag) => matches(tag))
    )
    .slice(0, 6);

  return NextResponse.json({ products: productResults, posts: postResults });
}
