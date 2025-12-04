import { useQuery, useMutation } from '@tanstack/react-query';
import { reglasApi } from '@/lib/api/reglas';

export function useReglas() {
  return useQuery({
    queryKey: ['reglas'],
    queryFn: reglasApi.getAll,
  });
}