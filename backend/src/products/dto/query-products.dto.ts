import { IsIn, IsOptional, IsString } from 'class-validator';
import type { ProductStatus } from '../product.interface';

// Los decoradores (@IsOptional, @IsIn) son las reglas que Nest revisa
// automáticamente gracias al ValidationPipe global que activamos en main.ts.
export class QueryProductsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsIn(['disponible', 'stock_bajo', 'sin_stock'], {
    message: 'status debe ser uno de: disponible, stock_bajo, sin_stock',
  })
  status?: ProductStatus;
}
