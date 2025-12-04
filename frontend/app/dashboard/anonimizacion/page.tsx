'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Eye, 
  Download,
  AlertTriangle,
  CheckCircle,
  Lock,
  FileKey
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Tipo para campos anonimizables
interface CampoAnonimizable {
  id: string;
  nombre: string;
  categoria: 'IIP' | 'cuasi' | 'sensible' | 'analizable';
  tecnicaActual: string;
  parametros: string;
  riesgo: 'alto' | 'medio' | 'bajo';
}

// Tipo para registros de vista previa
interface RegistroPreview {
  id: string;
  numero_documento: { original: string; anonimizado: string };
  tipo_documento: { original: string; anonimizado: string };
  fecha_nacimiento: { original: string; anonimizado: string };
  direccion: { original: string; anonimizado: string };
  nivel_educativo: { original: string; anonimizado: string };
  salario: { original: string; anonimizado: string };
  cargo_anterior: { original: string; anonimizado: string };
}

export default function AnonimizacionPage() {
  const [tecnicasSeleccionadas, setTecnicasSeleccionadas] = useState<Record<string, string>>({});
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Datos de ejemplo para campos anonimizables (mantener igual que antes)
  const camposAnonimizables: CampoAnonimizable[] = [
    {
      id: '1',
      nombre: 'numero_documento (IIP)',
      categoria: 'IIP',
      tecnicaActual: 'Tokenización (SHA-256)',
      parametros: 'Salt: SPE-2025',
      riesgo: 'alto',
    },
    {
      id: '2',
      nombre: 'tipo_documento (IIP)',
      categoria: 'IIP',
      tecnicaActual: 'Generalización (Nacional/Extranjero)',
      parametros: 'CC/CE/PP → Nacional; Pasaporte → Extranjero',
      riesgo: 'alto',
    },
    {
      id: '3',
      nombre: 'fecha_nacimiento (IIP)',
      categoria: 'IIP',
      tecnicaActual: 'Generalización (Rango de Edad)',
      parametros: 'Rangos: [18-25], [26-35], [36-45], [46-55], [56+]',
      riesgo: 'alto',
    },
    {
      id: '4',
      nombre: 'direccion_residencia (Cuasi)',
      categoria: 'cuasi',
      tecnicaActual: 'Generalización (Ciudad + Localidad)',
      parametros: 'Solo: Municipio + Localidad',
      riesgo: 'medio',
    },
    {
      id: '5',
      nombre: 'nivel_educativo (Cuasi)',
      categoria: 'cuasi',
      tecnicaActual: 'Sin anonimización',
      parametros: 'N/A',
      riesgo: 'medio',
    },
    {
      id: '6',
      nombre: 'salario_ofrecido (AD)',
      categoria: 'sensible',
      tecnicaActual: 'Generalización (Rango Monetario)',
      parametros: 'Rangos: [$0-2M], [$2M-5M], [$5M-10M], [$10M+]',
      riesgo: 'medio',
    },
    {
      id: '7',
      nombre: 'estado_afiliacion (AD)',
      categoria: 'sensible',
      tecnicaActual: 'Supresión (Por Inutilidad Analítica)',
      parametros: 'N/A',
      riesgo: 'bajo',
    },
  ];

  // Datos de ejemplo para métricas de riesgo (mantener igual que antes)
  const metricasRiesgo = {
    kAnonimato: 4.2,
    registrosAfectados: 15230,
    porcentajeRiesgo: 1.7,
    camposIIP: 3,
    camposCuasi: 2,
  };

  // Datos de ejemplo para previsualización simple (mantener igual que antes)
  const ejemploPreview = {
    original: {
      numero_documento: '1010123456',
      tipo_documento: 'Cédula de Ciudadanía',
      fecha_nacimiento: '1995-04-10',
      direccion: 'Cra 7 #45-23, Bogotá',
      salario: '$3,500,000',
    },
    anonimizado: {
      numero_documento: 'TKN-783b9e',
      tipo_documento: 'Nacional',
      fecha_nacimiento: 'Edad (26-35)',
      direccion: 'Bogotá - Chapinero',
      salario: '$2M-5M',
    },
  };

  // NUEVO: Datos para vista previa completa (10 registros)
  const registrosPreviewCompletos: RegistroPreview[] = [
    {
      id: 'REG-001',
      numero_documento: { original: '1010123456', anonimizado: 'TKN-783b9e' },
      tipo_documento: { original: 'Cédula de Ciudadanía', anonimizado: 'Nacional' },
      fecha_nacimiento: { original: '1995-04-10', anonimizado: 'Edad (26-35)' },
      direccion: { original: 'Cra 7 #45-23, Bogotá', anonimizado: 'Bogotá - Chapinero' },
      nivel_educativo: { original: 'Profesional', anonimizado: 'Profesional' },
      salario: { original: '$3,500,000', anonimizado: '$2M-5M' },
      cargo_anterior: { original: 'Desarrollador Full Stack', anonimizado: 'Profesiones Científicas' },
    },
    {
      id: 'REG-002',
      numero_documento: { original: '1020987654', anonimizado: 'TKN-9a4c2f' },
      tipo_documento: { original: 'Cédula de Ciudadanía', anonimizado: 'Nacional' },
      fecha_nacimiento: { original: '1988-11-22', anonimizado: 'Edad (36-45)' },
      direccion: { original: 'Calle 100 #15-10, Bogotá', anonimizado: 'Bogotá - Usaquén' },
      nivel_educativo: { original: 'Tecnólogo', anonimizado: 'Tecnólogo' },
      salario: { original: '$2,800,000', anonimizado: '$2M-5M' },
      cargo_anterior: { original: 'Gerente Comercial', anonimizado: 'Dirección y Gerencia' },
    },
    {
      id: 'REG-003',
      numero_documento: { original: '52456789', anonimizado: 'TKN-e1f8d3' },
      tipo_documento: { original: 'Cédula de Ciudadanía', anonimizado: 'Nacional' },
      fecha_nacimiento: { original: '2001-03-15', anonimizado: 'Edad (18-25)' },
      direccion: { original: 'Av. Caracas #50-30, Bogotá', anonimizado: 'Bogotá - Teusaquillo' },
      nivel_educativo: { original: 'Bachiller', anonimizado: 'Bachiller' },
      salario: { original: '$1,300,000', anonimizado: '$0-2M' },
      cargo_anterior: { original: 'Auxiliar Contable', anonimizado: 'Apoyo Administrativo' },
    },
    {
      id: 'REG-004',
      numero_documento: { original: 'CE-123456', anonimizado: 'TKN-b7c9a1' },
      tipo_documento: { original: 'Cédula de Extranjería', anonimizado: 'Nacional' },
      fecha_nacimiento: { original: '1990-07-08', anonimizado: 'Edad (26-35)' },
      direccion: { original: 'Cra 50 #127-20, Bogotá', anonimizado: 'Bogotá - Suba' },
      nivel_educativo: { original: 'Profesional', anonimizado: 'Profesional' },
      salario: { original: '$4,200,000', anonimizado: '$2M-5M' },
      cargo_anterior: { original: 'Ingeniero de Sistemas', anonimizado: 'Profesiones Científicas' },
    },
    {
      id: 'REG-005',
      numero_documento: { original: '1030456123', anonimizado: 'TKN-3d5f8e' },
      tipo_documento: { original: 'Cédula de Ciudadanía', anonimizado: 'Nacional' },
      fecha_nacimiento: { original: '1975-12-03', anonimizado: 'Edad (46-55)' },
      direccion: { original: 'Calle 80 #70-15, Medellín', anonimizado: 'Medellín - Laureles' },
      nivel_educativo: { original: 'Especialista', anonimizado: 'Posgrado' },
      salario: { original: '$6,500,000', anonimizado: '$5M-10M' },
      cargo_anterior: { original: 'Director Financiero', anonimizado: 'Dirección y Gerencia' },
    },
    {
      id: 'REG-006',
      numero_documento: { original: '79123456', anonimizado: 'TKN-f2a8c6' },
      tipo_documento: { original: 'Cédula de Ciudadanía', anonimizado: 'Nacional' },
      fecha_nacimiento: { original: '1998-05-20', anonimizado: 'Edad (26-35)' },
      direccion: { original: 'Cra 10 #20-30, Cali', anonimizado: 'Cali - Granada' },
      nivel_educativo: { original: 'Técnico', anonimizado: 'Técnico' },
      salario: { original: '$1,800,000', anonimizado: '$0-2M' },
      cargo_anterior: { original: 'Técnico de Soporte', anonimizado: 'Apoyo Técnico' },
    },
    {
      id: 'REG-007',
      numero_documento: { original: 'PP-789456', anonimizado: 'TKN-8c1d4b' },
      tipo_documento: { original: 'Pasaporte', anonimizado: 'Extranjero' },
      fecha_nacimiento: { original: '1985-09-12', anonimizado: 'Edad (36-45)' },
      direccion: { original: 'Av. El Dorado #100-50, Bogotá', anonimizado: 'Bogotá - Fontibón' },
      nivel_educativo: { original: 'Maestría', anonimizado: 'Posgrado' },
      salario: { original: '$8,000,000', anonimizado: '$5M-10M' },
      cargo_anterior: { original: 'Consultor Empresarial', anonimizado: 'Profesiones Científicas' },
    },
    {
      id: 'REG-008',
      numero_documento: { original: '1040789123', anonimizado: 'TKN-d9e2f7' },
      tipo_documento: { original: 'Cédula de Ciudadanía', anonimizado: 'Nacional' },
      fecha_nacimiento: { original: '2003-01-25', anonimizado: 'Edad (18-25)' },
      direccion: { original: 'Calle 15 #30-40, Barranquilla', anonimizado: 'Barranquilla - Norte' },
      nivel_educativo: { original: 'Universitario en curso', anonimizado: 'Bachiller' },
      salario: { original: '$1,500,000', anonimizado: '$0-2M' },
      cargo_anterior: { original: 'Practicante de Marketing', anonimizado: 'Apoyo Administrativo' },
    },
    {
      id: 'REG-009',
      numero_documento: { original: '52987654', anonimizado: 'TKN-a5b3c8' },
      tipo_documento: { original: 'Cédula de Ciudadanía', anonimizado: 'Nacional' },
      fecha_nacimiento: { original: '1992-08-17', anonimizado: 'Edad (26-35)' },
      direccion: { original: 'Cra 68 #45-20, Bogotá', anonimizado: 'Bogotá - Engativá' },
      nivel_educativo: { original: 'Profesional', anonimizado: 'Profesional' },
      salario: { original: '$3,200,000', anonimizado: '$2M-5M' },
      cargo_anterior: { original: 'Contador Público', anonimizado: 'Profesiones Administrativas' },
    },
    {
      id: 'REG-010',
      numero_documento: { original: '1015678901', anonimizado: 'TKN-c7d4e9' },
      tipo_documento: { original: 'Cédula de Ciudadanía', anonimizado: 'Nacional' },
      fecha_nacimiento: { original: '1965-06-30', anonimizado: 'Edad (56+)' },
      direccion: { original: 'Calle 127 #15-30, Bogotá', anonimizado: 'Bogotá - Usaquén' },
      nivel_educativo: { original: 'Doctorado', anonimizado: 'Posgrado' },
      salario: { original: '$12,000,000', anonimizado: '$10M+' },
      cargo_anterior: { original: 'Rector Universitario', anonimizado: 'Dirección y Gerencia' },
    },
  ];

  // Técnicas disponibles por categoría (mantener igual que antes)
  const tecnicasDisponibles = {
    IIP: [
      { value: 'tokenizacion', label: 'Tokenización (SHA-256)' },
      { value: 'supresion', label: 'Supresión Total' },
      { value: 'generalizacion', label: 'Generalización' },
    ],
    cuasi: [
      { value: 'generalizacion', label: 'Generalización' },
      { value: 'perturbacion', label: 'Perturbación (Ruido)' },
      { value: 'sin_anon', label: 'Sin Anonimización' },
    ],
    sensible: [
      { value: 'generalizacion', label: 'Generalización (Rangos)' },
      { value: 'supresion', label: 'Supresión' },
      { value: 'perturbacion', label: 'Perturbación' },
    ],
    analizable: [
      { value: 'sin_anon', label: 'Sin Anonimización' },
    ],
  };

  const getCategoriaBadge = (categoria: string) => {
    switch (categoria) {
      case 'IIP':
        return <Badge className="bg-red-100 text-red-800 text-xs">IIP (Alta)</Badge>;
      case 'cuasi':
        return <Badge className="bg-orange-100 text-orange-800 text-xs">Cuasi-ID (Media)</Badge>;
      case 'sensible':
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Sensible (AD)</Badge>;
      case 'analizable':
        return <Badge className="bg-green-100 text-green-800 text-xs">Analizable</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 text-xs">Otro</Badge>;
    }
  };

  const getRiesgoBadge = (riesgo: string) => {
    switch (riesgo) {
      case 'alto':
        return <Badge className="bg-red-500 text-white text-xs">Alto</Badge>;
      case 'medio':
        return <Badge className="bg-yellow-500 text-white text-xs">Medio</Badge>;
      case 'bajo':
        return <Badge className="bg-green-500 text-white text-xs">Bajo</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white text-xs">N/A</Badge>;
    }
  };

  const handleTecnicaChange = (campoId: string, tecnica: string) => {
    setTecnicasSeleccionadas({
      ...tecnicasSeleccionadas,
      [campoId]: tecnica,
    });
  };

  const handleEjecutarAnonimizacion = () => {
    console.log('Ejecutando anonimización con técnicas:', tecnicasSeleccionadas);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#01033e' }}>
          5. Anonimización y Generación de Dataset Seguro
        </h1>
        <p className="text-sm text-gray-600">
          Aplicación de técnicas de privacidad para protección de datos personales (K-Anonimato)
        </p>
      </div>

      {/* Grid Principal: Matriz de Políticas + Panel de Riesgo */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Matriz de Políticas de Anonimización (3/4) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Tabla de Políticas - MANTENER IGUAL QUE ANTES */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle style={{ color: '#01033e' }}>
                  Matriz de Políticas de Anonimización
                </CardTitle>
                <Badge className="bg-blue-100 text-blue-800">
                  {camposAnonimizables.length} campos configurados
                </Badge>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Configuración de técnicas de anonimización por categoría de sensibilidad
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Campo
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Categoría
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Técnica Actual
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Parámetros
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Riesgo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {camposAnonimizables.map((campo) => (
                      <tr 
                        key={campo.id} 
                        className={`hover:bg-gray-50 ${
                          campo.categoria === 'IIP' ? 'bg-red-50' : ''
                        }`}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {campo.nombre}
                        </td>
                        <td className="px-4 py-3">
                          {getCategoriaBadge(campo.categoria)}
                        </td>
                        <td className="px-4 py-3">
                          <Select
                            value={tecnicasSeleccionadas[campo.id] || campo.tecnicaActual}
                            onValueChange={(value) => handleTecnicaChange(campo.id, value)}
                          >
                            <SelectTrigger className="w-full text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {tecnicasDisponibles[campo.categoria].map((tecnica) => (
                                <SelectItem key={tecnica.value} value={tecnica.label}>
                                  {tecnica.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600 max-w-[250px]">
                          {campo.parametros}
                        </td>
                        <td className="px-4 py-3">
                          {getRiesgoBadge(campo.riesgo)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Previsualización Simple - MANTENER IGUAL QUE ANTES */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-base text-blue-900 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Previsualización de Anonimización (Ejemplo)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded border border-blue-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
                        Campo
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
                        Valor Original
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
                        Valor Anonimizado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-900">Número Documento</td>
                      <td className="px-4 py-2 text-red-600">{ejemploPreview.original.numero_documento}</td>
                      <td className="px-4 py-2 text-green-600 font-mono">
                        {ejemploPreview.anonimizado.numero_documento}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-900">Tipo Documento</td>
                      <td className="px-4 py-2 text-red-600">{ejemploPreview.original.tipo_documento}</td>
                      <td className="px-4 py-2 text-green-600 font-mono">
                        {ejemploPreview.anonimizado.tipo_documento}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-900">Fecha Nacimiento</td>
                      <td className="px-4 py-2 text-red-600">{ejemploPreview.original.fecha_nacimiento}</td>
                      <td className="px-4 py-2 text-green-600 font-mono">
                        {ejemploPreview.anonimizado.fecha_nacimiento}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-900">Dirección</td>
                      <td className="px-4 py-2 text-red-600">{ejemploPreview.original.direccion}</td>
                      <td className="px-4 py-2 text-green-600 font-mono">
                        {ejemploPreview.anonimizado.direccion}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-900">Salario</td>
                      <td className="px-4 py-2 text-red-600">{ejemploPreview.original.salario}</td>
                      <td className="px-4 py-2 text-green-600 font-mono">
                        {ejemploPreview.anonimizado.salario}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 bg-white rounded border border-blue-200">
                <p className="text-xs text-gray-700">
                  💡 <strong>Nota:</strong> Esta es una previsualización con un registro de ejemplo. 
                  Los datos reales serán procesados al ejecutar la anonimización.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Panel Lateral: Riesgo + Acciones (1/4) - MANTENER IGUAL HASTA LOS BOTONES */}
        <div className="space-y-6">
          
          {/* Panel de Riesgo - MANTENER IGUAL */}
          <Card className={`border-l-4 ${
            metricasRiesgo.kAnonimato < 3 
              ? 'border-red-500 bg-red-50' 
              : metricasRiesgo.kAnonimato < 5 
              ? 'border-yellow-500 bg-yellow-50' 
              : 'border-green-500 bg-green-50'
          }`}>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2" style={{ color: '#01033e' }}>
                <Shield className="w-5 h-5" />
                Riesgo de Re-identificación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Indicador K-Anonimato */}
              <div className="text-center p-4 bg-white rounded border">
                <p className="text-xs text-gray-600 mb-2">K-Anonimato Agregado</p>
                <div className={`text-4xl font-bold ${
                  metricasRiesgo.kAnonimato < 3 
                    ? 'text-red-700' 
                    : metricasRiesgo.kAnonimato < 5 
                    ? 'text-yellow-700' 
                    : 'text-green-700'
                }`}>
                  {metricasRiesgo.kAnonimato}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {metricasRiesgo.kAnonimato < 3 
                    ? '⚠️ Riesgo Alto' 
                    : metricasRiesgo.kAnonimato < 5 
                    ? '⚠️ Riesgo Moderado' 
                    : '✅ Riesgo Bajo'}
                </p>
              </div>

              {/* Métricas de Riesgo */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <p className="text-xs font-medium text-gray-700">
                      Registros en Riesgo
                    </p>
                  </div>
                  <p className="text-lg font-bold text-orange-700">
                    {metricasRiesgo.registrosAfectados.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-medium text-gray-700">
                      Campos IIP
                    </p>
                  </div>
                  <p className="text-lg font-bold text-red-700">
                    {metricasRiesgo.camposIIP}
                  </p>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded">
                  <div className="flex items-center gap-2">
                    <FileKey className="w-4 h-4 text-yellow-600" />
                    <p className="text-xs font-medium text-gray-700">
                      Cuasi-Identificadores
                    </p>
                  </div>
                  <p className="text-lg font-bold text-yellow-700">
                    {metricasRiesgo.camposCuasi}
                  </p>
                </div>
              </div>

              {/* Interpretación de K-Anonimato */}
              <div className="p-3 bg-white rounded border text-xs text-gray-700 space-y-2">
                <p><strong>¿Qué significa K-Anonimato = {metricasRiesgo.kAnonimato}?</strong></p>
                <p>
                  Cada combinación de cuasi-identificadores aparece en al menos <strong>{metricasRiesgo.kAnonimato} registros</strong>. 
                  Un valor mayor significa <strong>menor riesgo</strong> de re-identificación.
                </p>
                <p className="text-blue-700">
                  💡 Se recomienda K ≥ 5 para datasets públicos.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Configuración Avanzada - MANTENER IGUAL */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base" style={{ color: '#01033e' }}>
                ⚙️ Configuración Avanzada
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-2 block">
                  K-Anonimato Mínimo Objetivo:
                </label>
                <Select defaultValue="5">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">K = 3 (Mínimo)</SelectItem>
                    <SelectItem value="5">K = 5 (Recomendado)</SelectItem>
                    <SelectItem value="10">K = 10 (Alto)</SelectItem>
                    <SelectItem value="20">K = 20 (Muy Alto)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 mb-2 block">
                  Salt para Tokenización:
                </label>
                <input
                  type="text"
                  defaultValue="SPE-2025"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 border-t text-xs text-gray-600">
                <p>⚠️ Los cambios en la configuración afectarán a todos los registros.</p>
              </div>
            </CardContent>
          </Card>

          {/* Acciones Rápidas - MODIFICAR BOTÓN DE VISTA PREVIA */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base" style={{ color: '#01033e' }}>
                Acciones Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleEjecutarAnonimizacion}
              >
                <Shield className="w-4 h-4 mr-2" />
                Ejecutar Anonimización
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setIsPreviewModalOpen(true)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Vista Previa Completa
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Descargar Dataset Seguro
              </Button>
            </CardContent>
          </Card>

        </div>

      </div>

      {/* NUEVO: Modal de Vista Previa Completa */}
      <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
        <DialogContent className="w-[98vw] max-w-[1600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3" style={{ color: '#01033e' }}>
              <Eye className="w-6 h-6" />
              Vista Previa Completa de Anonimización (10 Registros)
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Información de la Vista Previa */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-900">
                <strong>📊 Previsualización:</strong> Se muestran 10 registros de ejemplo con la comparación 
                entre datos originales (en rojo) y datos anonimizados (en verde). Esta vista permite verificar 
                que las técnicas de anonimización se aplican correctamente antes de ejecutar el proceso completo.
              </p>
            </div>

            {/* Tabla Comparativa Completa */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px] text-sm">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase border-r">
                      ID
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase border-r" colSpan={2}>
                      Número Documento
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase border-r" colSpan={2}>
                      Tipo Documento
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase border-r" colSpan={2}>
                      Fecha Nacimiento
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase border-r" colSpan={2}>
                      Dirección
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase border-r" colSpan={2}>
                      Nivel Educativo
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase border-r" colSpan={2}>
                      Salario
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase" colSpan={2}>
                      Cargo Anterior
                    </th>
                  </tr>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 border-r"></th>
                    <th className="px-3 py-2 text-xs font-medium text-red-700">Original</th>
                    <th className="px-3 py-2 text-xs font-medium text-green-700 border-r">Anonimizado</th>
                    <th className="px-3 py-2 text-xs font-medium text-red-700">Original</th>
                    <th className="px-3 py-2 text-xs font-medium text-green-700 border-r">Anonimizado</th>
                    <th className="px-3 py-2 text-xs font-medium text-red-700">Original</th>
                    <th className="px-3 py-2 text-xs font-medium text-green-700 border-r">Anonimizado</th>
                    <th className="px-3 py-2 text-xs font-medium text-red-700">Original</th>
                    <th className="px-3 py-2 text-xs font-medium text-green-700 border-r">Anonimizado</th>
                    <th className="px-3 py-2 text-xs font-medium text-red-700">Original</th>
                    <th className="px-3 py-2 text-xs font-medium text-green-700 border-r">Anonimizado</th>
                    <th className="px-3 py-2 text-xs font-medium text-red-700">Original</th>
                    <th className="px-3 py-2 text-xs font-medium text-green-700 border-r">Anonimizado</th>
                    <th className="px-3 py-2 text-xs font-medium text-red-700">Original</th>
                    <th className="px-3 py-2 text-xs font-medium text-green-700">Anonimizado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {registrosPreviewCompletos.map((registro) => (
                    <tr key={registro.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3 font-medium text-gray-900 border-r whitespace-nowrap">
                        {registro.id}
                      </td>
                      <td className="px-3 py-3 text-red-600 font-mono">
                        {registro.numero_documento.original}
                      </td>
                      <td className="px-3 py-3 text-green-600 font-mono border-r">
                        {registro.numero_documento.anonimizado}
                      </td>
                      <td className="px-3 py-3 text-red-600">
                        {registro.tipo_documento.original}
                      </td>
                      <td className="px-3 py-3 text-green-600 font-mono border-r">
                        {registro.tipo_documento.anonimizado}
                      </td>
                      <td className="px-3 py-3 text-red-600">
                        {registro.fecha_nacimiento.original}
                      </td>
                      <td className="px-3 py-3 text-green-600 font-mono border-r">
                        {registro.fecha_nacimiento.anonimizado}
                      </td>
                      <td className="px-3 py-3 text-red-600">
                        {registro.direccion.original}
                      </td>
                      <td className="px-3 py-3 text-green-600 font-mono border-r">
                        {registro.direccion.anonimizado}
                      </td>
                      <td className="px-3 py-3 text-red-600">
                        {registro.nivel_educativo.original}
                      </td>
                      <td className="px-3 py-3 text-green-600 font-mono border-r">
                        {registro.nivel_educativo.anonimizado}
                      </td>
                      <td className="px-3 py-3 text-red-600">
                        {registro.salario.original}
                      </td>
                      <td className="px-3 py-3 text-green-600 font-mono border-r">
                        {registro.salario.anonimizado}
                      </td>
                      <td className="px-3 py-3 text-red-600">
                        {registro.cargo_anterior.original}
                      </td>
                      <td className="px-3 py-3 text-green-600 font-mono">
                        {registro.cargo_anterior.anonimizado}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Leyenda */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-xs font-bold text-red-700 mb-1">🔴 Datos Originales</p>
                <p className="text-xs text-red-600">
                  Valores antes de aplicar anonimización. Contienen información personal identificable.
                </p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-xs font-bold text-green-700 mb-1">🟢 Datos Anonimizados</p>
                <p className="text-xs text-green-600">
                  Valores después de aplicar técnicas de privacidad (Tokenización, Generalización, etc.).
                </p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-xs font-bold text-blue-700 mb-1">ℹ️ Nota Importante</p>
                <p className="text-xs text-blue-600">
                  Esta es una simulación. Al ejecutar la anonimización, se procesarán 730,120 registros.
                </p>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsPreviewModalOpen(false)}>
                Cerrar
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  setIsPreviewModalOpen(false);
                  handleEjecutarAnonimizacion();
                }}
              >
                <Shield className="w-4 h-4 mr-2" />
                Confirmar y Ejecutar Anonimización
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Resumen de Técnicas Aplicadas - MANTENER IGUAL QUE ANTES */}
      <Card>
        <CardHeader>
          <CardTitle style={{ color: '#01033e' }}>
            📋 Resumen de Técnicas de Anonimización Aplicadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                tecnica: 'Tokenización (SHA-256)',
                campos: 'numero_documento',
                cantidad: 875420,
                color: 'bg-purple-50 border-purple-200',
                textColor: 'text-purple-700',
              },
              {
                tecnica: 'Generalización (Rangos)',
                campos: 'fecha_nacimiento, salario_ofrecido, direccion',
                cantidad: 875420,
                color: 'bg-blue-50 border-blue-200',
                textColor: 'text-blue-700',
              },
              {
                tecnica: 'Generalización (Categorías)',
                campos: 'tipo_documento',
                cantidad: 875420,
                color: 'bg-green-50 border-green-200',
                textColor: 'text-green-700',
              },
              {
                tecnica: 'Supresión Total',
                campos: 'estado_afiliacion',
                cantidad: 875420,
                color: 'bg-red-50 border-red-200',
                textColor: 'text-red-700',
              },
            ].map((item, index) => (
              <div key={index} className={`p-4 border rounded ${item.color}`}>
                <h4 className={`text-sm font-bold mb-2 ${item.textColor}`}>
                  {item.tecnica}
                </h4>
                <p className="text-xs text-gray-700 mb-2">
                  <strong>Campos:</strong> {item.campos}
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Registros procesados:</strong> {item.cantidad.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerta de Cumplimiento - MANTENER IGUAL QUE ANTES */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-base font-bold text-green-900 mb-2">
                ✅ Dataset Listo para Publicación
              </h3>
              <p className="text-sm text-green-800 mb-3">
                El dataset cumple con los estándares de privacidad (K-Anonimato ≥ 5) y está listo 
                para ser publicado según la <strong>Ley 1581 de 2012</strong> (Protección de Datos Personales) 
                y el <strong>Decreto 1377 de 2013</strong>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-2 bg-white rounded">
                  <strong>Registros Originales:</strong> 875,420
                </div>
                <div className="p-2 bg-white rounded">
                  <strong>Registros Anonimizados:</strong> 730,120
                </div>
                <div className="p-2 bg-white rounded">
                  <strong>K-Anonimato Final:</strong> 4.2
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}