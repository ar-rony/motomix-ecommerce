import { NextResponse } from 'next/server';
import { products } from '@/data/products';
import { blogPosts } from '@/data/posts';

const normalize = (value: string) => value.trim().toLowerCase();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = normalize(url.searchParams.get('q') || '');

  if (!query) {
    return NextResponse.json({ products: [], posts: [] });
  }

  const matches = (text: string | undefined) =>
    text?.toLowerCase().includes(query) ?? false;

  const productResults = products
    .filter((product) =>
      matches(product.name) ||
      product.categories.some((category) => matches(category)) ||
      matches(product.slug) ||
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
