import React from "react";
import { render } from "@testing-library/react";
import CartaoProduto from "../../src/components/produtos/CartaoProduto";
import { Produto } from "../../src/types/produto";

const produtoMock: Produto = {
  id: 1,
  nome: "Notebook Gamer",
  descricao: "Notebook com processador Intel i7, 16GB RAM, SSD 512GB",
  preco: 4599.99,
  imagem: "https://picsum.photos/seed/notebook/400/300",
  categoria: "Eletrônicos",
};

describe("CartaoProduto - Snapshot", () => {
  it("deve corresponder ao snapshot", () => {
    const { container } = render(<CartaoProduto produto={produtoMock} />);
    expect(container).toMatchSnapshot();
  });
});
