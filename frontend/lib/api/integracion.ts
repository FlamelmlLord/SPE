import { apiGet, apiPost } from './client';

export const integracionApi = {
  getRUES: (nit: string) => apiGet(`/integracion/rues/${nit}`),
  getDANE: (codigo: string) => apiGet(`/integracion/dane/${codigo}`),
  sincronizarDataEmpleo: () => apiPost('/integracion/dataempleo/sync'),
  getCobertura: () => apiGet('/integracion/cobertura'),
};