import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Database, Filter, Link, Edit, Shield, Download } from 'lucide-react';

interface NodeTemplate {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: string;
  description: string;
}

const nodeTemplates: NodeTemplate[] = [
  {
    id: 'carga',
    label: 'Carga de Datos',
    icon: <Database className="w-5 h-5" />,
    type: 'input',
    description: 'Ingesta de archivos CSV/Excel',
  },
  {
    id: 'normalizacion',
    label: 'Normalización',
    icon: <Filter className="w-5 h-5" />,
    type: 'default',
    description: 'Aplicar reglas de validación',
  },
  {
    id: 'integracion',
    label: 'Integración',
    icon: <Link className="w-5 h-5" />,
    type: 'default',
    description: 'Enriquecer con fuentes externas',
  },
  {
    id: 'alistamiento',
    label: 'Alistamiento',
    icon: <Edit className="w-5 h-5" />,
    type: 'default',
    description: 'Curación manual de datos',
  },
  {
    id: 'anonimizacion',
    label: 'Anonimización',
    icon: <Shield className="w-5 h-5" />,
    type: 'default',
    description: 'Protección de datos personales',
  },
  {
    id: 'exportacion',
    label: 'Exportación',
    icon: <Download className="w-5 h-5" />,
    type: 'output',
    description: 'Generar dataset final',
  },
];

interface NodesPanelProps {
  onAddNode: (template: NodeTemplate) => void;
}

export function NodesPanel({ onAddNode }: NodesPanelProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base" style={{ color: '#01033e' }}>
          Nodos Disponibles
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {nodeTemplates.map((template) => (
          <Button
            key={template.id}
            variant="outline"
            className="w-full h-auto py-3 px-3 block"
            onClick={() => onAddNode(template)}
          >
            <div className="flex flex-col gap-2 w-full">
              {/* Fila 1: Ícono + Título + Plus */}
              <div className="flex items-center gap-2 w-full">
                <div className="p-2 bg-blue-50 rounded-md flex-shrink-0">
                  {template.icon}
                </div>
                <p className="font-semibold text-sm flex-1 text-left">
                  {template.label}
                </p>
                <Plus className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </div>

              {/* Fila 2: Descripción con word wrap */}
              <p className="text-xs text-gray-500 text-left leading-tight whitespace-normal break-words pl-11">
                {template.description}
              </p>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}