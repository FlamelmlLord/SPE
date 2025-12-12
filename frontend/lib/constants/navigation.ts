import {
  LayoutDashboard,
  Database,
  CheckCircle,
  GitMerge,
  FileEdit,
  Shield,
  Workflow,
  Users,
} from 'lucide-react';

export const navigationItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: '1. Datos Crudos',
    href: '/dashboard/datos-crudos',
    icon: Database,
  },
  {
    title: '2. Normalización',
    href: '/dashboard/normalizacion',
    icon: CheckCircle,
  },
  {
    title: '3. Integración',
    href: '/dashboard/integracion',
    icon: GitMerge,
  },
  {
    title: '4. Alistamiento',
    href: '/dashboard/alistamiento',
    icon: FileEdit,
  },
  {
    title: '5. Anonimización',
    href: '/dashboard/anonimizacion',
    icon: Shield,
  },
  {
    title: 'Editor de Flujos',
    href: '/dashboard/editor-flujos',
    icon: Workflow,
  },
  {
    title: 'Usuarios',
    href: '/dashboard/usuarios',
    icon: Users,
  },
];