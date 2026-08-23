import { Controller, Get, Query } from '@nestjs/common';
import { QueryProductsDto } from './dto/query-products.dto';
import { ProductsService } from './products.service';

// El constructor recibe el service ya "inyectado".
@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET /products?search=...&category=...&status=...
  // @Query() toma TODO el query string y lo convierte en un QueryProductsDto,
  // pasando primero por el ValidationPipe.
  @Get('products')
  findAll(@Query() query: QueryProductsDto) {
    return this.productsService.findAll(query);
  }

  // GET /summary
  @Get('summary')
  getSummary() {
    return this.productsService.getSummary();
  }
}
