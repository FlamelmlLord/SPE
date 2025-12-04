import { apiGet, apiPost, apiPut, apiDelete } from './client';
import { ReglaValidacion } from '@/lib/types';

export const reglasApi = {
  getAll: () => apiGet<ReglaValidacion[]>('/reglas'),
  create: (data: Omit<ReglaValidacion, 'id'>) => 
    apiPost<ReglaValidacion>('/reglas', data),
  update: (id: string, data: Partial<ReglaValidacion>) => 
    apiPut<ReglaValidacion>(`/reglas/${id}`, data),
  delete: (id: string) => apiDelete(`/reglas/${id}`),
  toggleActiva: (id: string) => apiPost(`/reglas/${id}/toggle`),
};