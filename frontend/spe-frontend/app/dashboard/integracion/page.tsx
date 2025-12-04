'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle, AlertCircle, Clock, Download, Activity } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Tipo para las fuentes externas
interface FuenteExterna {
  id: string;
  nombre: string;
  descripcion: string;
  estado: 'activo' | 'sincronizando' | 'error';
  cobertura: number;
  registrosEnriquecidos: number;
  ultimaSync: string;
  camposAportados: string[];
}

export default function IntegracionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fuenteSeleccionada, setFuenteSeleccionada] = useState<FuenteExterna | null>(null);

  // Datos de ejemplo para fuentes externas
  const fuentesExternas: FuenteExterna[] = [
    {
      id: '1',
      nombre: 'DATAEMPLEO',
      descripcion: 'Plataforma de vacantes del SENA',
      estado: 'activo',
      cobertura: 98.5,
      registrosEnriquecidos: 863248,
      ultimaSync: '2025-11-24 08:30:15',
      camposAportados: ['tipo_contrato', 'jornada_laboral', 'experiencia_requerida'],
    },
    {
      id: '2',
      nombre: 'RUES',
      descripcion: 'Registro Único Empresarial y Social',
      estado: 'activo',
      cobertura: 94.2,
      registrosEnriquecidos: 824550,
      ultimaSync: '2025-11-24 07:15:42',
      camposAportados: ['razon_social', 'actividad_economica', 'departamento_empresa'],
    },
    {
      id: '3',
      nombre: 'DANE',
      descripcion: 'Datos demográficos y económicos',
      estado: 'sincronizando',
      cobertura: 87.6,
      registrosEnriquecidos: 766608,
      ultimaSync: '2025-11-24 06:00:00',
      camposAportados: ['codigo_divipola', 'estrato_socioeconomico'],
    },
    {
      id: '4',
      nombre: 'CUOC IA',
      descripcion: 'Clasificación ocupacional inteligente',
      estado: 'error',
      cobertura: 72.3,
      registrosEnriquecidos: 632928,
      ultimaSync: '2025-11-23 23:45:10',
      camposAportados: ['codigo_cuoc', 'nivel_ocupacional', 'area_desempeno'],
    },
  ];

  // Datos de ejemplo para completitud de campos
  const completitudCampos = [
    { campo: 'nit_prestador', original: 100, enriquecido: 100 },
    { campo: 'salario_ofrecido', original: 100, enriquecido: 100 },
    { campo: 'tipo_contrato', original: 45, enriquecido: 98 },
    { campo: 'jornada_laboral', original: 38, enriquecido: 96 },
    { campo: 'experiencia_requerida', original: 62, enriquecido: 97 },
    { campo: 'razon_social', original: 88, enriquecido: 99 },
    { campo: 'actividad_economica', original: 12, enriquecido: 94 },
    { campo: 'codigo_cuoc', original: 5, enriquecido: 72 },
  ];

  // Métricas generales
  const metricasGenerales = {
    registrosOriginales: 875420,
    registrosEnriquecidos: 824550,
    porcentajeEnriquecimiento: 94.2,
    camposAñadidos: 18,
  };

  // Datos de ejemplo para historial de sincronizaciones (por fuente)
  const getHistorialSync = (fuenteId: string) => {
    const historiales: Record<string, any[]> = {
      '1': [
        { fecha: '2025-11-24 08:30:15', estado: 'exitoso', registros: 863248, duracion: '2m 15s' },
        { fecha: '2025-11-24 02:00:10', estado: 'exitoso', registros: 862890, duracion: '2m 18s' },
        { fecha: '2025-11-23 20:00:05', estado: 'exitoso', registros: 862120, duracion: '2m 12s' },
        { fecha: '2025-11-23 14:00:22', estado: 'parcial', registros: 861500, duracion: '3m 45s' },
        { fecha: '2025-11-23 08:00:18', estado: 'exitoso', registros: 860980, duracion: '2m 10s' },
      ],
      '2': [
        { fecha: '2025-11-24 07:15:42', estado: 'exitoso', registros: 824550, duracion: '5m 32s' },
        { fecha: '2025-11-23 19:10:30', estado: 'exitoso', registros: 823890, duracion: '5m 28s' },
        { fecha: '2025-11-23 07:05:15', estado: 'exitoso', registros: 823120, duracion: '5m 35s' },
        { fecha: '2025-11-22 19:00:45', estado: 'parcial', registros: 822100, duracion: '7m 12s' },
        { fecha: '2025-11-22 07:00:20', estado: 'exitoso', registros: 821980, duracion: '5m 30s' },
      ],
      '3': [
        { fecha: '2025-11-24 06:00:00', estado: 'en_progreso', registros: 766608, duracion: '-' },
        { fecha: '2025-11-23 18:00:55', estado: 'exitoso', registros: 765200, duracion: '8m 15s' },
        { fecha: '2025-11-23 06:00:40', estado: 'exitoso', registros: 764500, duracion: '8m 10s' },
        { fecha: '2025-11-22 18:00:25', estado: 'exitoso', registros: 763800, duracion: '8m 18s' },
        { fecha: '2025-11-22 06:00:10', estado: 'parcial', registros: 762900, duracion: '10m 05s' },
      ],
      '4': [
        { fecha: '2025-11-23 23:45:10', estado: 'error', registros: 0, duracion: '-' },
        { fecha: '2025-11-23 11:30:20', estado: 'exitoso', registros: 632928, duracion: '12m 45s' },
        { fecha: '2025-11-22 23:20:15', estado: 'exitoso', registros: 631200, duracion: '12m 38s' },
        { fecha: '2025-11-22 11:15:30', estado: 'parcial', registros: 630100, duracion: '15m 20s' },
        { fecha: '2025-11-21 23:10:45', estado: 'exitoso', registros: 629500, duracion: '12m 42s' },
      ],
    };
    return historiales[fuenteId] || [];
  };

  // Datos de ejemplo para campos enriquecidos (por fuente)
  const getCamposDetalle = (fuenteNombre: string) => {
    const detalles: Record<string, any[]> = {
      'DATAEMPLEO': [
        { campo: 'tipo_contrato', original: 'N/A', enriquecido: 'Término Indefinido', registros: 785000 },
        { campo: 'jornada_laboral', original: null, enriquecido: 'Tiempo Completo', registros: 820000 },
        { campo: 'experiencia_requerida', original: null, enriquecido: '2 años', registros: 750000 },
      ],
      'RUES': [
        { campo: 'razon_social', original: 'ACME', enriquecido: 'ACME CORP S.A.S', registros: 800000 },
        { campo: 'actividad_economica', original: null, enriquecido: 'Código CIIU: 6201', registros: 780000 },
        { campo: 'departamento_empresa', original: null, enriquecido: 'CUNDINAMARCA', registros: 820000 },
      ],
      'DANE': [
        { campo: 'codigo_divipola', original: null, enriquecido: '11001', registros: 750000 },
        { campo: 'estrato_socioeconomico', original: null, enriquecido: 'Estrato 3', registros: 700000 },
      ],
      'CUOC IA': [
        { campo: 'codigo_cuoc', original: null, enriquecido: '2143', registros: 600000 },
        { campo: 'nivel_ocupacional', original: null, enriquecido: 'Profesional', registros: 620000 },
        { campo: 'area_desempeno', original: null, enriquecido: 'Tecnología', registros: 610000 },
      ],
    };
    return detalles[fuenteNombre] || [];
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'activo':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" /> Activo</Badge>;
      case 'sincronizando':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" /> Sincronizando</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="w-3 h-3 mr-1" /> Error</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Desconocido</Badge>;
    }
  };

  const getEstadoSyncBadge = (estado: string) => {
    switch (estado) {
      case 'exitoso':
        return <Badge className="bg-green-100 text-green-800 text-xs">Exitoso</Badge>;
      case 'parcial':
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Parcial</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800 text-xs">Error</Badge>;
      case 'en_progreso':
        return <Badge className="bg-blue-100 text-blue-800 text-xs">En Progreso</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 text-xs">Desconocido</Badge>;
    }
  };

  const handleVerDetalle = (fuente: FuenteExterna) => {
    setFuenteSeleccionada(fuente);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#01033e' }}>
          3. Integración de Fuentes Externas
        </h1>
        <p className="text-sm text-gray-600">
          Enriquecimiento de datos mediante conexión con fuentes oficiales
        </p>
      </div>

      {/* Métricas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">Registros Originales</p>
              <p className="text-3xl font-bold text-blue-700">
                {metricasGenerales.registrosOriginales.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">Registros Enriquecidos</p>
              <p className="text-3xl font-bold text-green-700">
                {metricasGenerales.registrosEnriquecidos.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">% Enriquecimiento</p>
              <p className="text-3xl font-bold text-purple-700">
                {metricasGenerales.porcentajeEnriquecimiento}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">Campos Añadidos</p>
              <p className="text-3xl font-bold text-orange-700">
                {metricasGenerales.camposAñadidos}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid Principal: Fuentes Externas + Gráfico Completitud */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Panel de Fuentes Externas (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle style={{ color: '#01033e' }}>
                  Fuentes Externas Conectadas
                </CardTitle>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sincronizar Todo
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {fuentesExternas.map((fuente) => (
                <div 
                  key={fuente.id} 
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  {/* Header de la Fuente */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {fuente.nombre}
                        </h3>
                        {getEstadoBadge(fuente.estado)}
                      </div>
                      <p className="text-sm text-gray-600">{fuente.descripcion}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleVerDetalle(fuente)}
                      >
                        <Activity className="w-4 h-4 mr-1" />
                        Ver Detalle
                      </Button>
                      <Button 
                        variant={fuente.estado === 'error' ? 'destructive' : 'outline'} 
                        size="sm"
                      >
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Sync
                      </Button>
                    </div>
                  </div>

                  {/* Métricas de la Fuente */}
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600">Cobertura</p>
                      <p className="text-xl font-bold" style={{ color: '#01033e' }}>
                        {fuente.cobertura}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Registros Enriquecidos</p>
                      <p className="text-xl font-bold text-green-700">
                        {fuente.registrosEnriquecidos.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Última Sync</p>
                      <p className="text-sm font-medium text-gray-700">
                        {new Date(fuente.ultimaSync).toLocaleString('es-CO', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Barra de Progreso */}
                  <div className="mb-3">
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full ${
                          fuente.cobertura >= 90 
                            ? 'bg-green-500' 
                            : fuente.cobertura >= 75 
                            ? 'bg-blue-500' 
                            : 'bg-yellow-500'
                        }`}
                        style={{ width: `${fuente.cobertura}%` }}
                      />
                    </div>
                  </div>

                  {/* Campos Aportados */}
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-2">
                      Campos Aportados:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {fuente.camposAportados.map((campo, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {campo}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Panel Lateral: Completitud de Campos (1/3) */}
        <div className="space-y-6">
          
          {/* Gráfico de Completitud */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base" style={{ color: '#01033e' }}>
                Completitud de Campos
              </CardTitle>
              <p className="text-xs text-gray-600">
                Comparación antes/después del enriquecimiento
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {completitudCampos.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900">
                      {item.campo}
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-gray-600">
                        {item.original}%
                      </span>
                      <span className="text-green-600 font-bold">
                        → {item.enriquecido}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="flex h-full">
                      <div 
                        className="bg-gray-400"
                        style={{ width: `${item.original}%` }}
                      />
                      <div 
                        className="bg-green-500"
                        style={{ width: `${item.enriquecido - item.original}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Resumen de Mejora */}
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-base text-green-900">
                ✅ Resumen de Mejora
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/70 rounded">
                <p className="text-sm font-medium text-gray-700">
                  Incremento Promedio de Completitud
                </p>
                <p className="text-2xl font-bold text-green-700">
                  +52.3%
                </p>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/70 rounded">
                <p className="text-sm font-medium text-gray-700">
                  Campos Mejorados
                </p>
                <p className="text-2xl font-bold text-blue-700">
                  8/8
                </p>
              </div>
              <div className="p-3 bg-white/70 rounded">
                <p className="text-xs text-gray-600 mb-1">
                  Mayor Mejora:
                </p>
                <p className="text-sm font-bold text-green-700">
                  actividad_economica: +82%
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Acciones Rápidas - ELIMINADO "Ver Detalle por Fuente" */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base" style={{ color: '#01033e' }}>
                Acciones Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                📥 Descargar Reporte de Integración
              </Button>
              <Button variant="outline" className="w-full">
                🔄 Historial de Sincronizaciones
              </Button>
            </CardContent>
          </Card>

        </div>

      </div>

      {/* MODAL: Detalle de Fuente Externa - AJUSTADO */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-[98vw] max-w-[1600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 flex-wrap" style={{ color: '#01033e' }}>
              <Activity className="w-6 h-6 flex-shrink-0" />
              <span className="flex-1">Detalle de Fuente: {fuenteSeleccionada?.nombre}</span>
              {fuenteSeleccionada && getEstadoBadge(fuenteSeleccionada.estado)}
            </DialogTitle>
          </DialogHeader>

          {fuenteSeleccionada && (
            <div className="space-y-6 py-4">
              {/* Métricas Principales - MEJORADO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-4 px-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600">Cobertura</p>
                      <p className="text-2xl font-bold text-green-700 break-words">
                        {fuenteSeleccionada.cobertura}%
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 px-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600">Registros Enriquecidos</p>
                      <p className="text-2xl font-bold text-blue-700 break-words">
                        {fuenteSeleccionada.registrosEnriquecidos.toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 px-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600">Campos Aportados</p>
                      <p className="text-2xl font-bold text-purple-700 break-words">
                        {fuenteSeleccionada.camposAportados.length}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 px-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600">Última Sync</p>
                      <p className="text-sm font-bold text-gray-900 break-words">
                        {new Date(fuenteSeleccionada.ultimaSync).toLocaleString('es-CO', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tabla de Campos Enriquecidos */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Campos Enriquecidos - Ejemplos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                            Campo
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                            Valor Original
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                            Valor Enriquecido
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                            Registros Afectados
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {getCamposDetalle(fuenteSeleccionada.nombre).map((campo, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              {campo.campo}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {campo.original || <span className="text-red-600">null</span>}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-green-700">
                              {campo.enriquecido}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {campo.registros.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Historial de Sincronizaciones */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Historial de Sincronizaciones (Últimas 5)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                            Fecha y Hora
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                            Estado
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                            Registros Procesados
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                            Duración
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {getHistorialSync(fuenteSeleccionada.id).map((sync, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                              {sync.fecha}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {getEstadoSyncBadge(sync.estado)}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              {sync.registros > 0 ? sync.registros.toLocaleString() : '-'}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {sync.duracion}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Logs de Errores (solo si hay error) */}
              {fuenteSeleccionada.estado === 'error' && (
                <Card className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="text-base text-red-900">
                      ⚠️ Logs de Errores - Última Sincronización
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white p-4 rounded border border-red-200 font-mono text-xs overflow-x-auto">
                      <p className="text-red-700">[2025-11-23 23:45:10] ERROR: Timeout al conectar con API externa</p>
                      <p className="text-red-700">[2025-11-23 23:45:15] ERROR: No se recibió respuesta del servidor</p>
                      <p className="text-red-700">[2025-11-23 23:45:20] INFO: Reintentando conexión... (Intento 1/3)</p>
                      <p className="text-red-700">[2025-11-23 23:45:30] ERROR: Conexión rechazada - Puerto 443 cerrado</p>
                      <p className="text-yellow-700">[2025-11-23 23:45:35] WARN: Sincronización cancelada por exceso de errores</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Botones de Acción */}
              <div className="flex flex-wrap justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cerrar
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Log
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sincronizar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Tabla de Ejemplo de Enriquecimiento */}
      <Card>
        <CardHeader>
          <CardTitle style={{ color: '#01033e' }}>
            Ejemplo de Registros Enriquecidos (Primeros 5)
          </CardTitle>
          <p className="text-sm text-gray-600">
            Comparación de datos originales vs enriquecidos
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    ID Registro
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    NIT
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Razón Social
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Tipo Contrato
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Código CUOC
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Fuentes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { 
                    id: 'VAC-001234', 
                    nit: '900123456-7', 
                    razon: 'ACME CORP S.A.S', 
                    contrato: 'Término Indefinido', 
                    cuoc: '2143', 
                    fuentes: ['RUES', 'DATAEMPLEO', 'CUOC IA'],
                    original: { razon: null, contrato: null, cuoc: null },
                  },
                  { 
                    id: 'VAC-001235', 
                    nit: '800987654-3', 
                    razon: 'TECH SOLUTIONS LTDA', 
                    contrato: 'Obra o Labor', 
                    cuoc: '2511', 
                    fuentes: ['RUES', 'DATAEMPLEO'],
                    original: { razon: null, contrato: 'N/A', cuoc: null },
                  },
                  { 
                    id: 'VAC-001236', 
                    nit: '900555888-2', 
                    razon: 'SERVICIOS PROFESIONALES', 
                    contrato: 'Término Fijo', 
                    cuoc: '1223', 
                    fuentes: ['RUES', 'CUOC IA'],
                    original: { razon: 'SERV PROF', contrato: null, cuoc: null },
                  },
                  { 
                    id: 'VAC-001237', 
                    nit: '700444111-5', 
                    razon: 'CONSTRUCCIONES ABC', 
                    contrato: 'Temporal', 
                    cuoc: '7112', 
                    fuentes: ['RUES', 'DATAEMPLEO', 'DANE'],
                    original: { razon: null, contrato: null, cuoc: null },
                  },
                  { 
                    id: 'VAC-001238', 
                    nit: '800222333-9', 
                    razon: 'COMERCIO AL POR MAYOR', 
                    contrato: 'Término Indefinido', 
                    cuoc: '5223', 
                    fuentes: ['RUES', 'DATAEMPLEO'],
                    original: { razon: 'COM MAYOR', contrato: 'Indefinido', cuoc: null },
                  },
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {row.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {row.nit}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div>
                        <p className="font-medium text-gray-900">{row.razon}</p>
                        {row.original.razon === null && (
                          <p className="text-xs text-green-600">✓ Enriquecido</p>
                        )}
                        {row.original.razon && (
                          <p className="text-xs text-gray-500">
                            Original: {row.original.razon}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div>
                        <p className="font-medium text-gray-900">{row.contrato}</p>
                        {row.original.contrato === null && (
                          <p className="text-xs text-green-600">✓ Enriquecido</p>
                        )}
                        {row.original.contrato && row.original.contrato !== 'N/A' && (
                          <p className="text-xs text-gray-500">
                            Original: {row.original.contrato}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div>
                        <p className="font-medium text-gray-900">{row.cuoc}</p>
                        {row.original.cuoc === null && (
                          <p className="text-xs text-green-600">✓ Enriquecido</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {row.fuentes.map((fuente, idx) => (
                          <Badge 
                            key={idx} 
                            variant="outline" 
                            className="text-xs"
                          >
                            {fuente}
                          </Badge>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}