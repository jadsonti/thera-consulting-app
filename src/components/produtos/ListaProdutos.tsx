"use client";

import { useProdutoStore } from "../../store";
import { CartaoProduto } from "./CartaoProduto";

export function ListaProdutos() {
  const {
    produtosFiltrados,
    carregando,
    erro,
    paginaAtual,
    itensPorPagina,
    definirPaginaAtual,
  } = useProdutoStore();

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (erro) {
    return <div className="text-center text-red-500 p-4">{erro}</div>;
  }

  if (produtosFiltrados.length === 0) {
    return (
      <div className="text-center text-gray-500 p-8">
        Nenhum produto encontrado.
      </div>
    );
  }

  // Paginação
  const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina);
  const indiceInicio = (paginaAtual - 1) * itensPorPagina;
  const produtosPaginados = produtosFiltrados.slice(
    indiceInicio,
    indiceInicio + itensPorPagina,
  );

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtosPaginados.map((produto) => (
          <CartaoProduto key={produto.id} produto={produto} />
        ))}
      </div>

      {/* Paginação */}
      {totalPaginas > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => definirPaginaAtual(paginaAtual - 1)}
            disabled={paginaAtual === 1}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>

          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
            (pagina) => (
              <button
                key={pagina}
                onClick={() => definirPaginaAtual(pagina)}
                className={`px-4 py-2 rounded-lg ${
                  paginaAtual === pagina
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {pagina}
              </button>
            ),
          )}

          <button
            onClick={() => definirPaginaAtual(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
      )}
    </div>
  );
}

export default ListaProdutos;
