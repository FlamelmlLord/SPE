import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integración",
};

export default function IntegracionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}