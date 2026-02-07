import { clienteApi } from "./cliente";
import { Produto, DadosFormularioProduto } from "../../types/produto";

export const buscarProdutos = async (): Promise<Produto[]> => {
  const response = await clienteApi.get<Produto[]>("/produtos");
  return response.data;
};

export const buscarProdutoPorId = async (id: number): Promise<Produto> => {
  const response = await clienteApi.get<Produto>(`/produtos/${id}`);
  return response.data;
};

export const criarProduto = async (
  dados: DadosFormularioProduto,
): Promise<Produto> => {
  const response = await clienteApi.post<Produto>("/produtos", dados);
  return response.data;
};

export const atualizarProduto = async (
  id: number,
  dados: Partial<DadosFormularioProduto>,
): Promise<Produto> => {
  const response = await clienteApi.put<Produto>(`/produtos/${id}`, dados);
  return response.data;
};

export const deletarProduto = async (id: number): Promise<void> => {
  await clienteApi.delete(`/produtos/${id}`);
};
