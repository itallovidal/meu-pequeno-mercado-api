import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { TCreateProductSchema } from '../schemas/create-product-schema'

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

  async create(data: TCreateProductSchema, table: 'produtos' | 'usuarios') {
    try {
      await this[table].create({
        data,
      })
    } catch (e) {
      throw new Error('Erro na inserção na tabela.')
    }
  }
}
