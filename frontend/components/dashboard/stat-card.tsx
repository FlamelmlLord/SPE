'use client';

import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from 'lucide-react';

interface StatCardProps {
  titulo: string;
  valor: string | number;
  cambio?: string;
  tendencia?: 'up' | 'down' | 'neutral';
  icono?: LucideIcon;
  colorBorde?: string;
}

export function StatCard({
  titulo,
  valor,
  cambio,
  tendencia = 'neutral',
  icono: Icon,
  colorBorde = '#0033ff',
}: StatCardProps) {
  const getTendenciaColor = () => {
    switch (tendencia) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTendenciaIcon = () => {
    switch (tendencia) {
      case 'up':
        return ArrowUpIcon;
      case 'down':
        return ArrowDownIcon;
      default:
        return MinusIcon;
    }
  };

  const TendenciaIcon = getTendenciaIcon();

  return (
    <Card 
      className="relative overflow-hidden border-l-4"
      style={{ borderLeftColor: colorBorde }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {titulo}
          </h3>
          {Icon && (
            <Icon className="h-5 w-5 text-muted-foreground opacity-50" />
          )}
        </div>

        <div className="flex items-baseline justify-between">
          <p 
            className="text-3xl font-bold"
            style={{ color: '#01033e' }}
          >
            {valor}
          </p>

          {cambio && (
            <div className={`flex items-center gap-1 text-sm font-medium ${getTendenciaColor()}`}>
              <TendenciaIcon className="h-4 w-4" />
              <span>{cambio}</span>
            </div>
          )}
        </div>

        {cambio && (
          <p className="text-xs text-muted-foreground mt-2">
            vs. período anterior
          </p>
        )}
      </CardContent>
    </Card>
  );
}