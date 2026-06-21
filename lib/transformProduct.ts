import { Product } from '@/data/products';

export function transformWooProduct(wooProduct: any): Product {
  // Extract attributes
  const attributes = wooProduct.attributes.map((attr: any) => ({
    name: attr.name,
    value: attr.options.join(', '),
  }));

  // Determine categories
  const categories = wooProduct.categories.map((cat: any) => cat.name);

  return {
    id: wooProduct.id,
    name: wooProduct.name,
    slug: wooProduct.slug,
    price: wooProduct.price,
    regular_price: wooProduct.regular_price,
    description: wooProduct.description,
    short_description: wooProduct.short_description,
    categories: categories,
    images: wooProduct.images.map((img: any) => ({ src: img.src })),
    stock_status: wooProduct.stock_status,
    attributes: attributes,
    is_new: false, // You can compute from date_created if needed
    is_bestseller: false, // Could be fetched from meta or computed from sales
    views: wooProduct.meta_data?.find((m: any) => m.key === 'total_sales')?.value || 0,
  };
}