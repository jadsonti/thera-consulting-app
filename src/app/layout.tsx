import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Cabecalho from "../components/layout/Cabecalho";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gerenciador de Produtos",
  description: "Aplicação para gerenciamento de produtos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-100 min-h-screen`}>
        <Cabecalho />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
