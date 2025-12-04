import { apiGet, apiPost } from './client';
import { RegistroVacante } from '@/lib/types';

export const vacantesApi = {
  getAll: (params?: { page?: number; limit?: number }) => 
    apiGet<{ data: RegistroVacante[]; total: number }>('/vacantes', params),
  
  getById: (id: string) => apiGet<RegistroVacante>(`/vacantes/${id}`),
  
  getDuplicados: () => apiGet<RegistroVacante[]>('/vacantes/duplicados'),
  
  aplicarReglas: (reglaIds: string[]) => 
    apiPost('/vacantes/aplicar-reglas', { reglaIds }),
};