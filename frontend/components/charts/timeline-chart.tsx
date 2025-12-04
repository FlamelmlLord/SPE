'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CHART_COLORS } from '@/lib/constants/colors';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface TimelineChartProps {
  eventos: Array<{
    fecha: Date;
    prestador: string;
    tipo: 'continuo' | 'discontinuo';
  }>;
}

export function TimelineChart({ eventos }: TimelineChartProps) {
  // Agrupar eventos por fecha
  const eventosPorFecha = eventos.reduce(
    (acc, evento) => {
      const fechaKey = format(evento.fecha, 'dd/MM', { locale: es });
      if (!acc[fechaKey]) {
        acc[fechaKey] = { fecha: fechaKey, continuo: 0, discontinuo: 0 };
      }
      if (evento.tipo === 'continuo') {
        acc[fechaKey].continuo++;
      } else {
        acc[fechaKey].discontinuo++;
      }
      return acc;
    },
    {} as Record<string, { fecha: string; continuo: number; discontinuo: number }>
  );

  const data = Object.values(eventosPorFecha);

  return (
    <Card>
      <CardHeader>
        <CardTitle style={{ color: '#01033e' }}>
          Ingreso de Datos por Prestador
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="fecha"
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="continuo"
              stroke={CHART_COLORS.blue}
              strokeWidth={2}
              name="Prestadores Continuos"
            />
            <Line
              type="monotone"
              dataKey="discontinuo"
              stroke={CHART_COLORS.purple}
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Prestadores Discontinuos"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}