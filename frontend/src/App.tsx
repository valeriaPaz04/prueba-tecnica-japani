import { useEffect, useState } from 'react';
import type { Product, ProductsSummary } from './types/product';
import { getProducts, getSummary, type ProductFilters } from './api/products';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [summary, setSummary] = useState<ProductsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  // Se ejecuta una vez, cuando el componente aparece por primera vez.
  useEffect(() => {
    getSummary()
      .then(setSummary)
      .catch((err) => {
        console.error(err);
        setError('No se pudo cargar el resumen');
      });
  }, []);

  // Se ejecuta al aparecer, Y cada vez que search/category/status cambian.
  useEffect(() => {
    setLoading(true);
    setError(null);

    const filters: ProductFilters = { search, category, status };

    getProducts(filters)
      .then(setProducts)
      .catch((err) => {
        console.error(err);
        setError('No se pudieron cargar los productos');
      })
      .finally(() => setLoading(false));
  }, [search, category, status]);

  return (
    <div>
      <h1>Japani Digital - Inventario</h1>
    </div>
  );
}

export default App;