import React, { forwardRef } from "react";

interface CampoTextoProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rotulo?: string;
  erro?: string;
}

const CampoTexto = forwardRef<HTMLInputElement, CampoTextoProps>(
  ({ rotulo, erro, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {rotulo && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {rotulo}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            erro ? "border-red-500" : "border-gray-300"
          } ${className}`}
          {...props}
        />
        {erro && <p className="mt-1 text-sm text-red-500">{erro}</p>}
      </div>
    );
  },
);

CampoTexto.displayName = "CampoTexto";

export default CampoTexto;
