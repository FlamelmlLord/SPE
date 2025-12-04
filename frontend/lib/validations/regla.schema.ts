import { z } from 'zod';

export const reglaSchema = z.object({
  nombre: z.string().min(3, 'Mínimo 3 caracteres'),
  descripcion: z.string().min(10, 'Mínimo 10 caracteres'),
  tipo: z.enum(['tecnica', 'negocio', 'calidad']),
  activa: z.boolean().default(true),
});