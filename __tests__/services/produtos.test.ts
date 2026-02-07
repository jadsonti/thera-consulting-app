import {
  buscarProdutos,
  criarProduto,
  atualizarProduto,
} from "../../src/services/api/produtos";
import { clienteApi } from "../../src/services/api/cliente";

jest.mock("../../src/services/api/cliente");

const clienteApiMock = clienteApi as jest.Mocked<typeof clienteApi>;

describe("Serviço de Produtos", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve buscar produtos", async () => {
    const produtosMock = [
      {
        id: 1,
        nome: "Produto 1",
        preco: 100,
        descricao: "Desc 1",
        imagem: "img1.jpg",
        categoria: "Cat 1",
      },
      {
        id: 2,
        nome: "Produto 2",
        preco: 200,
        descricao: "Desc 2",
        imagem: "img2.jpg",
        categoria: "Cat 2",
      },
    ];
    clienteApiMock.get.mockResolvedValueOnce({ data: produtosMock });

    const produtos = await buscarProdutos();

    expect(Array.isArray(produtos)).toBe(true);
    expect(produtos).toEqual(produtosMock);
    expect(clienteApiMock.get).toHaveBeenCalledWith("/produtos");
  });

  it("deve criar um novo produto", async () => {
    const novoProduto = {
      nome: "Produto Teste",
      preco: 100,
      descricao: "Descrição do produto",
      imagem: "https://exemplo.com/imagem.jpg",
      categoria: "Categoria Teste",
    };
    const produtoCriadoMock = { id: 1, ...novoProduto };
    clienteApiMock.post.mockResolvedValueOnce({ data: produtoCriadoMock });

    const produtoCriado = await criarProduto(novoProduto);

    expect(produtoCriado).toHaveProperty("id");
    expect(produtoCriado.nome).toBe(novoProduto.nome);
    expect(clienteApiMock.post).toHaveBeenCalledWith("/produtos", novoProduto);
  });

  it("deve atualizar um produto existente", async () => {
    const dadosAtualizados = { nome: "Produto Atualizado" };
    const idProduto = 1;
    const produtoAtualizadoMock = {
      id: idProduto,
      nome: "Produto Atualizado",
      preco: 100,
      descricao: "Desc",
      imagem: "img.jpg",
      categoria: "Cat",
    };
    clienteApiMock.put.mockResolvedValueOnce({ data: produtoAtualizadoMock });

    const produtoAtualizado = await atualizarProduto(
      idProduto,
      dadosAtualizados,
    );

    expect(produtoAtualizado.nome).toBe(dadosAtualizados.nome);
    expect(clienteApiMock.put).toHaveBeenCalledWith(
      `/produtos/${idProduto}`,
      dadosAtualizados,
    );
  });
});
