import React from "react";

const Rodape: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Gerenciador de Produtos. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Rodape;
