import { Sidebar } from '@/components/layout/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Fijo */}
      <Sidebar />

      {/* Contenido Principal */}
      <main className="flex-1 ml-64 overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}