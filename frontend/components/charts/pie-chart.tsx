'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { CHART_PALETTE } from '@/lib/constants/colors';

interface PieChartProps {
  data: Array<{ nombre: string; valor: number; porcentaje: number }>;
  titulo?: string;
}

export function PieChart({ data, titulo }: PieChartProps) {
  return (
    <Card>
      {titulo && (
        <CardHeader>
          <CardTitle style={{ color: '#01033e' }}>{titulo}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPieChart>
            <Pie
              data={data}
              dataKey="valor"
              nameKey="nombre"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ nombre, porcentaje }) => `${nombre}: ${porcentaje}%`}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_PALETTE[index % CHART_PALETTE.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => value.toLocaleString('es-CO')}
            />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}