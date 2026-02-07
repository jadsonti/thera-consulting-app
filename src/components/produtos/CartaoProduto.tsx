"use client";

import { Produto } from "../../types/produto";
import Image from "next/image";

interface CartaoProdutoProps {
  produto: Produto;
}

export function CartaoProduto({ produto }: CartaoProdutoProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={produto.imagem}
          alt={produto.nome}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full mb-2">
          {produto.categoria}
        </span>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {produto.nome}
        </h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {produto.descricao}
        </p>
        <p className="text-xl font-bold text-green-600">
          {produto.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
    </div>
  );
}

export default CartaoProduto;
