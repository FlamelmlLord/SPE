import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anonimización",
};

export default function AnonimizacionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
