export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  tipo: TipoUsuario;
  fechaCreacion: Date;
  activo: boolean;
}

export type TipoUsuario = 'admin' | 'analista' | 'supervisor';

export interface PermisoUsuario {
  modulo: string;
  acciones: ('crear' | 'leer' | 'editar' | 'eliminar')[];
}