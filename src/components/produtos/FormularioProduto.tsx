"use client";

import { useState } from "react";
import { useProdutoStore } from "../../store";
import { DadosFormularioProduto } from "../../types/produto";
import { CATEGORIAS } from "../../constants";
import Botao from "../ui/Botao";
import CampoTexto from "../ui/CampoTexto";

const formatarMoeda = (valor: number): string => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const parseMoeda = (valor: string): number => {
  const apenasNumeros = valor.replace(/\D/g, "");
  return Number(apenasNumeros) / 100;
};

interface FormularioProdutoProps {
  aoSucesso?: () => void;
}

export function FormularioProduto({ aoSucesso }: FormularioProdutoProps) {
  const { adicionarProduto, carregando } = useProdutoStore();
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosFormularioProduto>({
      nome: "",
      categoria: "",
      preco: 0,
      descricao: "",
      imagem: "",
    });
  const [precoFormatado, setPrecoFormatado] = useState("");
  const [erros, setErros] = useState<
    Partial<Record<keyof DadosFormularioProduto, string>>
  >({});

  const handlePrecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const valorNumerico = parseMoeda(valor);
    setPrecoFormatado(formatarMoeda(valorNumerico));
    setDadosFormulario({ ...dadosFormulario, preco: valorNumerico });
  };

  const validar = (): boolean => {
    const novosErros: Partial<Record<keyof DadosFormularioProduto, string>> =
      {};

    if (!dadosFormulario.nome.trim()) {
      novosErros.nome = "Nome é obrigatório";
    }
    if (!dadosFormulario.categoria.trim()) {
      novosErros.categoria = "Categoria é obrigatória";
    }
    if (dadosFormulario.preco <= 0) {
      novosErros.preco = "Preço deve ser maior que zero";
    }
    if (!dadosFormulario.descricao.trim()) {
      novosErros.descricao = "Descrição é obrigatória";
    }
    if (!dadosFormulario.imagem.trim()) {
      novosErros.imagem = "URL da imagem é obrigatória";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validar()) return;

    await adicionarProduto(dadosFormulario);
    setDadosFormulario({
      nome: "",
      categoria: "",
      preco: 0,
      descricao: "",
      imagem: "",
    });
    setPrecoFormatado("");
    aoSucesso?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CampoTexto
        rotulo="Nome do Produto"
        value={dadosFormulario.nome}
        onChange={(e) =>
          setDadosFormulario({ ...dadosFormulario, nome: e.target.value })
        }
        erro={erros.nome}
        placeholder="Ex: Notebook Gamer"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Categoria
        </label>
        <select
          value={dadosFormulario.categoria}
          onChange={(e) =>
            setDadosFormulario({
              ...dadosFormulario,
              categoria: e.target.value,
            })
          }
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            erros.categoria ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Selecione uma categoria</option>
          {CATEGORIAS.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
        {erros.categoria && (
          <p className="mt-1 text-sm text-red-500">{erros.categoria}</p>
        )}
      </div>

      <CampoTexto
        rotulo="Preço"
        type="text"
        value={precoFormatado}
        onChange={handlePrecoChange}
        erro={erros.preco}
        placeholder="R$ 0,00"
      />

      <CampoTexto
        rotulo="Descrição"
        value={dadosFormulario.descricao}
        onChange={(e) =>
          setDadosFormulario({ ...dadosFormulario, descricao: e.target.value })
        }
        erro={erros.descricao}
        placeholder="Descrição do produto"
      />

      <CampoTexto
        rotulo="URL da Imagem"
        value={dadosFormulario.imagem}
        onChange={(e) =>
          setDadosFormulario({ ...dadosFormulario, imagem: e.target.value })
        }
        erro={erros.imagem}
        placeholder="https://exemplo.com/imagem.jpg"
      />

      <Botao type="submit" disabled={carregando} className="w-full">
        {carregando ? "Salvando..." : "Cadastrar Produto"}
      </Botao>
    </form>
  );
}

export default FormularioProduto;
