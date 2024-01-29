import { Module } from '@nestjs/common'
import { ProductsController } from './controllers/products.controller'
import { PrismaService } from './services/prisma.service'
import { CategoryController } from './controllers/category.controller'

@Module({
  controllers: [ProductsController, CategoryController],
  providers: [PrismaService],
})
export class AppModule {}
