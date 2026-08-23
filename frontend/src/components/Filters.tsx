interface FiltersProps {
  search: string;
  category: string;
  status: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

function Filters({
  search,
  category,
  status,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
}: FiltersProps) {
  return (
    <div>
      <label htmlFor="search">Buscar</label>
      <input
        id="search"
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Nombre o código"
      />

      <label htmlFor="category">Categoría</label>
      <input
        id="category"
        type="text"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        placeholder="Ej: Frenos"
      />

      <label htmlFor="status">Estado</label>
      <select
        id="status"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="disponible">Disponible</option>
        <option value="stock_bajo">Stock bajo</option>
        <option value="sin_stock">Sin stock</option>
      </select>
    </div>
  );
}

export default Filters;