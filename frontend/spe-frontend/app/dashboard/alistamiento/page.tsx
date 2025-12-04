"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  TrendingUp,
  Clock,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Tipo para registros con fallos
interface RegistroFallo {
  id: string;
  fechaFallo: string;
  campoCritico: string;
  valorReportado: string | null;
  valorCorregido: string;
  motivoAccion: string;
  tipoFallo: "normalizacion" | "integracion" | "missing";
}

export default function AlistamientoPage() {
  const [registrosEditados, setRegistrosEditados] = useState<
    Record<string, string>
  >({});
  const [metodoImputacion, setMetodoImputacion] = useState<string>("");

  // Datos de ejemplo para dashboard de fallos
  const dashboardFallos = [
    {
      titulo: "Registros Fallidos (Normalización)",
      valor: 65200,
      detalle: "Salario: 14.8%",
      color: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      titulo: "Registros Fallidos (Integración)",
      valor: 72000,
      detalle: "Match DIAN: 4.7%",
      color: "text-orange-700",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      titulo: "Vacantes con Missing Values",
      valor: 8100,
      detalle: "Razón Social: 3.2%",
      color: "text-yellow-700",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      titulo: "Registros Completos (Listos)",
      valor: 730120,
      detalle: "83.4% del total",
      color: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
  ];

  // Datos de ejemplo para registros con fallos
  const registrosFallos: RegistroFallo[] = [
    {
      id: "V-45123",
      fechaFallo: "2025-11-25",
      campoCritico: "salario_ofrecido",
      valorReportado: "$500,000",
      valorCorregido: "$1,300,000",
      motivoAccion:
        "Imputado por Media. Error de tipeo, se corrige al mínimo legal.",
      tipoFallo: "normalizacion",
    },
    {
      id: "V-45124",
      fechaFallo: "2025-11-25",
      campoCritico: "nit_prestador",
      valorReportado: "900.234.XXX",
      valorCorregido: "900.234.900",
      motivoAccion:
        "Corrección Manual. Dígito de verificación faltante, validado en portal.",
      tipoFallo: "integracion",
    },
    {
      id: "V-45125",
      fechaFallo: "2025-11-25",
      campoCritico: "antiguedad",
      valorReportado: "450 días",
      valorCorregido: "90 días",
      motivoAccion:
        "Marcar como Obsoleto (Eliminar). Vacante de 2024. Se imputa fecha de cierre.",
      tipoFallo: "normalizacion",
    },
    {
      id: "V-45126",
      fechaFallo: "2025-11-25",
      campoCritico: "categoria_vacante",
      valorReportado: null,
      valorCorregido: "Recursos Humanos",
      motivoAccion:
        "Imputado por IA (Clasificación CUOC). Inferido desde el título y descripción.",
      tipoFallo: "missing",
    },
    {
      id: "V-45127",
      fechaFallo: "2025-11-25",
      campoCritico: "jornada_laboral",
      valorReportado: "MEDIO TIEMPO",
      valorCorregido: "Medio Tiempo",
      motivoAccion:
        "Normalización de Formato. Se aplica regla de capitalización.",
      tipoFallo: "normalizacion",
    },
  ];

  // Datos para estadísticas de curación
  const estadisticasCuracion = {
    registrosRevisados: 145300,
    registrosCorregidos: 68200,
    registrosEliminados: 4100,
    tiempoPromedioPorRegistro: "2.3 min",
    tasaExito: 94.7,
  };

  // Métodos de imputación disponibles
  const metodosImputacion = [
    { value: "media", label: "Media Aritmética" },
    { value: "moda", label: "Moda (Valor más frecuente)" },
    { value: "mediana", label: "Mediana" },
    { value: "forward_fill", label: "Forward Fill (Último valor conocido)" },
    { value: "ia", label: "Imputación por IA (CUOC)" },
    { value: "custom", label: "Valor Personalizado" },
  ];

  const getTipoFalloBadge = (tipo: string) => {
    switch (tipo) {
      case "normalizacion":
        return (
          <Badge className="bg-red-100 text-red-800 text-xs">
            Normalización
          </Badge>
        );
      case "integracion":
        return (
          <Badge className="bg-orange-100 text-orange-800 text-xs">
            Integración
          </Badge>
        );
      case "missing":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 text-xs">
            Missing Value
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 text-xs">Otro</Badge>
        );
    }
  };

  const handleInputChange = (id: string, value: string) => {
    setRegistrosEditados({
      ...registrosEditados,
      [id]: value,
    });
  };

  const handleGuardarCambios = () => {
    console.log("Cambios guardados:", registrosEditados);
    // Aquí iría la lógica para guardar en el backend
  };

  const handleAplicarImputacion = () => {
    console.log("Aplicando método de imputación:", metodoImputacion);
    // Aquí iría la lógica para aplicar la imputación automática
  };

  return (
    <div className="p-6 space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: "#01033e" }}>
          4. Alistamiento y Curación Manual
        </h1>
        <p className="text-sm text-gray-600">
          Edición manual de registros atípicos e imputación de datos faltantes
        </p>
      </div>

      {/* Dashboard de Fallos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {dashboardFallos.map((item, index) => (
          <Card
            key={index}
            className={`${item.bgColor} border-l-4 ${item.borderColor}`}
          >
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  {item.titulo}
                </p>
                <p className={`text-3xl font-bold ${item.color}`}>
                  {item.valor.toLocaleString()}
                </p>
                <p className="text-xs text-gray-600">{item.detalle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Grid Principal: Tabla de Edición + Panel de Imputación */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* COLUMNA IZQUIERDA: Tabla de Edición + Log de Modificaciones (3/4) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tabla de Edición Manual */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle style={{ color: "#01033e" }}>
                  Registros con Fallos - Edición Manual
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Recargar
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    size="sm"
                    onClick={handleGuardarCambios}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Cambios
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        ID Reg.
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Fecha Fallo
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Campo Crítico
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Valor Reportado
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Valor Corregido
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Motivo / Acción
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Tipo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {registrosFallos.map((registro) => (
                      <tr key={registro.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {registro.id}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {registro.fechaFallo}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-blue-700">
                          {registro.campoCritico}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {registro.valorReportado ? (
                            <span className="text-red-600 font-medium">
                              {registro.valorReportado}
                            </span>
                          ) : (
                            <span className="text-yellow-600 font-medium">
                              NULL
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            type="text"
                            defaultValue={registro.valorCorregido}
                            onChange={(e) =>
                              handleInputChange(registro.id, e.target.value)
                            }
                            className="h-8 text-sm bg-yellow-50 border-yellow-300"
                          />
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600 max-w-[250px]">
                          {registro.motivoAccion}
                        </td>
                        <td className="px-4 py-3">
                          {getTipoFalloBadge(registro.tipoFallo)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Mostrando 1-5 de {registrosFallos.length} registros
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Anterior
                  </Button>
                  <Button variant="outline" size="sm">
                    Siguiente
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Log de Modificaciones Recientes - AHORA AQUÍ */}
          <Card>
            <CardHeader>
              <CardTitle style={{ color: "#01033e" }}>
                📝 Log de Modificaciones Recientes (Últimas 10)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Fecha/Hora
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        ID Registro
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Campo Modificado
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Antes
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Después
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Usuario
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Método
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      {
                        fecha: "2025-11-25 14:32:15",
                        id: "V-45123",
                        campo: "salario_ofrecido",
                        antes: "$500,000",
                        despues: "$1,300,000",
                        usuario: "Funcionario A.",
                        metodo: "Manual",
                      },
                      {
                        fecha: "2025-11-25 14:30:08",
                        id: "V-45124",
                        campo: "nit_prestador",
                        antes: "900.234.XXX",
                        despues: "900.234.900",
                        usuario: "Funcionario A.",
                        metodo: "Manual",
                      },
                      {
                        fecha: "2025-11-25 14:28:42",
                        id: "V-45126",
                        campo: "categoria_vacante",
                        antes: "NULL",
                        despues: "Recursos Humanos",
                        usuario: "Sistema (IA)",
                        metodo: "Imputación IA",
                      },
                      {
                        fecha: "2025-11-25 14:25:33",
                        id: "V-45127",
                        campo: "jornada_laboral",
                        antes: "MEDIO TIEMPO",
                        despues: "Medio Tiempo",
                        usuario: "Sistema",
                        metodo: "Normalización",
                      },
                      {
                        fecha: "2025-11-25 14:22:17",
                        id: "V-45125",
                        campo: "estado_registro",
                        antes: "Activo",
                        despues: "Eliminado",
                        usuario: "Funcionario A.",
                        metodo: "Manual",
                      },
                    ].map((log, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                          {log.fecha}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {log.id}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-blue-700">
                          {log.campo}
                        </td>
                        <td className="px-4 py-3 text-sm text-red-600">
                          {log.antes}
                        </td>
                        <td className="px-4 py-3 text-sm text-green-600 font-medium">
                          {log.despues}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {log.usuario}
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant={
                              log.metodo === "Manual" ? "default" : "secondary"
                            }
                            className="text-xs"
                          >
                            {log.metodo}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* COLUMNA DERECHA: Panel Lateral (1/4) */}
        <div className="space-y-6">
          {/* Panel de Imputación Automática */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-base text-blue-900">
                🤖 Imputación Automática
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-2 block">
                  Método de Imputación:
                </label>
                <Select
                  value={metodoImputacion}
                  onValueChange={setMetodoImputacion}
                >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Seleccionar método..." />
                  </SelectTrigger>
                  <SelectContent>
                    {metodosImputacion.map((metodo) => (
                      <SelectItem key={metodo.value} value={metodo.value}>
                        {metodo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="p-3 bg-white rounded border border-blue-200">
                <p className="text-xs text-gray-700 mb-2">
                  <strong>Campos afectados:</strong>
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    salario_ofrecido
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    categoria_vacante
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    jornada_laboral
                  </Badge>
                </div>
              </div>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleAplicarImputacion}
                disabled={!metodoImputacion}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Aplicar Imputación
              </Button>

              <div className="text-xs text-gray-600 space-y-1 pt-2 border-t">
                <p>
                  💡 <strong>Tip:</strong> La imputación por IA usa el modelo
                  CUOC entrenado para inferir valores faltantes.
                </p>
                <p>
                  ⚠️ Los cambios se aplicarán a todos los registros con Missing
                  Values en los campos seleccionados.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas de Curación */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base" style={{ color: "#01033e" }}>
                📊 Estadísticas de Curación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <p className="text-xs font-medium text-gray-700">
                    Registros Revisados
                  </p>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {estadisticasCuracion.registrosRevisados.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <Save className="w-4 h-4 text-blue-600" />
                  <p className="text-xs font-medium text-gray-700">
                    Registros Corregidos
                  </p>
                </div>
                <p className="text-lg font-bold text-blue-700">
                  {estadisticasCuracion.registrosCorregidos.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <p className="text-xs font-medium text-gray-700">
                    Registros Eliminados
                  </p>
                </div>
                <p className="text-lg font-bold text-red-700">
                  {estadisticasCuracion.registrosEliminados.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <p className="text-xs font-medium text-gray-700">
                    Tiempo Promedio
                  </p>
                </div>
                <p className="text-lg font-bold text-purple-700">
                  {estadisticasCuracion.tiempoPromedioPorRegistro}
                </p>
              </div>

              <div className="pt-3 border-t">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-gray-700">
                    Tasa de Éxito
                  </p>
                  <p className="text-xl font-bold text-green-700">
                    {estadisticasCuracion.tasaExito}%
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${estadisticasCuracion.tasaExito}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acciones Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base" style={{ color: "#01033e" }}>
                Acciones Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Exportar Log de Cambios
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Ver Registros Críticos
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <RefreshCw className="w-4 h-4 mr-2" />
                Revertir Cambios
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
