'use client';

import { Progress } from '@/components/ui/progress';
import { CHART_COLORS } from '@/lib/constants/colors';

interface ProcessStepProps {
  nombre: string;
  porcentaje: number;
  color?: string;
  estado?: 'completado' | 'en_proceso' | 'pendiente' | 'error';
  registros?: string;
}

export function ProcessStep({
  nombre,
  porcentaje,
  color,
  estado = 'en_proceso',
  registros,
}: ProcessStepProps) {
  const getEstadoColor = () => {
    switch (estado) {
      case 'completado':
        return '#10b981'; // verde
      case 'error':
        return '#ef4444'; // rojo
      case 'en_proceso':
        return color || CHART_COLORS.blue;
      default:
        return '#9ca3af'; // gris
    }
  };

  const getEstadoTexto = () => {
    switch (estado) {
      case 'completado':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'en_proceso':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex-1 min-w-0">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{nombre}</span>
        <span className={`text-sm font-semibold ${getEstadoTexto()}`}>
          {porcentaje}%
        </span>
      </div>

      <Progress 
        value={porcentaje} 
        className="h-2 mb-1"
        style={{
          // @ts-ignore
          '--progress-background': getEstadoColor(),
        }}
      />

      {registros && (
        <p className={`text-xs font-medium ${getEstadoTexto()}`}>
          {registros}
        </p>
      )}
    </div>
  );
}