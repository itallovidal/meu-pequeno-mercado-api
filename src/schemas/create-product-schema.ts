import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string(),
  quantity: z.coerce.number(),
  category: z.string(),
  imgURL: z.string(),
  price: z.coerce.number(),
})

export type TCreateProductSchema = z.infer<typeof createProductSchema>
