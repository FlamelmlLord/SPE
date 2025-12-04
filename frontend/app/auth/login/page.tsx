import { LoginForm } from "@/components/forms/login-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-none">
        <CardHeader className="space-y-6 text-center pb-4">
          {/* Logo SPE */}
          <div className="flex justify-center">
            <div className="relative w-48 h-24">
              <Image
                src="/images/logo-servicio-de-empleo.png"
                alt="Servicio Público de Empleo"
                fill
                className="object-contain drop-shadow-lg"
                priority
                />
            </div>
            </div>

          {/* Título */}
          <div className="space-y-2">
            <h1
              className="text-2xl font-bold leading-tight"
              style={{ color: "#01033e" }}
            >
              Acceso al Sistema de Calidad de Datos
            </h1>
            <p className="text-sm text-gray-600">
              Ingrese sus credenciales para continuar
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
