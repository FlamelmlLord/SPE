export type NodeStatus = 'completado' | 'en_proceso' | 'pendiente' | 'error';

export interface FlowNodeData {
  label: string;
  description: string;
  status: NodeStatus;
  registros: number;
  duracion?: string;
  errorMessage?: string;
}

export interface FlowMetrics {
  totalNodos: number;
  nodosCompletados: number;
  nodosEnProceso: number;
  nodosPendientes: number;
  nodosConError: number;
  registrosProcesados: number;
}