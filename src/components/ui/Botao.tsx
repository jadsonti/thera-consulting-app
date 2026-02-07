import React from "react";

interface BotaoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: "primario" | "secundario" | "perigo";
  tamanho?: "sm" | "md" | "lg";
}

const Botao: React.FC<BotaoProps> = ({
  variante = "primario",
  tamanho = "md",
  children,
  className = "",
  ...props
}) => {
  const estilosBase =
    "font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const estilosVariante = {
    primario: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secundario:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    perigo: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };
  const estilosTamanho = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${estilosBase} ${estilosVariante[variante]} ${estilosTamanho[tamanho]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Botao;
