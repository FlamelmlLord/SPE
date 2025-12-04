
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  Database,
  CheckCircle,
  GitMerge,
  FileEdit,
  Shield,
  Users,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const navigationItems = [
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
    title: 'Usuarios',
    href: '/dashboard/usuarios',
    icon: Users,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 flex flex-col"
      style={{ backgroundColor: '#01033e' }}
    >
      {/* Header con Logo */}
      <div className="p-6 flex flex-col items-center gap-3">
        <div className="relative w-40 h-16">
          <Image
            src="/images/logo-servicio-de-empleo-blanco.png"
            alt="Servicio Público de Empleo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h2 className="text-white text-center text-sm font-semibold">
          Sistema de Calidad de Datos
        </h2>
      </div>

      <Separator className="bg-white/20" />

      {/* Navegación */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-white/20" />

      {/* Usuario y Cerrar Sesión */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-semibold">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin</p>
            <p className="text-xs text-white/60 truncate">Administrador</p>
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
          onClick={() => {
            // TODO: Implementar logout
            window.location.href = '/auth/login';
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
    </aside>
  );
}