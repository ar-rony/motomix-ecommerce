import axios from 'axios';

const WP_URL = process.env.NEXT_PUBLIC_WP_URL;
const CONSUMER_KEY = process.env.NEXT_PUBLIC_WOO_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.NEXT_PUBLIC_WOO_CONSUMER_SECRET;

// Public API (no auth required for read endpoints)
export const wooApi = axios.create({
  baseURL: `${WP_URL}/wp-json/wc/v3`,
  auth: {
    username: CONSUMER_KEY!,
    password: CONSUMER_SECRET!,
  },
});

// Authenticated API for user-specific endpoints (requires JWT token)
export const wooAuthApi = (token: string) =>
  axios.create({
    baseURL: `${WP_URL}/wp-json/wc/v3`,
    headers: { Authorization: `Bearer ${token}` },
  });

// JWT authentication (login)
export const jwtLogin = async (username: string, password: string) => {
  const res = await axios.post(`${WP_URL}/wp-json/jwt-auth/v1/token`, {
    username,
    password,
  });
  return res.data;
};

// Fetch all products with filters
export async function fetchProducts(params?: {
  category?: number;
  per_page?: number;
  page?: number;
  search?: string;
}) {
  const response = await wooApi.get('/products', { params });
  return response.data;
}

// Fetch single product by slug or ID
export async function fetchProductBySlug(slug: string) {
  const response = await wooApi.get('/products', {
    params: { slug, per_page: 1 },
  });
  return response.data[0] || null;
}

// Fetch product by ID
export async function fetchProductById(id: number) {
  const response = await wooApi.get(`/products/${id}`);
  return response.data;
}

// Fetch categories
export async function fetchCategories() {
  const response = await wooApi.get('/products/categories', {
    params: { per_page: 50 },
  });
  return response.data;
}

// Create order (after checkout)
export async function createOrder(orderData: any, token?: string) {
  if (token) {
    const api = wooAuthApi(token);
    const response = await api.post('/orders', orderData);
    return response.data;
  } else {
    const response = await wooApi.post('/orders', orderData);
    return response.data;
  }
}