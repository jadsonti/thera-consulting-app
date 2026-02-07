import React from "react";
import Link from "next/link";

const Cabecalho: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            🛒 Gerenciador de Produtos
          </Link>
          <nav>
            <Link href="/" className="hover:text-blue-200 transition-colors">
              Produtos
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Cabecalho;
