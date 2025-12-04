
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart as RechartsLineChart,
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

interface LineChartProps {
  data: Array<{ fecha: Date; valor: number }>;
  titulo?: string;
}

export function LineChart({ data, titulo }: LineChartProps) {
  // Formatear datos para Recharts
  const formattedData = data.map((item) => ({
    fecha: format(item.fecha, 'dd/MM', { locale: es }),
    valor: item.valor,
  }));

  return (
    <Card>
      {titulo && (
        <CardHeader>
          <CardTitle style={{ color: '#01033e' }}>{titulo}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsLineChart data={formattedData}>
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
              formatter={(value: number) => value.toLocaleString('es-CO')}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="valor"
              stroke={CHART_COLORS.blue}
              strokeWidth={2}
              dot={{ fill: CHART_COLORS.blue, r: 4 }}
              activeDot={{ r: 6 }}
              name="Registros"
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
