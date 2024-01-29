import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import {
  TCreateProductSchema,
  TProductSchema,
} from '../schemas/create-product-schema'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit
{
  constructor() {
    super({
      log: ['error', 'warn'],
    })
  }

  onModuleDestroy() {
    this.$disconnect()
  }

  onModuleInit() {
    this.$connect()
  }

  async create(data: TCreateProductSchema[], table: 'products' | 'usuarios') {
    try {
      await this[table].createMany({
        data,
      })
    } catch (e) {
      throw new Error('Erro na inserção na tabela.')
    }
  }

  async getAllCategories() {
    try {
      return await this.categories.findMany()
    } catch (e) {
      throw new Error('Erro na busca da tabela.')
    }
  }

  async searchProduct(table: 'products' | 'usuarios', productName: string) {
    try {
      const product = await this.products.findMany({
        where: {
          name: productName,
        },
        include: {
          category: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      })

      if (product.length > 0) {
        return {
          success: true,
          data: product,
        }
      }

      return {
        success: false,
        data: {},
      }
    } catch (e) {
      throw new Error('Erro na busca da tabela.')
    }
  }

  async getProductByCategory(
    table: 'products' | 'categorias',
    categoryID: number,
  ) {
    try {
      const query = await this.products.findMany({
        where: {
          categoryID,
        },
        include: {
          category: {
            select: { name: true },
          },
        },
      })

      const result = query.map((product) => {
        return {
          ...product,
          category: {
            ...product.category,
            categoryID: product.categoryID,
          },
        }
      })

      return result
    } catch (e) {
      throw new Error('Erro na busca da tabela.')
    }
  }

  async getProductById(table: 'products' | 'usuarios', id: string) {
    try {
      return await this[table].findUnique({
        where: {
          id,
        },
      })
    } catch (e) {
      throw new Error('Erro na busca da tabela.')
    }
  }

  async deleteProduct(table: 'products' | 'usuarios', id: string) {
    try {
      return await this[table].delete({
        where: {
          id,
        },
      })
    } catch (e) {
      throw new Error('Erro na busca da tabela.')
    }
  }

  async changeProduct(id: string, payload: TProductSchema) {
    try {
      return await this.products.update({
        where: {
          id,
        },
        data: payload,
      })
    } catch (e) {
      throw new Error('Erro na busca da tabela.')
    }
  }
}
