import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, XCircle, Timer } from 'lucide-react';
import { FlowNodeData } from '@/lib/types/flow';

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'completado':
      return {
        icon: <CheckCircle className="w-4 h-4 text-green-600" />,
        badge: <Badge className="bg-green-100 text-green-800 text-xs">Completado</Badge>,
        borderColor: 'border-green-400',
      };
    case 'en_proceso':
      return {
        icon: <Clock className="w-4 h-4 text-blue-600 animate-pulse" />,
        badge: <Badge className="bg-blue-100 text-blue-800 text-xs">En Proceso</Badge>,
        borderColor: 'border-blue-400',
      };
    case 'error':
      return {
        icon: <XCircle className="w-4 h-4 text-red-600" />,
        badge: <Badge className="bg-red-100 text-red-800 text-xs">Error</Badge>,
        borderColor: 'border-red-400',
      };
    default:
      return {
        icon: <AlertCircle className="w-4 h-4 text-gray-400" />,
        badge: <Badge className="bg-gray-100 text-gray-800 text-xs">Pendiente</Badge>,
        borderColor: 'border-gray-300',
      };
  }
};

export const CustomNode = memo(({ data, isConnectable, selected }: NodeProps<FlowNodeData>) => {
  const config = getStatusConfig(data.status);

  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 !bg-blue-500 border-2 border-white"
      />

      <Card
        className={`w-[320px] shadow-lg border-2 transition-all ${
          selected ? 'ring-2 ring-blue-400 ring-offset-2' : ''
        } ${config.borderColor} hover:shadow-xl`}
      >
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 flex-1">
              {config.icon}
              <h3 className="font-bold text-sm leading-tight" style={{ color: '#01033e' }}>
                {data.label}
              </h3>
            </div>
            {config.badge}
          </div>

          {/* Descripción */}
          <p className="text-xs text-gray-600 mb-3 leading-relaxed">{data.description}</p>

          {/* Métricas */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">Registros:</span>
              <span className="font-bold text-blue-700">
                {data.registros ? data.registros.toLocaleString() : '0'}
              </span>
            </div>

            {data.duracion && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium flex items-center gap-1">
                  <Timer className="w-3 h-3" />
                  Duración:
                </span>
                <span className="font-semibold text-gray-700">{data.duracion}</span>
              </div>
            )}

            {data.errorMessage && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                {data.errorMessage}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 !bg-blue-500 border-2 border-white"
      />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';