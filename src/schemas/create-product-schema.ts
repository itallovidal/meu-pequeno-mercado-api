import { z } from 'zod'

export const productSchema = z.object({
  name: z.string(),
  quantity: z.coerce.number(),
  categoryID: z.number().positive(),
  imgURL: z.string().url(),
  price: z.coerce.number(),
})

export const createProductsSchema = z.array(productSchema)

export type TProductSchema = z.infer<typeof productSchema>
export type TCreateProductSchema = z.infer<typeof createProductsSchema>
