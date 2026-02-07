export const CATEGORIAS = [
  "Eletrônicos",
  "Periféricos",
  "Áudio",
  "Armazenamento",
  "Móveis",
  "Acessórios",
  "Games",
  "Smartphones",
] as const;

export type Categoria = (typeof CATEGORIAS)[number];
