import { z } from 'zod';

export const vacanteSchema = z.object({
  prestador: z.string().min(1, 'Requerido'),
  nit: z.string()
    .regex(/^\d{9,10}$/, 'NIT debe tener 9-10 dígitos'),
  fechaIngreso: z.date(),
});