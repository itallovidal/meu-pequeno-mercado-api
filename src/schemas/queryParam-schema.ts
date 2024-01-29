import { z } from 'zod'

export const queryParamSchema = z.string({
  invalid_type_error: 'String necessária.',
})

export type TQueryParamSchema = z.infer<typeof queryParamSchema>
