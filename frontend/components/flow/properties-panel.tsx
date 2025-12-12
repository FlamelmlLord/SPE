import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Save, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { FlowNodeData } from '@/lib/types/flow';

interface PropertiesPanelProps {
  nodeId: string | null;
  nodeData: FlowNodeData | null;
  onUpdateNode: (id: string, data: Partial<FlowNodeData>) => void;
  onRemoveNode: (id: string) => void;
}

export function PropertiesPanel({ nodeId, nodeData, onUpdateNode, onRemoveNode }: PropertiesPanelProps) {
  const [localData, setLocalData] = useState<Partial<FlowNodeData>>(nodeData || {});

  if (!nodeId || !nodeData) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2" style={{ color: '#01033e' }}>
            <AlertCircle className="w-5 h-5" />
            Propiedades del Nodo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm text-gray-500">
              Selecciona un nodo del canvas para ver y editar sus propiedades
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleSave = () => {
    onUpdateNode(nodeId, localData);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base flex items-center justify-between" style={{ color: '#01033e' }}>
          <span>Propiedades del Nodo</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemoveNode(nodeId)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* ID del Nodo */}
        <div>
          <Label className="text-xs font-medium text-gray-500 mb-1 block">ID del Nodo</Label>
          <p className="text-xs text-gray-700 font-mono bg-gray-50 p-2 rounded">{nodeId}</p>
        </div>

        {/* Nombre del Nodo */}
        <div>
          <Label className="text-xs font-medium text-gray-700 mb-2 block">Nombre del Nodo *</Label>
          <Input
            type="text"
            value={localData.label || ''}
            onChange={(e) => setLocalData({ ...localData, label: e.target.value })}
            placeholder="Ej: Carga de Datos"
          />
        </div>

        {/* Descripción */}
        <div>
          <Label className="text-xs font-medium text-gray-700 mb-2 block">Descripción</Label>
          <Input
            type="text"
            value={localData.description || ''}
            onChange={(e) => setLocalData({ ...localData, description: e.target.value })}
            placeholder="Ej: Ingesta desde prestadores"
          />
        </div>

        {/* Estado */}
        <div>
          <Label className="text-xs font-medium text-gray-700 mb-2 block">Estado</Label>
          <Select
            value={localData.status || 'pendiente'}
            onValueChange={(value: any) => setLocalData({ ...localData, status: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completado">Completado</SelectItem>
              <SelectItem value="en_proceso">En Proceso</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Registros */}
        <div>
          <Label className="text-xs font-medium text-gray-700 mb-2 block">Cantidad de Registros</Label>
          <Input
            type="number"
            value={localData.registros || 0}
            onChange={(e) => setLocalData({ ...localData, registros: parseInt(e.target.value) || 0 })}
            placeholder="0"
          />
        </div>

        {/* Duración */}
        <div>
          <Label className="text-xs font-medium text-gray-700 mb-2 block">Duración (opcional)</Label>
          <Input
            type="text"
            value={localData.duracion || ''}
            onChange={(e) => setLocalData({ ...localData, duracion: e.target.value })}
            placeholder="Ej: 5.2 min"
          />
        </div>

        {/* Mensaje de Error (si el estado es error) */}
        {localData.status === 'error' && (
          <div>
            <Label className="text-xs font-medium text-red-700 mb-2 block">Mensaje de Error</Label>
            <Input
              type="text"
              value={localData.errorMessage || ''}
              onChange={(e) => setLocalData({ ...localData, errorMessage: e.target.value })}
              placeholder="Describe el error..."
              className="border-red-300"
            />
          </div>
        )}

        {/* Botón Guardar */}
        <Button className="w-full bg-green-600 hover:bg-green-700 mt-4" onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Guardar Cambios
        </Button>
      </CardContent>
    </Card>
  );
}