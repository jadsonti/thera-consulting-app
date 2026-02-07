import { NextRequest, NextResponse } from "next/server";
import { Produto } from "../../../types/produto";

// Dados mock
let produtos: Produto[] = [
  {
    id: 1,
    nome: "Notebook Gamer",
    categoria: "Eletrônicos",
    preco: 4599.99,
    descricao: "Notebook com processador Intel i7, 16GB RAM, SSD 512GB",
    imagem: "https://picsum.photos/seed/notebook/400/300",
  },
  {
    id: 2,
    nome: "Mouse Wireless",
    categoria: "Periféricos",
    preco: 129.9,
    descricao: "Mouse sem fio com sensor óptico de alta precisão",
    imagem: "https://picsum.photos/seed/mouse/400/300",
  },
  {
    id: 3,
    nome: "Teclado Mecânico",
    categoria: "Periféricos",
    preco: 349.9,
    descricao: "Teclado mecânico RGB com switches blue",
    imagem: "https://picsum.photos/seed/keyboard/400/300",
  },
  {
    id: 4,
    nome: 'Monitor 27"',
    categoria: "Eletrônicos",
    preco: 1899.0,
    descricao: "Monitor IPS 27 polegadas, 144Hz, 1ms",
    imagem: "https://picsum.photos/seed/monitor/400/300",
  },
  {
    id: 5,
    nome: "Headset Gamer",
    categoria: "Áudio",
    preco: 299.9,
    descricao: "Headset com som surround 7.1 e microfone removível",
    imagem: "https://picsum.photos/seed/headset/400/300",
  },
  {
    id: 6,
    nome: "Webcam Full HD",
    categoria: "Periféricos",
    preco: 249.9,
    descricao: "Webcam 1080p com microfone integrado",
    imagem: "https://picsum.photos/seed/webcam/400/300",
  },
  {
    id: 7,
    nome: "SSD 1TB",
    categoria: "Armazenamento",
    preco: 459.9,
    descricao: "SSD NVMe 1TB com velocidade de leitura 3500MB/s",
    imagem: "https://picsum.photos/seed/ssd/400/300",
  },
  {
    id: 8,
    nome: "Cadeira Gamer",
    categoria: "Móveis",
    preco: 1299.0,
    descricao: "Cadeira ergonômica com apoio lombar e braços ajustáveis",
    imagem: "https://picsum.photos/seed/chair/400/300",
  },
];

export async function GET() {
  return NextResponse.json(produtos);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const novoProduto: Produto = {
    id: Math.max(...produtos.map((p) => p.id), 0) + 1,
    ...body,
  };
  produtos.push(novoProduto);
  return NextResponse.json(novoProduto, { status: 201 });
}
