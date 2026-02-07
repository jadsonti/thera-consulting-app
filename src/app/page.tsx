"use client";

import { useEffect, useState } from "react";
import { useProdutoStore } from "../store";
import { ListaProdutos } from "../components/produtos/ListaProdutos";
import { FiltrosProduto } from "../components/produtos/FiltrosProduto";
import { FormularioProduto } from "../components/produtos/FormularioProduto";
import Modal from "../components/ui/Modal";
import Botao from "../components/ui/Botao";

export default function PaginaInicial() {
  const { buscarProdutos } = useProdutoStore();
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    buscarProdutos();
  }, [buscarProdutos]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Produtos</h1>
        <Botao onClick={() => setModalAberto(true)}>+ Novo Produto</Botao>
      </div>

      <FiltrosProduto />
      <ListaProdutos />

      <Modal
        aberto={modalAberto}
        aoFechar={() => setModalAberto(false)}
        titulo="Cadastrar Novo Produto"
      >
        <FormularioProduto aoSucesso={() => setModalAberto(false)} />
      </Modal>
    </div>
  );
}
