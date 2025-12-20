import Image from 'next/image';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión | SPE",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/fondo login.png"
          alt="Fondo Login SPE"
          fill
          priority
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 w-full px-4">
        {children}
      </div>
    </div>
  );
}