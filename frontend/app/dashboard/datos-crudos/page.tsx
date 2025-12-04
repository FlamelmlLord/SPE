import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datos Crudos",
};

export default function DatosCrudosPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#01033e' }}>
          1. Ingesta y Tratamiento de Datos Crudos
        </h1>
        <p className="text-sm text-gray-600">
          Carga, análisis y tratamiento de duplicidad en datos originales
        </p>
      </div>

      {/* Panel de Ingesta */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-bold text-gray-900">
              Último Archivo Cargado: <span className="text-blue-600">Vacantes_Nov_2025.csv</span> (875,420 registros)
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Entidad: Vacantes | Fecha: 2025-11-24 | Estado: Duplicidad Analizada
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              className="px-4 py-2 border border-gray-300 rounded-md"
              defaultValue="Vacantes"
            >
              <option value="">Seleccionar Entidad</option>
              <option value="Vacantes">Vacantes</option>
              <option value="Personas">Personas</option>
            </select>
            <input type="file" className="hidden" id="upload-file" />
            <label
              htmlFor="upload-file"
              className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700"
            >
              Cargar Archivo
            </label>
          </div>
        </div>
      </div>

      {/* Grid de Métricas y Acciones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Métricas de Calidad */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#01033e' }}>
            Métricas de Calidad
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded">
              <div>
                <p className="text-sm font-medium text-gray-700">Registros Únicos</p>
                <p className="text-2xl font-bold text-green-700">763,366</p>
              </div>
              <div className="text-4xl">✓</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded">
              <div>
                <p className="text-sm font-medium text-gray-700">Registros Duplicados</p>
                <p className="text-2xl font-bold text-red-700">112,054</p>
              </div>
              <div className="text-4xl">⚠</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded">
              <div>
                <p className="text-sm font-medium text-gray-700">% Duplicidad</p>
                <p className="text-2xl font-bold text-blue-700">12.8%</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>
        </div>

        {/* Acciones Automáticas */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#01033e' }}>
            Acciones Automáticas de Calidad
          </h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
              🗑️ ELIMINAR DUPLICADOS (Conservar más reciente)
            </button>
            <button className="w-full px-4 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium">
              🔍 SEGMENTAR POR DNI/NIT VÁLIDO
            </button>
            <button className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium">
              ✅ MARCAR COMO VALIDADOS
            </button>
          </div>

          {/* Log de Sesión */}
          <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Log de Sesión</h4>
            <div className="space-y-1 text-xs text-gray-600">
              <p>✓ 2025-11-24 10:15:32 - Carga completada: 875,420 registros</p>
              <p>✓ 2025-11-24 10:16:01 - Análisis de duplicidad: 12.8%</p>
              <p>⚠ 2025-11-24 10:16:15 - Detectados 112,054 duplicados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Registros (Simulación) */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold" style={{ color: '#01033e' }}>
              Registros Crudos (Primeros 10)
            </h3>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Buscar..."
                className="px-4 py-2 border border-gray-300 rounded-md"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Exportar CSV
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Entidad</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">DNI/NIT</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Salario</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Fecha</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Duplicado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { id: '1234567-A', entidad: 'Vacantes', nit: '900888777', salario: '$1,500,000', fecha: '2025-11-20', duplicado: 'Sí (ID 1234567-B)', isDuplicate: true },
                { id: '1234567-B', entidad: 'Vacantes', nit: '900888777', salario: '$1,500,000', fecha: '2025-11-20', duplicado: 'Sí (ID 1234567-A)', isDuplicate: true },
                { id: '1234568-U', entidad: 'Vacantes', nit: '800999000', salario: '$2,200,000', fecha: '2025-11-19', duplicado: 'No', isDuplicate: false },
                { id: '1234569-U', entidad: 'Vacantes', nit: '700111222', salario: '$1,800,000', fecha: '2025-11-18', duplicado: 'No', isDuplicate: false },
                { id: '1234570-U', entidad: 'Vacantes', nit: '600333444', salario: '$3,000,000', fecha: '2025-11-17', duplicado: 'No', isDuplicate: false },
              ].map((row, index) => (
                <tr key={index} className={row.isDuplicate ? 'bg-red-50' : ''}>
                  <td className="px-4 py-3">
                    <input type="checkbox" defaultChecked={row.isDuplicate} />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{row.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{row.entidad}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{row.nit}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{row.salario}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{row.fecha}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.isDuplicate ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {row.duplicado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}