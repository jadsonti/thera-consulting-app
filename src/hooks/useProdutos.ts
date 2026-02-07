import { useState, useEffect, useCallback } from "react";
import { Produto, DadosFormularioProduto } from "../types/produto";
import {
  buscarProdutos,
  criarProduto as criarProdutoApi,
  atualizarProduto as atualizarProdutoApi,
  deletarProduto as deletarProdutoApi,
} from "../services/api/produtos";

interface UseProdutosRetorno {
  produtos: Produto[];
  carregando: boolean;
  erro: string | null;
  criarProduto: (dados: DadosFormularioProduto) => Promise<void>;
  atualizarProduto: (
    id: number,
    dados: Partial<DadosFormularioProduto>,
  ) => Promise<void>;
  deletarProduto: (id: number) => Promise<void>;
  recarregar: () => Promise<void>;
}

export const useProdutos = (): UseProdutosRetorno => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregarProdutos = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await buscarProdutos();
      setProdutos(dados);
    } catch (error) {
      const mensagemErro =
        error instanceof Error ? error.message : "Erro ao buscar produtos";
      setErro(mensagemErro);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  const criarProduto = useCallback(async (dados: DadosFormularioProduto) => {
    try {
      const novoProduto = await criarProdutoApi(dados);
      setProdutos((prev) => [...prev, novoProduto]);
    } catch (error) {
      const mensagemErro =
        error instanceof Error ? error.message : "Erro ao criar produto";
      setErro(mensagemErro);
      throw error;
    }
  }, []);

  const atualizarProduto = useCallback(
    async (id: number, dados: Partial<DadosFormularioProduto>) => {
      try {
        const produtoAtualizado = await atualizarProdutoApi(id, dados);
        setProdutos((prev) =>
          prev.map((produto) =>
            produto.id === id ? produtoAtualizado : produto,
          ),
        );
      } catch (error) {
        const mensagemErro =
          error instanceof Error ? error.message : "Erro ao atualizar produto";
        setErro(mensagemErro);
        throw error;
      }
    },
    [],
  );

  const deletarProduto = useCallback(async (id: number) => {
    try {
      await deletarProdutoApi(id);
      setProdutos((prev) => prev.filter((produto) => produto.id !== id));
    } catch (error) {
      const mensagemErro =
        error instanceof Error ? error.message : "Erro ao deletar produto";
      setErro(mensagemErro);
      throw error;
    }
  }, []);

  return {
    produtos,
    carregando,
    erro,
    criarProduto,
    atualizarProduto,
    deletarProduto,
    recarregar: carregarProdutos,
  };
};
