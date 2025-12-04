import { useQuery } from '@tanstack/react-query';
import { vacantesApi } from '@/lib/api/vacantes';

export function useVacantes(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['vacantes', page, limit],
    queryFn: () => vacantesApi.getAll({ page, limit }),
  });
}