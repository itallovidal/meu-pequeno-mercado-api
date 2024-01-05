import { Module } from '@nestjs/common'
import { ProductsController } from './controllers/products.controller'
import { PrismaService } from './services/prisma.service'

@Module({
  controllers: [ProductsController],
  providers: [PrismaService],
})
export class AppModule {}
