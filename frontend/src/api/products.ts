import type { Product, ProductsSummary } from '../types/product';

const API_URL = import.meta.env.VITE_API_URL;

export interface ProductFilters {
  search?: string;
  category?: string;
  status?: string;
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.category) params.set('category', filters.category);
  if (filters.status) params.set('status', filters.status);

  const response = await fetch(`${API_URL}/products?${params}`);

  if (!response.ok) {
    throw new Error('No se pudieron cargar los productos');
  }

  return response.json();
}

export async function getSummary(): Promise<ProductsSummary> {
  const response = await fetch(`${API_URL}/summary`);

  if (!response.ok) {
    throw new Error('No se pudo cargar el resumen');
  }

  return response.json();
}