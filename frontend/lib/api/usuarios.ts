import { apiGet, apiPost, apiPut, apiDelete } from './client';
import { Usuario } from '@/lib/types';

export const usuariosApi = {
  getAll: () => apiGet<Usuario[]>('/usuarios'),
  getById: (id: string) => apiGet<Usuario>(`/usuarios/${id}`),
  create: (data: Omit<Usuario, 'id'>) => apiPost<Usuario>('/usuarios', data),
  update: (id: string, data: Partial<Usuario>) => 
    apiPut<Usuario>(`/usuarios/${id}`, data),
  delete: (id: string) => apiDelete(`/usuarios/${id}`),
};