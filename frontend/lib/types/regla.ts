export interface ReglaValidacion {
  id: string;
  nombre: string;
  descripcion: string;
  activa: boolean;
  tipo: TipoRegla;
  expresion?: string;
  parametros?: Record<string, any>;
}

export type TipoRegla = 'tecnica' | 'negocio' | 'calidad';