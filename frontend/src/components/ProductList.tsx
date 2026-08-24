import type { Product } from '../types/product';
import './css/ProductList.css';

interface ProductListProps {
  products: Product[];
  loading: boolean;
}

const statusLabels: Record<Product['status'], string> = {
  disponible: 'Disponible',
  stock_bajo: 'Stock bajo',
  sin_stock: 'Sin stock',
};

function ProductList({ products, loading }: ProductListProps) {
  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (products.length === 0) {
    return <p>No se encontraron productos con esos filtros.</p>;
  }

  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id} className="product-card">
          <img src={`/images/products/${product.code}.jpg`} alt={product.name} />
          <h3>{product.name}</h3>
          <p>SKU: {product.code}</p>
          <p className="product-category">{product.category}</p>
          <p className="product-price">${product.list_price.toLocaleString('es-CO')}</p>
          <p>Cantidad disponible: {product.qty_available}</p>
          <span className="status-badge" data-status={product.status}>
            {statusLabels[product.status]}
          </span>
          <p>Valor en inventario: ${product.inventory_value.toLocaleString('es-CO')}</p>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;