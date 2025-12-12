export const ROUTES = {
  // Auth
  LOGIN: '/login',
  
  // Dashboard
  DASHBOARD: '/dashboard',
  DATOS_CRUDOS: '/dashboard/datos-crudos',
  NORMALIZACION: '/dashboard/normalizacion',
  INTEGRACION: '/dashboard/integracion',
  ALISTAMIENTO: '/dashboard/alistamiento',
  ANONIMIZACION: '/dashboard/anonimizacion',
  EDITOR_FLUJOS: '/dashboard/editor-flujos', 
  
  // Usuarios
  USUARIOS: '/dashboard/usuarios',
  USUARIOS_NUEVO: '/dashboard/usuarios/nuevo',
  USUARIOS_EDITAR: (id: string) => `/dashboard/usuarios/${id}`,
} as const;