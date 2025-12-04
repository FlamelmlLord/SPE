'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  Shield,
  Key,
  Eye,
  EyeOff,
  Save,
  X,
  ArrowLeft,
  FileText,
  AlertCircle,
  UserPlus,
} from 'lucide-react';

interface FormData {
  nombre: string;
  nombreCompleto: string;
  email: string;
  tipo: 'admin' | 'analista' | 'supervisor';
  tipoDocumento: string;
  numeroDocumento: string;
  cargo: string;
  departamento: string;
  telefono: string;
  activo: boolean;
}

export default function NuevoUsuarioPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    nombreCompleto: '',
    email: '',
    tipo: 'analista',
    tipoDocumento: 'CC',
    numeroDocumento: '',
    cargo: '',
    departamento: '',
    telefono: '',
    activo: true,
  });

  const [passwords, setPasswords] = useState({
    nueva: '',
    confirmar: '',
  });

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [errores, setErrores] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo
    if (errores[field]) {
      setErrores(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handlePasswordChange = (field: 'nueva' | 'confirmar', value: string) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
    // Limpiar errores de contraseña
    if (errores.password) {
      setErrores(prev => {
        const newErrors = { ...prev };
        delete newErrors.password;
        return newErrors;
      });
    }
  };

  // Auto-generar nombre de usuario a partir del email
  const handleEmailChange = (email: string) => {
    handleInputChange('email', email);
    
    // Si el nombre de usuario está vacío, sugerir uno basado en el email
    if (!formData.nombre && email.includes('@')) {
      const nombreSugerido = email.split('@')[0].replace(/\./g, ' ').replace(/\d+/g, '');
      handleInputChange('nombre', nombreSugerido);
    }
  };

  const validarFormulario = (): boolean => {
    const nuevosErrores: Record<string, string> = {};

    // Validaciones básicas
    if (!formData.nombreCompleto.trim()) {
      nuevosErrores.nombreCompleto = 'El nombre completo es obligatorio';
    }

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre de usuario es obligatorio';
    }

    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nuevosErrores.email = 'Email inválido';
    }

    if (!formData.numeroDocumento.trim()) {
      nuevosErrores.numeroDocumento = 'El número de documento es obligatorio';
    }

    if (!formData.cargo.trim()) {
      nuevosErrores.cargo = 'El cargo es obligatorio';
    }

    if (!formData.departamento.trim()) {
      nuevosErrores.departamento = 'El departamento es obligatorio';
    }

    // Validación de contraseña (OBLIGATORIA para nuevos usuarios)
    if (!passwords.nueva) {
      nuevosErrores.password = 'La contraseña es obligatoria';
    } else if (passwords.nueva.length < 8) {
      nuevosErrores.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (passwords.nueva !== passwords.confirmar) {
      nuevosErrores.password = 'Las contraseñas no coinciden';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleCrear = () => {
    if (!validarFormulario()) {
      return;
    }

    console.log('Creando nuevo usuario:', formData);
    console.log('Con contraseña');

    // Aquí iría la lógica para crear en el backend
    router.push('/dashboard/usuarios');
  };

  const handleCancelar = () => {
    router.push('/dashboard/usuarios');
  };

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'admin':
        return <Badge className="bg-red-100 text-red-800">Administrador</Badge>;
      case 'supervisor':
        return <Badge className="bg-yellow-100 text-yellow-800">Supervisor</Badge>;
      case 'analista':
        return <Badge className="bg-blue-100 text-blue-800">Analista</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Otro</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancelar}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: '#01033e' }}>
              <UserPlus className="w-7 h-7" />
              Crear Nuevo Usuario
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Registrar un nuevo usuario en el Sistema de Calidad de Datos
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getTipoBadge(formData.tipo)}
          {formData.activo ? (
            <Badge className="bg-green-100 text-green-800">Activo</Badge>
          ) : (
            <Badge className="bg-gray-100 text-gray-800">Inactivo</Badge>
          )}
        </div>
      </div>

      {/* Nota Inicial */}
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-900">
        <strong>✨ Nuevo Usuario:</strong> Completa todos los campos obligatorios marcados con (*) para crear el usuario.
        La contraseña inicial será proporcionada al usuario para su primer acceso.
      </div>

      {/* Formulario Principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: '#01033e' }}>
            <User className="w-5 h-5" />
            Información Personal y de Contacto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Fila 1: Nombre Completo y Nombre de Usuario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Nombre Completo *
              </Label>
              <Input
                type="text"
                placeholder="Ej: Juan Andrés Pérez García"
                value={formData.nombreCompleto}
                onChange={(e) => handleInputChange('nombreCompleto', e.target.value)}
                className={errores.nombreCompleto ? 'border-red-500' : ''}
              />
              {errores.nombreCompleto && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errores.nombreCompleto}
                </p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Nombre de Usuario *
              </Label>
              <Input
                type="text"
                placeholder="Ej: Funcionario A."
                value={formData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                className={errores.nombre ? 'border-red-500' : ''}
              />
              {errores.nombre && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errores.nombre}
                </p>
              )}
              <p className="text-xs text-gray-600 mt-1">
                Se auto-genera a partir del email, pero puedes personalizarlo
              </p>
            </div>
          </div>

          {/* Fila 2: Email y Teléfono */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Correo Electrónico *
              </Label>
              <Input
                type="email"
                placeholder="usuario@servicioempleo.gov.co"
                value={formData.email}
                onChange={(e) => handleEmailChange(e.target.value)}
                className={errores.email ? 'border-red-500' : ''}
              />
              {errores.email && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errores.email}
                </p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Teléfono
              </Label>
              <Input
                type="tel"
                placeholder="+57 311 456 7890"
                value={formData.telefono}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
              />
            </div>
          </div>

          {/* Fila 3: Tipo Documento y Número */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Tipo de Documento *
              </Label>
              <Select
                value={formData.tipoDocumento}
                onValueChange={(value) => handleInputChange('tipoDocumento', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                  <SelectItem value="CE">Cédula de Extranjería</SelectItem>
                  <SelectItem value="TI">Tarjeta de Identidad</SelectItem>
                  <SelectItem value="PEP">Permiso Especial de Permanencia</SelectItem>
                  <SelectItem value="PA">Pasaporte</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Número de Documento *
              </Label>
              <Input
                type="text"
                placeholder="1012345678"
                value={formData.numeroDocumento}
                onChange={(e) => handleInputChange('numeroDocumento', e.target.value)}
                className={errores.numeroDocumento ? 'border-red-500' : ''}
              />
              {errores.numeroDocumento && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errores.numeroDocumento}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información Organizacional */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: '#01033e' }}>
            <Building className="w-5 h-5" />
            Información Organizacional
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Fila 1: Cargo y Departamento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Cargo *
              </Label>
              <Input
                type="text"
                placeholder="Ej: Analista de Datos"
                value={formData.cargo}
                onChange={(e) => handleInputChange('cargo', e.target.value)}
                className={errores.cargo ? 'border-red-500' : ''}
              />
              {errores.cargo && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errores.cargo}
                </p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Building className="w-4 h-4" />
                Departamento *
              </Label>
              <Input
                type="text"
                placeholder="Ej: Tecnología y Datos"
                value={formData.departamento}
                onChange={(e) => handleInputChange('departamento', e.target.value)}
                className={errores.departamento ? 'border-red-500' : ''}
              />
              {errores.departamento && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errores.departamento}
                </p>
              )}
            </div>
          </div>

          {/* Fila 2: Tipo de Usuario */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Tipo de Usuario *
            </Label>
            <Select
              value={formData.tipo}
              onValueChange={(value) => handleInputChange('tipo', value as any)}
            >
              <SelectTrigger className="w-full md:w-1/2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
                <SelectItem value="analista">Analista</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-600 mt-2">
              Los permisos se asignan automáticamente según el tipo de usuario seleccionado.
            </p>
          </div>

          {/* Estado Activo */}
          <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
            <Checkbox
              id="activo"
              checked={formData.activo}
              onCheckedChange={(checked) => handleInputChange('activo', Boolean(checked))}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="activo"
                className="text-sm font-medium text-gray-900 cursor-pointer"
              >
                Usuario Activo
              </Label>
              <p className="text-xs text-gray-600">
                El usuario podrá acceder al sistema inmediatamente después de ser creado.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sección de Contraseña (OBLIGATORIA) */}
      <Card className="border-l-4 border-green-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: '#01033e' }}>
            <Key className="w-5 h-5" />
            Contraseña Inicial *
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-3 bg-green-50 border border-green-200 rounded text-xs text-green-800">
            <strong>🔒 Contraseña Obligatoria:</strong> Debes establecer una contraseña inicial para el nuevo usuario.
            Esta contraseña será proporcionada al usuario para su primer acceso al sistema.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Key className="w-4 h-4" />
                Contraseña *
              </Label>
              <div className="relative">
                <Input
                  type={mostrarPassword ? 'text' : 'password'}
                  placeholder="Mínimo 8 caracteres"
                  value={passwords.nueva}
                  onChange={(e) => handlePasswordChange('nueva', e.target.value)}
                  className={errores.password ? 'border-red-500 pr-10' : 'pr-10'}
                />
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {mostrarPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Key className="w-4 h-4" />
                Confirmar Contraseña *
              </Label>
              <Input
                type={mostrarPassword ? 'text' : 'password'}
                placeholder="Repite la contraseña"
                value={passwords.confirmar}
                onChange={(e) => handlePasswordChange('confirmar', e.target.value)}
                className={errores.password ? 'border-red-500' : ''}
              />
            </div>
          </div>

          {errores.password && (
            <div className="p-3 bg-red-50 border border-red-200 rounded flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
              <p className="text-xs text-red-600">{errores.password}</p>
            </div>
          )}

          <div className="p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
            <strong>Requisitos de contraseña:</strong>
            <ul className="list-disc list-inside mt-1 space-y-0.5">
              <li>Mínimo 8 caracteres</li>
              <li>Se recomienda incluir letras mayúsculas, minúsculas, números y caracteres especiales</li>
              <li>Evita usar información personal fácil de adivinar</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Nota Informativa */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
        <strong>📌 Nota:</strong> Una vez creado el usuario, recibirá un correo de bienvenida con sus credenciales de acceso.
        Se recomienda que cambie su contraseña en el primer inicio de sesión.
      </div>

      {/* Botones de Acción */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t">
        <Button
          variant="outline"
          onClick={handleCancelar}
          className="gap-2"
        >
          <X className="w-4 h-4" />
          Cancelar
        </Button>
        <Button
          className="bg-green-600 hover:bg-green-700 gap-2"
          onClick={handleCrear}
        >
          <UserPlus className="w-4 h-4" />
          Crear Usuario
        </Button>
      </div>
    </div>
  );
}
