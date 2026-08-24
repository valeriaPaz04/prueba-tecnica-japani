import type { ProductsSummary } from '../types/product';
import './css/Summary.css';

interface SummaryProps {
  summary: ProductsSummary | null;
}

function Summary({ summary }: SummaryProps) {
  if (!summary) return null;

  return (
    <section className="summary">
      <div className="summary-card">
        <span>Productos activos</span>
        <strong className="metric">{summary.active_products}</strong>
      </div>
      <div className="summary-card">
        <span>Stock bajo</span>
        <strong className="metric">{summary.low_stock_products}</strong>
      </div>
      <div className="summary-card">
        <span>Sin stock</span>
        <strong className="metric">{summary.out_of_stock_products}</strong>
      </div>
      <div className="summary-card summary-card--value">
        <span>Valor de inventario</span>
        <strong className="metric">${summary.inventory_value.toLocaleString('es-CO')}</strong>
      </div>
    </section>
  );
}

export default Summary;