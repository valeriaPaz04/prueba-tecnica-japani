import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    service = new ProductsService();
  });

  it('calcula el estado según la cantidad disponible', () => {
    const resultado = service.findAll({});
    const aceite = resultado.find((p) => p.code === '2152'); // qty: 12
    const bateria = resultado.find((p) => p.code === '2499'); // qty: 4

    expect(aceite?.status).toBe('disponible');
    expect(bateria?.status).toBe('stock_bajo');
  });

  it('trata el stock negativo como cero en el valor de inventario', () => {
    const resultado = service.findAll({});
    const pastillas = resultado.find((p) => p.code === '2503'); // qty: -2

    expect(pastillas?.inventory_value).toBe(0);
    expect(pastillas?.status).toBe('sin_stock');
  });

  it('excluye los productos inactivos', () => {
    const resultado = service.findAll({});
    const descontinuado = resultado.find((p) => p.code === '2505'); // active: false

    expect(descontinuado).toBeUndefined();
  });

  it('usa "Sin categoría" cuando categ_name es null', () => {
    const resultado = service.findAll({});
    const bombillo = resultado.find((p) => p.code === '2DP-E4451-00-50');

    expect(bombillo?.category).toBe('Sin categoría');
  });

  it('calcula el resumen de inventario correctamente', () => {
    const resumen = service.getSummary();

    expect(resumen.active_products).toBe(11);
    expect(resumen.inventory_value).toBe(1980000);
  });
});