'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Plus, 
  Edit, 
  UserX,
  UserCheck,
  Mail,
  Calendar,
  Shield,
  Search,
  User,
  Clock,
  Key,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Tipo para Usuario
interface Usuario {
  id: string;
  nombre: string;
  email: string;
  tipo: 'admin' | 'analista' | 'supervisor';
  fechaCreacion: string;
  ultimoAcceso: string;
  activo: boolean;
}

// Tipo para Usuario Actual (con información extendida)
interface UsuarioActual extends Usuario {
  nombreCompleto: string;
  cargo: string;
  departamento: string;
  telefono?: string;
  permisos: string[];
}

export default function UsuariosPage() {
  const router = useRouter();
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  // NUEVO: Usuario Actual (logueado)
  const usuarioActual: UsuarioActual = {
    id: '101',
    nombre: 'Funcionario A.',
    nombreCompleto: 'Andrés Felipe Martínez García',
    email: 'f.a.tecnico@servicioempleo.gov.co',
    tipo: 'admin',
    cargo: 'Administrador del Sistema',
    departamento: 'Tecnología y Datos',
    telefono: '+57 311 456 7890',
    fechaCreacion: '2024-01-15',
    ultimoAcceso: '2025-11-27 14:32:15',
    activo: true,
    permisos: [
      'Crear, editar y eliminar usuarios',
      'Acceso a todas las fases del pipeline',
      'Gestión de reglas de normalización',
      'Configuración de fuentes de integración',
      'Ejecución de procesos de anonimización',
      'Exportación de datasets',
      'Visualización de logs y auditoría',
    ],
  };

  // Documento del usuario actual
  const documentoUsuarioActual = {
    tipoDocumento: 'Cédula de Ciudadanía',
    numeroDocumento: '1.012.345.678',
  };

  // Datos de ejemplo para usuarios
  const usuarios: Usuario[] = [
    {
      id: '101',
      nombre: 'Funcionario A.',
      email: 'f.a.tecnico@servicioempleo.gov.co',
      tipo: 'admin',
      fechaCreacion: '2024-01-15',
      ultimoAcceso: '2025-11-27 09:55:23',
      activo: true,
    },
    {
      id: '102',
      nombre: 'Consultor B.',
      email: 'c.b.consulta@servicioempleo.gov.co',
      tipo: 'analista',
      fechaCreacion: '2024-03-20',
      ultimoAcceso: '2025-11-26 14:32:10',
      activo: true,
    },
    {
      id: '103',
      nombre: 'Data Scientist C.',
      email: 'd.s.ciencia@servicioempleo.gov.co',
      tipo: 'analista',
      fechaCreacion: '2024-05-10',
      ultimoAcceso: '2025-10-15 08:20:45',
      activo: false,
    },
    {
      id: '104',
      nombre: 'Supervisor D.',
      email: 's.d.supervisor@servicioempleo.gov.co',
      tipo: 'supervisor',
      fechaCreacion: '2024-02-28',
      ultimoAcceso: '2025-11-27 11:15:30',
      activo: true,
    },
    {
      id: '105',
      nombre: 'Analista E.',
      email: 'a.e.datos@servicioempleo.gov.co',
      tipo: 'analista',
      fechaCreacion: '2024-06-12',
      ultimoAcceso: '2025-11-25 16:45:22',
      activo: true,
    },
  ];

  // Métricas de usuarios
  const metricasUsuarios = {
    total: usuarios.length,
    activos: usuarios.filter(u => u.activo).length,
    inactivos: usuarios.filter(u => !u.activo).length,
    admins: usuarios.filter(u => u.tipo === 'admin').length,
    analistas: usuarios.filter(u => u.tipo === 'analista').length,
    supervisores: usuarios.filter(u => u.tipo === 'supervisor').length,
  };

  // Permisos por tipo de usuario
  const permisosPorTipo = {
    admin: {
      nombre: 'Administrador',
      descripcion: 'Control total del sistema',
      permisos: [
        'Crear, editar y eliminar usuarios',
        'Acceso a todas las fases del pipeline',
        'Gestión de reglas de normalización',
        'Configuración de fuentes de integración',
        'Ejecución de procesos de anonimización',
        'Exportación de datasets',
        'Visualización de logs y auditoría',
      ],
      color: 'bg-red-100 text-red-800',
    },
    supervisor: {
      nombre: 'Supervisor',
      descripcion: 'Supervisión y validación',
      permisos: [
        'Revisar y aprobar cambios en reglas',
        'Monitoreo de métricas de calidad',
        'Acceso de lectura a todas las fases',
        'Validación de datasets anonimizados',
        'Generación de reportes',
      ],
      color: 'bg-yellow-100 text-yellow-800',
    },
    analista: {
      nombre: 'Analista',
      descripcion: 'Consulta y análisis',
      permisos: [
        'Acceso de solo lectura a datos',
        'Generación de reportes básicos',
        'Visualización de métricas',
        'Consulta de logs (sin edición)',
      ],
      color: 'bg-blue-100 text-blue-800',
    },
  };

  // Filtrar usuarios
  const usuariosFiltrados = usuarios.filter(usuario => {
    const cumpleFiltroTipo = filtroTipo === 'todos' || usuario.tipo === filtroTipo;
    const cumpleFiltroEstado = filtroEstado === 'todos' || 
      (filtroEstado === 'activos' && usuario.activo) ||
      (filtroEstado === 'inactivos' && !usuario.activo);
    const cumpleBusqueda = usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return cumpleFiltroTipo && cumpleFiltroEstado && cumpleBusqueda;
  });

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'admin':
        return <Badge className="bg-red-100 text-red-800 text-xs">Administrador</Badge>;
      case 'supervisor':
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Supervisor</Badge>;
      case 'analista':
        return <Badge className="bg-blue-100 text-blue-800 text-xs">Analista</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 text-xs">Otro</Badge>;
    }
  };

  const getEstadoBadge = (activo: boolean) => {
    if (activo) {
      return <Badge className="bg-green-100 text-green-800 text-xs">Activo</Badge>;
    }
    return <Badge className="bg-gray-100 text-gray-800 text-xs">Inactivo</Badge>;
  };

  const handleCrearUsuario = () => {
    router.push('/dashboard/usuarios/nuevo');
  };

  const handleEditarUsuario = (usuario: Usuario) => {
    router.push(`/dashboard/usuarios/${usuario.id}`);
  };

  const handleToggleEstado = (usuario: Usuario) => {
    console.log(`Cambiar estado de usuario ${usuario.id} a:`, !usuario.activo);
    // Aquí iría la lógica para actualizar el estado en el backend
  };

  return (
    <div className="p-6 space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#01033e' }}>
          Gestión de Usuarios y Permisos
        </h1>
        <p className="text-sm text-gray-600">
          Administración de usuarios del Sistema de Calidad de Datos
        </p>
      </div>

      {/* NUEVO: Panel de Información del Usuario Actual */}
      <Card className="border-l-4 border-red-600 bg-gradient-to-r from-red-50 to-white">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2" style={{ color: '#01033e' }}>
            <User className="w-6 h-6" />
            Perfil Actual: {usuarioActual.nombreCompleto}
            <Badge className="ml-2 bg-red-600 text-white">
              {permisosPorTipo[usuarioActual.tipo].nombre.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Columna 1: Información Personal */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">ID de Usuario</p>
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-gray-400" />
                  <p className="text-sm font-semibold text-gray-900">{usuarioActual.id}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Documento de Identidad</p>
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-600">{documentoUsuarioActual.tipoDocumento}</p>
                  <p className="text-sm font-semibold text-gray-900">{documentoUsuarioActual.numeroDocumento}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Nombre en Sistema</p>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <p className="text-sm font-semibold text-gray-900">{usuarioActual.nombre}</p>
                </div>
              </div>
            </div>

            {/* Columna 2: Información de Contacto */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Correo Institucional</p>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <p className="text-sm font-semibold text-gray-900">{usuarioActual.email}</p>
                </div>
              </div>
              {usuarioActual.telefono && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Teléfono</p>
                  <p className="text-sm font-semibold text-gray-900">{usuarioActual.telefono}</p>
                </div>
              )}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Departamento</p>
                <p className="text-sm font-semibold text-gray-900">{usuarioActual.departamento}</p>
              </div>
            </div>

            {/* Columna 3: Información del Rol */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Rol en el Sistema</p>
                <p className="text-sm font-semibold text-red-700">{usuarioActual.cargo}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Tipo de Usuario</p>
                {getTipoBadge(usuarioActual.tipo)}
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Fecha de Creación</p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <p className="text-sm font-semibold text-gray-900">{usuarioActual.fechaCreacion}</p>
                </div>
              </div>
            </div>

            {/* Columna 4: Actividad Reciente */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Último Acceso</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <p className="text-sm font-semibold text-green-700">{usuarioActual.ultimoAcceso}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Permisos del Usuario Actual */}
          <div className="mt-6 p-4 bg-white rounded-lg border border-red-200">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-red-600" />
              <h4 className="text-sm font-bold text-red-900">
                Permisos Asignados ({usuarioActual.permisos.length})
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {usuarioActual.permisos.map((permiso, index) => (
                <div key={index} className="flex items-start gap-2 text-xs text-gray-700">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>{permiso}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nota de Seguridad */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
            <strong>⚠️ Nota de Seguridad:</strong> Como administrador, tienes control total sobre el sistema. 
            Cualquier cambio que realices afectará a todos los usuarios y módulos. Actúa con responsabilidad.
          </div>
        </CardContent>
      </Card>

      {/* Métricas de Usuarios */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-2" style={{ color: '#01033e' }} />
              <p className="text-2xl font-bold" style={{ color: '#01033e' }}>
                {metricasUsuarios.total}
              </p>
              <p className="text-xs text-gray-600">Total Usuarios</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <UserCheck className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-green-700">
                {metricasUsuarios.activos}
              </p>
              <p className="text-xs text-gray-600">Activos</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <UserX className="w-8 h-8 mx-auto mb-2 text-gray-500" />
              <p className="text-2xl font-bold text-gray-700">
                {metricasUsuarios.inactivos}
              </p>
              <p className="text-xs text-gray-600">Inactivos</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <p className="text-2xl font-bold text-red-700">
                {metricasUsuarios.admins}
              </p>
              <p className="text-xs text-gray-600">Administradores</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <p className="text-2xl font-bold text-yellow-700">
                {metricasUsuarios.supervisores}
              </p>
              <p className="text-xs text-gray-600">Supervisores</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-blue-700">
                {metricasUsuarios.analistas}
              </p>
              <p className="text-xs text-gray-600">Analistas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y Búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-end">
            {/* Búsqueda */}
            <div className="flex-1 min-w-[200px]">
              <Label className="text-xs font-medium text-gray-700 mb-2 block">
                Buscar Usuario
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filtro por Tipo */}
            <div className="w-[180px]">
              <Label className="text-xs font-medium text-gray-700 mb-2 block">
                Filtrar por Tipo
              </Label>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los Tipos</SelectItem>
                  <SelectItem value="admin">Administradores</SelectItem>
                  <SelectItem value="supervisor">Supervisores</SelectItem>
                  <SelectItem value="analista">Analistas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filtro por Estado */}
            <div className="w-[180px]">
              <Label className="text-xs font-medium text-gray-700 mb-2 block">
                Filtrar por Estado
              </Label>
              <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los Estados</SelectItem>
                  <SelectItem value="activos">Activos</SelectItem>
                  <SelectItem value="inactivos">Inactivos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Botón Crear Usuario */}
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleCrearUsuario}
            >
              <Plus className="w-4 h-4 mr-2" />
              Crear Nuevo Usuario
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Usuarios */}
      <Card>
        <CardHeader>
          <CardTitle style={{ color: '#01033e' }}>
            Usuarios del Sistema ({usuariosFiltrados.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Nombre
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Tipo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Fecha Creación
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Último Acceso
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Estado
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {usuario.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {usuario.nombre}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {usuario.email}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {getTipoBadge(usuario.tipo)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {usuario.fechaCreacion}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {usuario.ultimoAcceso}
                    </td>
                    <td className="px-4 py-3">
                      {getEstadoBadge(usuario.activo)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditarUsuario(usuario)}
                          title="Editar Usuario"
                        >
                          <Edit className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleEstado(usuario)}
                          title={usuario.activo ? 'Inhabilitar Usuario' : 'Habilitar Usuario'}
                        >
                          {usuario.activo ? (
                            <UserX className="w-4 h-4 text-red-600" />
                          ) : (
                            <UserCheck className="w-4 h-4 text-green-600" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {usuariosFiltrados.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No se encontraron usuarios con los filtros aplicados</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Panel de Permisos por Tipo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(permisosPorTipo).map(([tipo, info]) => (
          <Card key={tipo} className="border-l-4" style={{
            borderLeftColor: tipo === 'admin' ? '#dc2626' : tipo === 'supervisor' ? '#eab308' : '#2563eb'
          }}>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {info.nombre}
              </CardTitle>
              <p className="text-xs text-gray-600 mt-1">{info.descripcion}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-xs text-gray-700">
                {info.permisos.map((permiso, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>{permiso}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}