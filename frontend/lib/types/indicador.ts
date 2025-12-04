export interface Indicador {
  nombre: string;
  valor: number | string;
  porcentaje?: number;
  tendencia?: Tendencia;
  meta?: number;
}

export type Tendencia = 'up' | 'down' | 'neutral';

export interface IndicadorFuente {
  fuente: FuenteIntegracion;
  cobertura: number;
  registros: number;
}