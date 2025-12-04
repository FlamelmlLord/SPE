'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CHART_COLORS } from '@/lib/constants/colors';

interface BarChartProps {
  data: Array<{ nombre: string; valor: number }>;
  titulo?: string;
  color?: string;
}

export function BarChart({ data, titulo, color = CHART_COLORS.blue }: BarChartProps) {
  return (
    <Card>
      {titulo && (
        <CardHeader>
          <CardTitle style={{ color: '#01033e' }}>{titulo}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsBarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="nombre"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={100}
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
            <Bar
              dataKey="valor"
              fill={color}
              radius={[4, 4, 0, 0]}
              name="Registros"
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}