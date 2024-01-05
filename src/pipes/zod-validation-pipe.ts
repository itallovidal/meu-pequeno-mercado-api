import { PipeTransform, BadRequestException } from '@nestjs/common'
import { ZodSchema, ZodError } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value)
    } catch (e) {
      if (e instanceof ZodError) {
        throw new BadRequestException({
          message: 'erro de validação',
          error: e.errors,
        })
      }

      throw new BadRequestException('Validation failed')
    }
  }
}
