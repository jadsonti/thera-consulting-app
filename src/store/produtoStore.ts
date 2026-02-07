import { create } from "zustand";
import {
  Produto,
  FiltrosProduto,
  DadosFormularioProduto,
} from "../types/produto";
import * as servicoProduto from "../services/api/produtos";

interface EstadoProduto {
  produtos: Produto[];
  produtosFiltrados: Produto[];
  carregando: boolean;
  erro: string | null;
  filtros: FiltrosProduto;
  paginaAtual: number;
  itensPorPagina: number;

  // Ações
  buscarProdutos: () => Promise<void>;
  adicionarProduto: (dados: DadosFormularioProduto) => Promise<void>;
  atualizarProduto: (
    id: number,
    dados: Partial<DadosFormularioProduto>,
  ) => Promise<void>;
  deletarProduto: (id: number) => Promise<void>;
  definirFiltros: (filtros: Partial<FiltrosProduto>) => void;
  definirPaginaAtual: (pagina: number) => void;
  aplicarFiltros: () => void;
}

export const useProdutoStore = create<EstadoProduto>((set, get) => ({
  produtos: [],
  produtosFiltrados: [],
  carregando: false,
  erro: null,
  filtros: {
    busca: "",
    precoMinimo: null,
    precoMaximo: null,
    ordenarPor: "nome",
    ordem: "asc",
  },
  paginaAtual: 1,
  itensPorPagina: 6,

  buscarProdutos: async () => {
    set({ carregando: true, erro: null });
    try {
      const produtos = await servicoProduto.buscarProdutos();
      set({ produtos, carregando: false });
      get().aplicarFiltros();
    } catch {
      set({ erro: "Erro ao carregar produtos", carregando: false });
    }
  },

  adicionarProduto: async (dados: DadosFormularioProduto) => {
    set({ carregando: true, erro: null });
    try {
      const novoProduto = await servicoProduto.criarProduto(dados);
      set((state) => ({
        produtos: [...state.produtos, novoProduto],
        carregando: false,
      }));
      get().aplicarFiltros();
    } catch {
      set({ erro: "Erro ao criar produto", carregando: false });
    }
  },

  atualizarProduto: async (
    id: number,
    dados: Partial<DadosFormularioProduto>,
  ) => {
    set({ carregando: true, erro: null });
    try {
      const produtoAtualizado = await servicoProduto.atualizarProduto(
        id,
        dados,
      );
      set((state) => ({
        produtos: state.produtos.map((p) =>
          p.id === id ? produtoAtualizado : p,
        ),
        carregando: false,
      }));
      get().aplicarFiltros();
    } catch {
      set({ erro: "Erro ao atualizar produto", carregando: false });
    }
  },

  deletarProduto: async (id: number) => {
    set({ carregando: true, erro: null });
    try {
      await servicoProduto.deletarProduto(id);
      set((state) => ({
        produtos: state.produtos.filter((p) => p.id !== id),
        carregando: false,
      }));
      get().aplicarFiltros();
    } catch {
      set({ erro: "Erro ao deletar produto", carregando: false });
    }
  },

  definirFiltros: (novosFiltros: Partial<FiltrosProduto>) => {
    set((state) => ({
      filtros: { ...state.filtros, ...novosFiltros },
      paginaAtual: 1,
    }));
    get().aplicarFiltros();
  },

  definirPaginaAtual: (pagina: number) => {
    set({ paginaAtual: pagina });
  },

  aplicarFiltros: () => {
    const { produtos, filtros } = get();
    let filtrados = [...produtos];

    // Filtro por nome
    if (filtros.busca) {
      filtrados = filtrados.filter((p) =>
        p.nome.toLowerCase().includes(filtros.busca.toLowerCase()),
      );
    }

    // Filtro por preço mínimo
    if (filtros.precoMinimo !== null) {
      filtrados = filtrados.filter((p) => p.preco >= filtros.precoMinimo!);
    }

    // Filtro por preço máximo
    if (filtros.precoMaximo !== null) {
      filtrados = filtrados.filter((p) => p.preco <= filtros.precoMaximo!);
    }

    // Ordenação
    filtrados.sort((a, b) => {
      const aValor = a[filtros.ordenarPor];
      const bValor = b[filtros.ordenarPor];

      if (typeof aValor === "string" && typeof bValor === "string") {
        return filtros.ordem === "asc"
          ? aValor.localeCompare(bValor)
          : bValor.localeCompare(aValor);
      }

      if (typeof aValor === "number" && typeof bValor === "number") {
        return filtros.ordem === "asc" ? aValor - bValor : bValor - aValor;
      }

      return 0;
    });

    set({ produtosFiltrados: filtrados });
  },
}));
