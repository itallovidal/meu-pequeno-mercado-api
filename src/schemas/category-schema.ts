import { z } from 'zod'

// type TCategory =
//   | 'Elatados'
//   | 'Higiene Pessoal'
//   | 'Alimentos Congelados'
//   | 'Embalados'
//   | 'Bebidas'
//   | 'Hortifrúti'
//   | 'Limpeza'

export const idCategorySchema = z.coerce.number().positive()

export type TIdCategorySchema = z.infer<typeof idCategorySchema>
