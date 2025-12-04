'use client';

import { StatCard } from '@/components/dashboard/stat-card';
import { ProcessStep } from '@/components/dashboard/process-step';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { PhaseStatus } from '@/components/dashboard/phase-status';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Database,
  Copy,
  CheckCircle,
  Shield,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { CHART_COLORS } from '@/lib/constants/colors';
import { BarChart } from '@/components/charts/bar-chart';
import { PieChart } from '@/components/charts/pie-chart';
import { LineChart } from '@/components/charts/line-chart';

export default function DashboardPage() {
  // Datos de ejemplo para KPIs
  const kpiData = [
    {
      titulo: 'Registros Procesados',
      valor: '875,420',
      cambio: '+12%',
      tendencia: 'up' as const,
      icono: Database,
      colorBorde: CHART_COLORS.blue,
    },
    {
      titulo: '% Duplicidad Inicial',
      valor: '18.4%',
      cambio: '-3%',
      tendencia: 'down' as const,
      icono: Copy,
      colorBorde: CHART_COLORS.purple,
    },
    {
      titulo: 'Completitud de Datos',
      valor: '92.7%',
      cambio: '+5%',
      tendencia: 'up' as const,
      icono: CheckCircle,
      colorBorde: CHART_COLORS.mediumBlue,
    },
    {
      titulo: 'Registros Anonimizados',
      valor: '156,890',
      cambio: '+8%',
      tendencia: 'up' as const,
      icono: Shield,
      colorBorde: CHART_COLORS.teal,
    },
  ];

  // Datos de ejemplo para las fases del proceso ETL
  const procesosETL = [
    {
      nombre: '1. Datos Crudos',
      porcentaje: 100,
      estado: 'completado' as const,
      registros: '875K Registros',
      color: CHART_COLORS.blue,
    },
    {
      nombre: '2. Normalización',
      porcentaje: 85,
      estado: 'error' as const,
      registros: '85% Cumplimiento',
      color: CHART_COLORS.purple,
    },
    {
      nombre: '3. Integración',
      porcentaje: 60,
      estado: 'en_proceso' as const,
      registros: 'En Progreso',
      color: CHART_COLORS.mediumBlue,
    },
    {
      nombre: '4. Alistamiento',
      porcentaje: 30,
      estado: 'en_proceso' as const,
      registros: '30% Completado',
      color: CHART_COLORS.lightBlue,
    },
    {
      nombre: '5. Anonimización',
      porcentaje: 0,
      estado: 'pendiente' as const,
      registros: 'Pendiente',
      color: CHART_COLORS.darkBlue,
    },
  ];

  // Datos de ejemplo para actividades recientes
  const actividadesRecientes = [
    {
      id: '1',
      mensaje: 'Se procesaron 12,450 nuevos registros de DATAEMPLEO',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // hace 5 min
      tipo: 'success' as const,
    },
    {
      id: '2',
      mensaje: 'Alerta: Se detectaron 2,340 registros duplicados en el lote 245',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // hace 15 min
      tipo: 'warning' as const,
    },
    {
      id: '3',
      mensaje: 'Integración con RUES completada: 98.5% de cobertura',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // hace 30 min
      tipo: 'success' as const,
    },
    {
      id: '4',
      mensaje: 'Error en validación de NIT-DIAN para 145 registros',
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // hace 45 min
      tipo: 'error' as const,
    },
  ];

  // Datos de ejemplo para estado por fase
  const estadosPorFase = [
    {
      fase: 'Datos Crudos',
      estado: 'completado' as const,
      registros: 875420,
    },
    {
      fase: 'Normalización',
      estado: 'en_proceso' as const,
      registros: 744107,
    },
    {
      fase: 'Integración',
      estado: 'en_proceso' as const,
      registros: 525252,
    },
    {
      fase: 'Alistamiento',
      estado: 'pendiente' as const,
      registros: 0,
    },
  ];

  // Datos de ejemplo para gráficos
  const prestadoresData = [
    { nombre: 'COMFENALCO', valor: 125000 },
    { nombre: 'COMFAMA', valor: 98000 },
    { nombre: 'COMPENSAR', valor: 87000 },
    { nombre: 'CAFAM', valor: 75000 },
    { nombre: 'COLSUBSIDIO', valor: 65000 },
  ];

  const distribucionSexo = [
    { nombre: 'Masculino', valor: 450000, porcentaje: 51.4 },
    { nombre: 'Femenino', valor: 425420, porcentaje: 48.6 },
  ];

  const tendenciaTemporal = [
    { fecha: new Date(2024, 0, 1), valor: 45000 },
    { fecha: new Date(2024, 0, 7), valor: 52000 },
    { fecha: new Date(2024, 0, 14), valor: 48000 },
    { fecha: new Date(2024, 0, 21), valor: 55000 },
    { fecha: new Date(2024, 0, 28), valor: 60000 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Encabezado Compacto */}
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#01033e' }}>
          Dashboard Principal
        </h1>
        <p className="text-sm text-gray-600">
          Sistema de Calidad de Datos - Servicio Público de Empleo
        </p>
      </div>

      <Separator className="my-4" />

      {/* FILA 1: KPIs - 4 Tarjetas Horizontales */}
      <section>
        <h2 className="text-lg font-semibold mb-3" style={{ color: '#01033e' }}>
          Indicadores Clave de Rendimiento
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi, index) => (
            <StatCard
              key={index}
              titulo={kpi.titulo}
              valor={kpi.valor}
              cambio={kpi.cambio}
              tendencia={kpi.tendencia}
              icono={kpi.icono}
              colorBorde={kpi.colorBorde}
            />
          ))}
        </div>
      </section>

      {/* FILA 2: Progreso ETL + Estado por Fase + Actividades (Grid 3 columnas) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Progreso del Proceso ETL */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base" style={{ color: '#01033e' }}>
              Progreso ETL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {procesosETL.map((proceso, index) => (
                <ProcessStep
                  key={index}
                  nombre={proceso.nombre}
                  porcentaje={proceso.porcentaje}
                  estado={proceso.estado}
                  registros={proceso.registros}
                  color={proceso.color}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Estado por Fase */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base" style={{ color: '#01033e' }}>
              Estado por Fase
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {estadosPorFase.map((item, index) => (
              <div key={index} className="space-y-1">
                <p className="text-sm font-medium text-gray-900">{item.fase}</p>
                <PhaseStatus
                  fase={item.fase}
                  estado={item.estado}
                  registros={item.registros}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actividades Recientes */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base" style={{ color: '#01033e' }}>
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {actividadesRecientes.map((actividad) => (
              <div key={actividad.id} className="flex gap-2 items-start">
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    actividad.tipo === 'success'
                      ? 'bg-green-500'
                      : actividad.tipo === 'warning'
                      ? 'bg-yellow-500'
                      : actividad.tipo === 'error'
                      ? 'bg-red-500'
                      : 'bg-blue-500'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-900 mb-0.5">
                    {actividad.mensaje}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatRelativeTime(actividad.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* FILA 3: Gráficos - 3 Columnas (Bar, Pie, Line) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <BarChart
          data={prestadoresData}
          titulo="Registros por Prestador"
          color={CHART_COLORS.blue}
        />
        <PieChart
          data={distribucionSexo}
          titulo="Distribución por Sexo"
        />
        <LineChart
          data={tendenciaTemporal}
          titulo="Tendencia de Ingreso"
        />
      </div>

      {/* FILA 4: Alertas + Próximos Pasos (Grid 2 columnas) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Alertas y Recomendaciones */}
        <Card className="border-l-4 border-yellow-500">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <CardTitle className="text-base text-yellow-900">
                Alertas y Recomendaciones
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Alto porcentaje de duplicidad detectado
                </p>
                <p className="text-xs text-gray-600">
                  Se recomienda ejecutar el proceso de deduplicación.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Errores de validación NIT-DIAN
                </p>
                <p className="text-xs text-gray-600">
                  145 registros con errores en formato DIAN.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Actualización de fuentes disponible
                </p>
                <p className="text-xs text-gray-600">
                  Nuevos datos de RUES y DANE disponibles.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Próximos Pasos */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base" style={{ color: '#01033e' }}>
              Próximos Pasos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Análisis Avanzado
                  </p>
                  <p className="text-xs text-blue-700">
                    Implementar vistas detalladas por fase ETL.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-gray-50 rounded">
                  <p className="text-lg font-bold" style={{ color: CHART_COLORS.purple }}>
                    45
                  </p>
                  <p className="text-xs text-gray-600">Prestadores</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <p className="text-lg font-bold" style={{ color: CHART_COLORS.mediumBlue }}>
                    98.2%
                  </p>
                  <p className="text-xs text-gray-600">Cobertura</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <p className="text-lg font-bold" style={{ color: CHART_COLORS.teal }}>
                    7 días
                  </p>
                  <p className="text-xs text-gray-600">Tiempo</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper function (agregar al final del archivo)
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'hace un momento';

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `hace ${diffInMinutes} min`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `hace ${diffInHours}h`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `hace ${diffInDays}d`;
}