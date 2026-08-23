import type { ProductsSummary } from '../types/product';

interface SummaryProps {
  summary: ProductsSummary | null;
}

function Summary({ summary }: SummaryProps) {
  if (!summary) {
    return null;
  }

  return (
    <section>
      <div>
        <span>Productos activos</span>
        <strong>{summary.active_products}</strong>
      </div>
      <div>
        <span>Stock bajo</span>
        <strong>{summary.low_stock_products}</strong>
      </div>
      <div>
        <span>Sin stock</span>
        <strong>{summary.out_of_stock_products}</strong>
      </div>
      <div>
        <span>Valor de inventario</span>
        <strong>${summary.inventory_value.toLocaleString('es-CO')}</strong>
      </div>
    </section>
  );
}

export default Summary;