import { PrismaService } from '../services/prisma.service'
import { Controller, Get } from '@nestjs/common'

@Controller('categories')
export class CategoryController {
  constructor(private database: PrismaService) {}

  @Get()
  getAll() {
    return this.database.getAllCategories()
  }
}
