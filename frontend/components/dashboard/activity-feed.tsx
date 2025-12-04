'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatRelativeTime } from '@/lib/utils/format';

interface Actividad {
  id: string;
  mensaje: string;
  timestamp: Date;
  tipo: 'success' | 'info' | 'warning' | 'error';
}

interface ActivityFeedProps {
  actividades: Actividad[];
}

export function ActivityFeed({ actividades }: ActivityFeedProps) {
  const getTipoColor = (tipo: Actividad['tipo']) => {
    switch (tipo) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getTipoVariant = (tipo: Actividad['tipo']) => {
    switch (tipo) {
      case 'success':
        return 'default';
      case 'warning':
        return 'secondary';
      case 'error':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle style={{ color: '#01033e' }}>
          Actividad Reciente
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actividades.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No hay actividades recientes
          </p>
        ) : (
          actividades.map((actividad) => (
            <div key={actividad.id} className="flex gap-3 items-start">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getTipoColor(actividad.tipo)}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 mb-1">
                  {actividad.mensaje}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatRelativeTime(actividad.timestamp)}
                </p>
              </div>
              <Badge variant={getTipoVariant(actividad.tipo)} className="text-xs flex-shrink-0">
                {actividad.tipo}
              </Badge>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}