export interface RegistroVacante {
  id: string;
  prestador: string;
  nit: string;
  fechaIngreso: Date;
  estado: EstadoVacante;
  esDuplicado?: boolean;
  errores?: ErrorValidacion[];
  datosAnonimizados?: boolean;
}

export type EstadoVacante = 'crudo' | 'validado' | 'integrado' | 'anonimizado';

export interface ErrorValidacion {
  campo: string;
  mensaje: string;
  tipo: 'tecnico' | 'negocio';
}