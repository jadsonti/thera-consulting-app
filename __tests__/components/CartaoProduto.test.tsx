import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartaoProduto from "../../src/components/produtos/CartaoProduto";
import { Produto } from "../../src/types/produto";

const produtoMock: Produto = {
  id: 1,
  nome: "Produto Teste",
  descricao: "Este é um produto de teste.",
  preco: 99.99,
  imagem: "https://via.placeholder.com/150",
  categoria: "Teste",
};

describe("CartaoProduto", () => {
  it("renderiza informações do produto corretamente", () => {
    render(<CartaoProduto produto={produtoMock} />);

    expect(screen.getByText(produtoMock.nome)).toBeInTheDocument();
    expect(screen.getByText(produtoMock.descricao)).toBeInTheDocument();
    expect(screen.getByText("R$ 99,99")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", produtoMock.nome);
  });
});
