export type ProductStatus = 'disponible' | 'stock_bajo' | 'sin_stock';

export interface Product {
  id: number;
  name: string;
  code: string;
  category: string;
  list_price: number;
  qty_available: number;
  status: ProductStatus;
  inventory_value: number;
}

export interface ProductsSummary {
  active_products: number;
  low_stock_products: number;
  out_of_stock_products: number;
  inventory_value: number;
}