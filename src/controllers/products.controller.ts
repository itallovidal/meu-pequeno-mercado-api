import {
  Body,
  Controller,
  Patch,
  Get,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  Delete,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  createProductsSchema,
  productSchema,
  TCreateProductSchema,
  TProductSchema,
} from '../schemas/create-product-schema'
import { PrismaService } from '../services/prisma.service'
import { idParamSchema } from '../schemas/id-schema'
import { idCategorySchema, TIdCategorySchema } from '../schemas/category-schema'
import {
  queryParamSchema,
  TQueryParamSchema,
} from '../schemas/queryParam-schema'

@Controller('products')
export class ProductsController {
  constructor(private database: PrismaService) {}

  @Post('create')
  @UsePipes(new ZodValidationPipe(createProductsSchema))
  createProduct(@Body() body: TCreateProductSchema[]) {
    try {
      this.database.create(body, 'products')

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

  @Get('details/:id')
  async getProduct(
    @Param('id', new ZodValidationPipe(idParamSchema)) id: string,
  ) {
    return await this.database.getProductById('products', id)
  }

  @Get('/search?')
  async searchProduct(
    @Query('q', new ZodValidationPipe(queryParamSchema))
    value: TQueryParamSchema,
  ) {
    const result = await this.database.searchProduct('products', value)

    if (result.success) {
      return result.data
    }

    throw new NotFoundException('Produto não encontrado.')
  }

  @Get(`category/:category`)
  async getProductByCategory(
    @Param('category', new ZodValidationPipe(idCategorySchema))
    value: TIdCategorySchema,
  ) {
    return await this.database.getProductByCategory('products', value)
  }

  @Patch(`update/:id`)
  async changeProduct(
    @Param('id', new ZodValidationPipe(idParamSchema)) id: string,
    @Body(new ZodValidationPipe(productSchema)) payload: TProductSchema,
  ) {
    return await this.database.changeProduct(id, payload)
  }

  @Delete(`delete/:id`)
  async deleteProduct(
    @Param('id', new ZodValidationPipe(idParamSchema)) id: string,
  ) {
    return await this.database.deleteProduct('products', id)
  }
}
