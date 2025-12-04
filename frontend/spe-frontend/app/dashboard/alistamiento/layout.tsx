import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alistamiento",
};

export default function AlistamientoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}