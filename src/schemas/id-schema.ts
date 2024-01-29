import { z } from 'zod'

export const idParamSchema = z
  .string({
    invalid_type_error: 'String necessária.',
  })
  .uuid('O parâmetro da rota deve ser um UUID')

export type TIdParamSchema = z.infer<typeof idParamSchema>
