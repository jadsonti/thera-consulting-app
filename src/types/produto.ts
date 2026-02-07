export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
}

export interface DadosFormularioProduto {
  nome: string;
  categoria: string;
  preco: number;
  descricao: string;
  imagem: string;
}

export interface FiltrosProduto {
  busca: string;
  precoMinimo: number | null;
  precoMaximo: number | null;
  ordenarPor: "nome" | "preco" | "categoria";
  ordem: "asc" | "desc";
}
