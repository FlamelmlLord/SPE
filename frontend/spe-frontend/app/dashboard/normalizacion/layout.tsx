import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Normalización",
};

export default function NormalizacionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
