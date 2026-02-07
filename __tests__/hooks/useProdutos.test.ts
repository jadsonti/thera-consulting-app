import { renderHook, act, waitFor } from "@testing-library/react";
import { useProdutos } from "../../src/hooks/useProdutos";
import * as api from "../../src/services/api/produtos";

jest.mock("../../src/services/api/produtos");

describe("useProdutos", () => {
  const produtosMock = [
    {
      id: 1,
      nome: "Produto 1",
      preco: 100,
      descricao: "Descrição 1",
      imagem: "img1.jpg",
      categoria: "Cat 1",
    },
    {
      id: 2,
      nome: "Produto 2",
      preco: 200,
      descricao: "Descrição 2",
      imagem: "img2.jpg",
      categoria: "Cat 2",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve buscar produtos ao montar", async () => {
    (api.buscarProdutos as jest.Mock).mockResolvedValueOnce(produtosMock);

    const { result } = renderHook(() => useProdutos());

    await waitFor(() => {
      expect(result.current.produtos).toEqual(produtosMock);
    });

    expect(api.buscarProdutos).toHaveBeenCalledTimes(1);
  });

  it("deve lidar com adição de produto", async () => {
    (api.buscarProdutos as jest.Mock).mockResolvedValueOnce(produtosMock);
    (api.criarProduto as jest.Mock).mockResolvedValueOnce(produtosMock[0]);

    const { result } = renderHook(() => useProdutos());

    await waitFor(() => {
      expect(result.current.carregando).toBe(false);
    });

    await act(async () => {
      await result.current.criarProduto(produtosMock[0]);
    });

    expect(result.current.produtos).toContainEqual(produtosMock[0]);
    expect(api.criarProduto).toHaveBeenCalledWith(produtosMock[0]);
  });

  it("deve lidar com erros ao buscar produtos", async () => {
    (api.buscarProdutos as jest.Mock).mockRejectedValueOnce(
      new Error("Erro ao buscar"),
    );

    const { result } = renderHook(() => useProdutos());

    await waitFor(() => {
      expect(result.current.erro).toBe("Erro ao buscar");
    });
  });
});
