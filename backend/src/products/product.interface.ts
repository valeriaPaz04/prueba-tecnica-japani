// Describe la forma exacta de un registro tal como viene en productos_japani_digital.json.
export interface RawProduct {
  id: number;
  default_code: string;
  name: string;
  categ_name: string | null;
  list_price: number;
  qty_available: number;
  active: boolean;
}

export type ProductStatus = 'disponible' | 'stock_bajo' | 'sin_stock';

// Esto es lo que la API devuelve: el producto original
// más los campos que calcularemos.
export interface ProductResponse {
  id: number;
  name: string;
  code: string;
  category: string;
  list_price: number;
  qty_available: number;
  status: ProductStatus;
  inventory_value: number;
}
