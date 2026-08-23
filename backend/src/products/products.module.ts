import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

// Un módulo declara: "estos controllers y estos services trabajan juntos".
// Nest usa esto para saber a quién inyectarle qué.
@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
