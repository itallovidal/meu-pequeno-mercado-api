import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  createProductSchema,
  TCreateProductSchema,
} from '../schemas/create-product-schema'
import { PrismaService } from '../services/prisma.service'

@Controller('products')
export class ProductsController {
  constructor(private database: PrismaService) {}

  @Post('create')
  @UsePipes(new ZodValidationPipe(createProductSchema))
  createProduct(@Body() body: TCreateProductSchema) {
    try {
      this.database.create(body, 'produtos')

      return {
        message: 'Criado com sucesso',
        code: 201,
      }
    } catch (e) {
      return {
        message: 'Erro na Criação',
        code: 500,
      }
    }
  }
}
