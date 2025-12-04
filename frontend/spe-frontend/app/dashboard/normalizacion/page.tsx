'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Editor from '@monaco-editor/react';

// Tipos para las reglas
interface Regla {
  id: string;
  nombre: string;
  campo: string;
  tipo: 'Técnica' | 'Negocio' | 'Codificación';
  logica: string;
  impacto: number | null;
  estado: 'activa' | 'inactiva';
  descripcion?: string;
  valorReferencia?: string;
  codigoPython?: string; // para código personalizado
}

export default function NormalizacionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reglaEditando, setReglaEditando] = useState<Regla | null>(null);
  const [modoAvanzado, setModoAvanzado] = useState(false);
  const [codigoPython, setCodigoPython] = useState('');

  // Código Python de ejemplo por defecto
  const codigoDefaultPython = `def validar_registro(registro):
    """
    Función de validación personalizada.
    
    Args:
        registro (dict): Diccionario con los campos del registro
        
    Returns:
        bool: True si el registro es válido, False en caso contrario
    """
    # Ejemplo: Validar que el salario esté entre 1.300.000 y 10.000.000
    salario = registro.get('salario_ofrecido', 0)
    
    if salario < 1_300_000:
        return False, "Salario por debajo del mínimo legal"
    
    if salario > 10_000_000:
        return False, "Salario sospechosamente alto"
    
    # Ejemplo: Validar formato de NIT
    nit = registro.get('nit_prestador', '')
    if not nit or len(nit) < 9:
        return False, "NIT inválido"
    
    return True, "Registro válido"
`;

  // Datos de ejemplo para las reglas
  const reglasActivas: Regla[] = [
    {
      id: '1',
      nombre: 'Validación NIT DIAN',
      campo: 'nit_prestador',
      tipo: 'Técnica',
      logica: 'Dígito de Verificación (DV)',
      impacto: 99.9,
      estado: 'activa',
      descripcion: 'Valida el dígito de verificación del NIT según algoritmo DIAN',
      valorReferencia: 'N/A (Cálculo automático)',
    },
    {
      id: '2',
      nombre: 'Salario Mínimo',
      campo: 'salario_ofrecido',
      tipo: 'Negocio',
      logica: '>= $1,300,000',
      impacto: 85.2,
      estado: 'activa',
      descripcion: 'Verifica que el salario sea igual o superior al mínimo legal vigente',
      valorReferencia: '1300000',
    },
    {
      id: '3',
      nombre: 'Validación Personalizada - Rango Salarial',
      campo: 'salario_ofrecido',
      tipo: 'Técnica',
      logica: 'Código Python',
      impacto: 95.5,
      estado: 'activa',
      descripcion: 'Validación compleja usando código Python personalizado',
      valorReferencia: 'Ver código',
      codigoPython: codigoDefaultPython,
    },
    {
      id: '4',
      nombre: 'Estandarización de Ciudad',
      campo: 'nom_ciudad',
      tipo: 'Codificación',
      logica: 'Mapeo (BOGT → BOGOTA)',
      impacto: null,
      estado: 'inactiva',
      descripcion: 'Normaliza abreviaturas de ciudades a nombres oficiales',
      valorReferencia: 'Tabla de mapeo',
    },
    {
      id: '5',
      nombre: 'Antigüedad Vacante',
      campo: 'fecha_creacion',
      tipo: 'Negocio',
      logica: '<= 60 días',
      impacto: 92.1,
      estado: 'activa',
      descripcion: 'Rechaza vacantes con más de 60 días de antigüedad',
      valorReferencia: '60',
    },
  ];

  // Datos de ejemplo para métricas de cumplimiento
  const metricasCumplimiento = [
    { regla: 'Validación NIT DIAN', cumplimiento: 99.9 },
    { regla: 'Salario Mínimo', cumplimiento: 85.2 },
    { regla: 'Validación Personalizada', cumplimiento: 95.5 },
    { regla: 'Antigüedad Vacante', cumplimiento: 92.1 },
  ];

  // Handlers
  const handleCrearRegla = () => {
    setReglaEditando(null);
    setCodigoPython(codigoDefaultPython);
    setModoAvanzado(false);
    setIsModalOpen(true);
  };

  const handleEditarRegla = (regla: Regla) => {
    setReglaEditando(regla);
    setCodigoPython(regla.codigoPython || codigoDefaultPython);
    setModoAvanzado(!!regla.codigoPython);
    setIsModalOpen(true);
  };

  const handleGuardarRegla = () => {
    // Aquí iría la lógica de guardado
    const reglaFinal = {
      ...reglaEditando,
      codigoPython: modoAvanzado ? codigoPython : undefined,
    };
    console.log('Guardando regla:', reglaFinal);
    setIsModalOpen(false);
    setReglaEditando(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#01033e' }}>
          2. Normalización y Validación de Datos
        </h1>
        <p className="text-sm text-gray-600">
          Motor de Reglas - Gestión y ejecución de validaciones técnicas y de negocio
        </p>
      </div>

      {/* Grid Principal: Tabla de Reglas + Panel Lateral */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tabla de Reglas (2/3 del ancho) */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold" style={{ color: '#01033e' }}>
                Reglas de Validación Activas (Vacantes)
              </h3>
              
              {/* Modal de Crear/Editar Regla */}
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button 
                    onClick={handleCrearRegla}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    + Crear Nueva Regla
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle style={{ color: '#01033e' }}>
                      {reglaEditando ? `Editar Regla: ${reglaEditando.nombre}` : 'Crear Nueva Regla'}
                    </DialogTitle>
                  </DialogHeader>
                  
                  {/* Tabs: Modo Simple vs Modo Avanzado */}
                  <Tabs defaultValue={modoAvanzado ? "avanzado" : "simple"} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="simple" onClick={() => setModoAvanzado(false)}>
                        Modo Simple
                      </TabsTrigger>
                      <TabsTrigger value="avanzado" onClick={() => setModoAvanzado(true)}>
                        Modo Avanzado (Python)
                      </TabsTrigger>
                    </TabsList>

                    {/* TAB 1: Modo Simple */}
                    <TabsContent value="simple" className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre de la Regla *
                        </label>
                        <input
                          type="text"
                          defaultValue={reglaEditando?.nombre || ''}
                          placeholder="Ej: Validación NIT DIAN"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Descripción
                        </label>
                        <textarea
                          defaultValue={reglaEditando?.descripcion || ''}
                          placeholder="Describe el propósito de esta regla..."
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Campo a Aplicar *
                          </label>
                          <select 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            defaultValue={reglaEditando?.campo || ''}
                          >
                            <option value="">Seleccionar campo</option>
                            <option value="nit_prestador">nit_prestador</option>
                            <option value="salario_ofrecido">salario_ofrecido</option>
                            <option value="fecha_creacion">fecha_creacion</option>
                            <option value="nom_ciudad">nom_ciudad</option>
                            <option value="tipo_contrato">tipo_contrato</option>
                            <option value="nivel_educacion">nivel_educacion</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de Regla *
                          </label>
                          <select 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            defaultValue={reglaEditando?.tipo || ''}
                          >
                            <option value="">Seleccionar tipo</option>
                            <option value="Técnica">Técnica</option>
                            <option value="Negocio">Negocio</option>
                            <option value="Codificación">Codificación</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Lógica de Validación *
                        </label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          defaultValue={reglaEditando?.logica || ''}
                        >
                          <option value="">Seleccionar operador</option>
                          <option value="<">&lt; (Menor que)</option>
                          <option value=">">&gt; (Mayor que)</option>
                          <option value="<=">&lt;= (Menor o igual)</option>
                          <option value=">=">&gt;= (Mayor o igual)</option>
                          <option value="=">=  (Igual a)</option>
                          <option value="!=">!= (Diferente de)</option>
                          <option value="Dígito de Verificación (DV)">Dígito de Verificación (DV)</option>
                          <option value="Mapeo">Mapeo (Tabla de equivalencias)</option>
                          <option value="Regex">Expresión Regular (Regex)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Valor de Referencia
                        </label>
                        <input
                          type="text"
                          defaultValue={reglaEditando?.valorReferencia || ''}
                          placeholder="Ej: 1300000, 60, N/A"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Deja en blanco si la regla no requiere un valor específico
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="regla-activa"
                          defaultChecked={reglaEditando?.estado === 'activa'}
                          className="w-4 h-4"
                        />
                        <label htmlFor="regla-activa" className="text-sm font-medium text-gray-700">
                          Activar regla inmediatamente
                        </label>
                      </div>
                    </TabsContent>

                    {/* TAB 2: Modo Avanzado (Python) */}
                    <TabsContent value="avanzado" className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre de la Regla *
                        </label>
                        <input
                          type="text"
                          defaultValue={reglaEditando?.nombre || ''}
                          placeholder="Ej: Validación Compleja de Salario"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Descripción
                        </label>
                        <textarea
                          defaultValue={reglaEditando?.descripcion || ''}
                          placeholder="Describe el propósito de esta regla personalizada..."
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Código Python de Validación *
                        </label>
                        <div className="border border-gray-300 rounded-md overflow-hidden">
                          <Editor
                            height="400px"
                            defaultLanguage="python"
                            value={codigoPython}
                            onChange={(value) => setCodigoPython(value || '')}
                            theme="vs-dark"
                            options={{
                              minimap: { enabled: false },
                              fontSize: 13,
                              lineNumbers: 'on',
                              roundedSelection: false,
                              scrollBeyondLastLine: false,
                              readOnly: false,
                              automaticLayout: true,
                            }}
                          />
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          💡 <strong>Instrucciones:</strong> La función debe llamarse <code className="bg-gray-100 px-1 rounded">validar_registro(registro)</code> 
                          y retornar una tupla <code className="bg-gray-100 px-1 rounded">(bool, str)</code> con el resultado y mensaje.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de Regla *
                          </label>
                          <select 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            defaultValue="Técnica"
                          >
                            <option value="Técnica">Técnica</option>
                            <option value="Negocio">Negocio</option>
                            <option value="Codificación">Codificación</option>
                          </select>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="regla-activa-avanzado"
                            defaultChecked={reglaEditando?.estado === 'activa'}
                            className="w-4 h-4"
                          />
                          <label htmlFor="regla-activa-avanzado" className="text-sm font-medium text-gray-700">
                            Activar regla inmediatamente
                          </label>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Botones de acción */}
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleGuardarRegla}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {reglaEditando ? 'Actualizar Regla' : 'Crear Regla'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Tabla de Reglas */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Nombre Regla
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Campo Aplicado
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Tipo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Lógica
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Impacto (%)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Estado
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reglasActivas.map((regla) => (
                  <tr key={regla.id}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {regla.nombre}
                      {regla.codigoPython && (
                        <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                          Python
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {regla.campo}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        regla.tipo === 'Técnica' 
                          ? 'bg-blue-100 text-blue-800'
                          : regla.tipo === 'Negocio'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {regla.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {regla.logica}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                      {regla.impacto ? `${regla.impacto}%` : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        regla.estado === 'activa'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {regla.estado === 'activa' ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button 
                        onClick={() => handleEditarRegla(regla)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        Editar
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Botón de Ejecución */}
          <div className="p-6 bg-yellow-50 border-t border-gray-200">
            <button className="w-full px-6 py-4 bg-yellow-500 text-gray-900 rounded-md hover:bg-yellow-600 font-bold text-lg">
              ⚡ APLICAR TODAS LAS REGLAS DE NORMALIZACIÓN
            </button>
          </div>
        </div>

        {/* Panel Lateral ENRIQUECIDO (1/3 del ancho) */}
        <div className="space-y-6">
          
          {/* Resumen de Reglas */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#01033e' }}>
              Resumen de Reglas
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                <div>
                  <p className="text-sm font-medium text-gray-700">Reglas Activas</p>
                  <p className="text-2xl font-bold text-blue-700">4</p>
                </div>
                <div className="text-3xl">✓</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="text-sm font-medium text-gray-700">Reglas Inactivas</p>
                  <p className="text-2xl font-bold text-gray-700">1</p>
                </div>
                <div className="text-3xl">⊘</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                <div>
                  <p className="text-sm font-medium text-gray-700">Reglas Python</p>
                  <p className="text-2xl font-bold text-purple-700">1</p>
                </div>
                <div className="text-3xl">🐍</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                <div>
                  <p className="text-sm font-medium text-gray-700">Cumplimiento Promedio</p>
                  <p className="text-2xl font-bold text-green-700">95.7%</p>
                </div>
                <div className="text-3xl">📊</div>
              </div>
            </div>
          </div>

          {/* Métricas de Cumplimiento */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#01033e' }}>
              Métricas de Cumplimiento
            </h3>
            <p className="text-xs text-gray-600 mb-4">Última Ejecución: Hoy, 10:45 AM</p>

            <div className="space-y-4">
              {metricasCumplimiento.map((metrica, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900">
                      {metrica.regla}
                    </p>
                    <p className="text-sm font-bold text-green-600">
                      {metrica.cumplimiento}% OK
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="flex h-full">
                      <div 
                        className="bg-green-500"
                        style={{ width: `${metrica.cumplimiento}%` }}
                      />
                      <div 
                        className="bg-red-500"
                        style={{ width: `${100 - metrica.cumplimiento}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guía Rápida */}
          <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-sm font-semibold mb-2 text-blue-900">
              💡 Guía Rápida
            </h3>
            <ul className="text-xs text-blue-800 space-y-2">
              <li>• <strong>Modo Simple:</strong> Validaciones básicas no-code</li>
              <li>• <strong>Modo Avanzado:</strong> Lógica personalizada en Python</li>
              <li>• <strong>Técnica:</strong> Validaciones de formato y estructura</li>
              <li>• <strong>Negocio:</strong> Reglas de lógica empresarial</li>
              <li>• <strong>Codificación:</strong> Normalización de valores</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}