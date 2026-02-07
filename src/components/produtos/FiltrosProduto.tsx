"use client";

import { useProdutoStore } from "../../store";
import CampoTexto from "../ui/CampoTexto";

export function FiltrosProduto() {
  const { filtros, definirFiltros } = useProdutoStore();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <CampoTexto
          rotulo="Buscar por nome"
          value={filtros.busca}
          onChange={(e) => definirFiltros({ busca: e.target.value })}
          placeholder="Digite o nome..."
        />

        <CampoTexto
          rotulo="Preço mínimo"
          type="number"
          min="0"
          value={filtros.precoMinimo ?? ""}
          onChange={(e) =>
            definirFiltros({
              precoMinimo: e.target.value ? parseFloat(e.target.value) : null,
            })
          }
          placeholder="R$ 0,00"
        />

        <CampoTexto
          rotulo="Preço máximo"
          type="number"
          min="0"
          value={filtros.precoMaximo ?? ""}
          onChange={(e) =>
            definirFiltros({
              precoMaximo: e.target.value ? parseFloat(e.target.value) : null,
            })
          }
          placeholder="R$ 10.000,00"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ordenar por
          </label>
          <select
            value={filtros.ordenarPor}
            onChange={(e) =>
              definirFiltros({
                ordenarPor: e.target.value as "nome" | "preco" | "categoria",
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="nome">Nome</option>
            <option value="preco">Preço</option>
            <option value="categoria">Categoria</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ordem
          </label>
          <select
            value={filtros.ordem}
            onChange={(e) =>
              definirFiltros({ ordem: e.target.value as "asc" | "desc" })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Crescente</option>
            <option value="desc">Decrescente</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FiltrosProduto;
