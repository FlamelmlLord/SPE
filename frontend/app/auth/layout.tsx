import Image from 'next/image';
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | SPE - Sistema de Calidad de Datos",
    default: "SPE - Sistema de Calidad de Datos",
  },
  description: "Sistema de Calidad de Datos - Servicio Público de Empleo",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Imagen de fondo */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/fondo login.png"
              alt="Fondo Login SPE"
              fill
              priority
              className="object-cover"
              quality={100}
            />
            {/* Overlay oscuro para mejorar legibilidad */}
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Contenido (formulario de login) */}
          <div className="relative z-10 w-full px-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}