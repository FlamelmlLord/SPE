'use client';

import { Badge } from '@/components/ui/badge';

interface PhaseStatusProps {
  fase: string;
  estado: 'completado' | 'en_proceso' | 'pendiente';
  registros?: number;
}

export function PhaseStatus({ fase, estado, registros }: PhaseStatusProps) {
  const getEstadoConfig = () => {
    switch (estado) {
      case 'completado':
        return {
          variant: 'default' as const,
          color: 'bg-green-100 text-green-800 border-green-200',
          label: 'Completado',
        };
      case 'en_proceso':
        return {
          variant: 'secondary' as const,
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          label: 'En Proceso',
        };
      default:
        return {
          variant: 'outline' as const,
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          label: 'Pendiente',
        };
    }
  };

  const config = getEstadoConfig();

  return (
    <div className="flex items-center gap-2">
      <Badge className={config.color}>
        {config.label}
      </Badge>
      {registros !== undefined && (
        <span className="text-sm text-muted-foreground">
          {registros.toLocaleString()} registros
        </span>
      )}
    </div>
  );
}
