import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { QueryProductsDto } from './dto/query-products.dto';
import {
  ProductResponse,
  ProductStatus,
  RawProduct,
} from './product.interface';

// @Injectable() Nest arma un solo objeto ProductsService y se lo pasa a quien lo pida.
@Injectable()
export class ProductsService {
  // Leemos el JSON una vez al crear el servicio, no en cada petición.
  private readonly rawProducts: RawProduct[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'data', 'productos_japani_digital.json'), 'utf-8'),
  );

  // Regla: qty_available <= 0 => sin_stock; 1..5 => stock_bajo; >5 => disponible.
  private calculateStatus(qty: number): ProductStatus {
    if (qty <= 0) return 'sin_stock';
    if (qty <= 5) return 'stock_bajo';
    return 'disponible';
  }

  // Regla: list_price * max(qty_available, 0). No se puede "restar" valor
  // de inventario cuando el stock quedó en negativo por error de digitación.
  private calculateInventoryValue(listPrice: number, qty: number): number {
    return listPrice * Math.max(qty, 0);
  }

  // Convierte un producto crudo del JSON al formato que expone la API.
  private toResponse(raw: RawProduct): ProductResponse {
    return {
      id: raw.id,
      name: raw.name,
      code: raw.default_code,
      category: raw.categ_name?.trim() ? raw.categ_name : 'Sin categoría',
      list_price: raw.list_price,
      qty_available: raw.qty_available,
      status: this.calculateStatus(raw.qty_available),
      inventory_value: this.calculateInventoryValue(raw.list_price, raw.qty_available),
    };
  }

  findAll(query: QueryProductsDto): ProductResponse[] {
    const search = query.search?.toLowerCase();
    const category = query.category?.toLowerCase();

    return this.rawProducts
      .filter((p) => p.active) // "únicamente productos activos"
      .map((p) => this.toResponse(p))

      .filter((p) => {
        if (!search) return true;
        return (
          p.name.toLowerCase().includes(search) ||
          p.code.toLowerCase().includes(search)
        );
      })
      .filter((p) => {
        if (!category) return true;
        return p.category.toLowerCase() === category;
      })
      .filter((p) => {
        if (!query.status) return true;
        return p.status === query.status;
      })
      .sort((a, b) => a.name.localeCompare(b.name)); // orden alfabético
  }

  getSummary() {
    const active = this.rawProducts
      .filter((p) => p.active)
      .map((p) => this.toResponse(p));

    return {
      active_products: active.length,
      low_stock_products: active.filter((p) => p.status === 'stock_bajo').length,
      out_of_stock_products: active.filter((p) => p.status === 'sin_stock').length,
      inventory_value: active.reduce((sum, p) => sum + p.inventory_value, 0),
    };
  }
}
