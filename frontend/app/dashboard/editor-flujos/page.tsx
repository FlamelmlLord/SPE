'use client';

import { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CustomNode } from '@/components/flow/custom-node';
import { NodesPanel } from '@/components/flow/nodes-panel';
import { PropertiesPanel } from '@/components/flow/properties-panel';
import { useFlowStore } from '@/lib/store/flow-store';
import {
  Play,
  Save,
  RotateCcw,
  Download,
  Info,
} from 'lucide-react';

const nodeTypes = {
  custom: CustomNode,
};

export default function EditorFlujosPage() {
  const {
    nodes,
    edges,
    selectedNodeId,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    removeNode,
    updateNode,
    setSelectedNode,
    resetFlow,
  } = useFlowStore();

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: any) => {
      setSelectedNode(node.id);
    },
    [setSelectedNode]
  );

  const handleAddNode = useCallback(
    (template: any) => {
      const newNode = {
        id: `${Date.now()}`,
        type: 'custom',
        data: {
          label: template.label,
          description: template.description,
          status: 'pendiente' as const,
          registros: 0,
        },
        position: {
          x: Math.random() * 400 + 100,
          y: Math.random() * 400 + 100,
        },
      };
      addNode(newNode);
    },
    [addNode]
  );

  const handleExecuteFlow = async () => {
    console.log('Ejecutando flujo...');
    // Aquí iría la lógica de ejecución
  };

  const handleExportFlow = () => {
    const flowData = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([flowData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flujo-spe.json';
    a.click();
  };

  const handleSaveFlow = () => {
    console.log('Guardando flujo...', { nodes, edges });
    // Aquí iría la lógica para guardar en el backend
  };

  return (
    <div className="h-screen flex flex-col p-6 gap-4">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: '#01033e' }}>
            Editor de Flujos / Pipelines
          </h1>
          <p className="text-sm text-gray-600">
            Diseña visualmente el flujo de procesamiento de datos del SPE
          </p>
        </div>

        {/* Acciones Principales */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetFlow}
            title="Restablecer flujo"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Restablecer
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportFlow}
            title="Exportar como JSON"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveFlow}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </Button>
          <Button
            size="sm"
            onClick={handleExecuteFlow}
            className="bg-green-600 hover:bg-green-700"
          >
            <Play className="w-4 h-4 mr-2" />
            Ejecutar Flujo
          </Button>
        </div>
      </div>

      {/* Información del Flujo */}
      <Card className="p-3 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-2">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-blue-800">
            <strong>💡 Instrucciones:</strong> Arrastra nodos desde el panel izquierdo al canvas.
            Conecta nodos haciendo clic en los puntos azules. Selecciona un nodo para editar sus propiedades.
          </div>
        </div>
      </Card>

      {/* Grid Principal: Panel Izquierdo + Canvas + Panel Derecho */}
      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        {/* Panel Izquierdo: Nodos Disponibles */}
        <div className="col-span-2 overflow-y-auto overflow-x-hidden">
          <NodesPanel onAddNode={handleAddNode} />
        </div>

        {/* Canvas Central: ReactFlow */}
        <div className="col-span-8 bg-gray-50 rounded-lg border-2 border-gray-200">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
            defaultEdgeOptions={{
              type: 'smoothstep',
              animated: true,
              style: { strokeWidth: 2 },
            }}
          >
            <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#e5e7eb" />
            <Controls />
            <MiniMap
              nodeColor={(node) => {
                switch (node.data.status) {
                  case 'completado':
                    return '#22c55e';
                  case 'en_proceso':
                    return '#3b82f6';
                  case 'error':
                    return '#ef4444';
                  default:
                    return '#9ca3af';
                }
              }}
              style={{ backgroundColor: '#f9fafb' }}
            />
          </ReactFlow>
        </div>

        {/* Panel Derecho: Propiedades del Nodo */}
        <div className="col-span-2 overflow-y-auto overflow-x-hidden">
          <PropertiesPanel
            nodeId={selectedNodeId}
            nodeData={selectedNode?.data || null}
            onUpdateNode={updateNode}
            onRemoveNode={removeNode}
          />
        </div>
      </div>
    </div>
  );
}