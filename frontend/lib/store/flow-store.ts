import { create } from 'zustand';
import { Node, Edge, addEdge, Connection, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from 'reactflow';
import { FlowNodeData, FlowMetrics } from '@/lib/types/flow';

interface FlowState {
  nodes: Node<FlowNodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: Node<FlowNodeData>) => void;
  removeNode: (id: string) => void;
  updateNode: (id: string, data: Partial<FlowNodeData>) => void;
  setSelectedNode: (id: string | null) => void;
  resetFlow: () => void;
  getMetrics: () => FlowMetrics;
  executeFlow: () => Promise<void>;
}

const initialNodes: Node<FlowNodeData>[] = [
  {
    id: '1',
    type: 'custom',
    data: {
      label: '📥 Carga de Datos Crudos',
      description: 'Ingesta desde prestadores (CSV/Excel)',
      status: 'completado',
      registros: 875420,
      duracion: '2.3 min',
    },
    position: { x: 250, y: 50 },
  },
  {
    id: '2',
    type: 'custom',
    data: {
      label: '🔍 Normalización',
      description: 'Validación de reglas técnicas y negocio',
      status: 'completado',
      registros: 744107,
      duracion: '5.1 min',
    },
    position: { x: 250, y: 200 },
  },
  {
    id: '3',
    type: 'custom',
    data: {
      label: '🔗 Integración',
      description: 'Enriquecimiento con RUES, DANE, DIAN',
      status: 'en_proceso',
      registros: 525252,
      duracion: '12.7 min',
    },
    position: { x: 250, y: 350 },
  },
  {
    id: '4',
    type: 'custom',
    data: {
      label: '✏️ Alistamiento',
      description: 'Edición manual y curación',
      status: 'pendiente',
      registros: 0,
    },
    position: { x: 250, y: 500 },
  },
  {
    id: '5',
    type: 'custom',
    data: {
      label: '🔒 Anonimización',
      description: 'Protección de datos personales (K-Anonimato)',
      status: 'pendiente',
      registros: 0,
    },
    position: { x: 250, y: 650 },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    label: '744K registros',
    type: 'smoothstep',
    style: { stroke: '#10b981', strokeWidth: 2 },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    animated: true,
    label: '525K registros',
    type: 'smoothstep',
    style: { stroke: '#3b82f6', strokeWidth: 2 },
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: false,
    label: 'Pendiente',
    type: 'smoothstep',
    style: { stroke: '#9ca3af', strokeWidth: 2, strokeDasharray: '5,5' },
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    animated: false,
    label: 'Pendiente',
    type: 'smoothstep',
    style: { stroke: '#9ca3af', strokeWidth: 2, strokeDasharray: '5,5' },
  },
];

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  selectedNodeId: null,

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#3b82f6', strokeWidth: 2 },
        },
        get().edges
      ),
    });
  },

  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },

  removeNode: (id) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== id),
      edges: get().edges.filter((edge) => edge.source !== id && edge.target !== id),
      selectedNodeId: get().selectedNodeId === id ? null : get().selectedNodeId,
    });
  },

  updateNode: (id, data) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },

  setSelectedNode: (id) => {
    set({ selectedNodeId: id });
  },

  resetFlow: () => {
    set({
      nodes: initialNodes,
      edges: initialEdges,
      selectedNodeId: null,
    });
  },

  getMetrics: () => {
    const nodes = get().nodes;
    return {
      totalNodos: nodes.length,
      nodosCompletados: nodes.filter((n) => n.data.status === 'completado').length,
      nodosEnProceso: nodes.filter((n) => n.data.status === 'en_proceso').length,
      nodosPendientes: nodes.filter((n) => n.data.status === 'pendiente').length,
      nodosConError: nodes.filter((n) => n.data.status === 'error').length,
      registrosProcesados: nodes.reduce((acc, n) => acc + (n.data.registros || 0), 0),
    };
  },

  executeFlow: async () => {
    const nodes = get().nodes;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.data.status === 'pendiente') {
        // Simular ejecución
        get().updateNode(node.id, { status: 'en_proceso' });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        get().updateNode(node.id, {
          status: 'completado',
          registros: Math.floor(Math.random() * 500000),
          duracion: `${(Math.random() * 10).toFixed(1)} min`,
        });
      }
    }
  },
}));