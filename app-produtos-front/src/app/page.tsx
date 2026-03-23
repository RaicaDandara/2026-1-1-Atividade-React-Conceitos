"use client";

import { useEffect, useState } from "react";
import { getProdutosTodos } from "@/services/api";

// Interface
//  |   Define a forma ou estrutura de um objeto, especificando quais propriedades ele deve ter e seus tipos. Similar as classes do Python,
//  | mas não implementa nada, só declara tipos, é tipo uma checagem para evitar erros como tentar acessar algo que não existe.
interface Produto {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  tags: string[];
  reviews: any[]; // Vetor de objetos de review
  images: string[]; // Vetor de strings com URLs das imagens
}

export default function Home() {
  const [produtos, atualizarProdutos] = useState<Produto[]>([]);
  // Cria o estado para armazenar a lista de produtos e a função para atualizá-lo
  const [termoPesquisa, setTermoPesquisa] = useState("");
  // Cria o estado para o termo de pesquisa e a função para atualizá-lo
  // OBS: Ambos estados iniciam vazios

  // Executa uma vez ao carregar a página, chama a API para buscar produtos e atualiza o estado com o resultado
  useEffect(() => {
    getProdutosTodos().then((resultado) => {
      atualizarProdutos(resultado.data.products);
    });
  }, []);

  // Filtra os produtos com base no termo de pesquisa, comparando o título de forma insensível a maiúsculas/minúsculas
  const produtosFiltrados = produtos.filter((produto) =>
    produto.title.toLowerCase().includes(termoPesquisa.toLowerCase()),
  );

  // Componente para o cartão do produto
  function ProductCard({ produto }: { produto: Produto }) {
    return (
      <div
        className="hover:bg-white hover:text-black"
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          width: "200px",
        }}
      >
        <img src={produto.images[0]} alt={produto.title} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
        <h3 className="font-bold">{produto.title}</h3>
        <p className="text-gray-500">{produto.description}</p>
        <hr className="my-2" />
        <p className="italic">Rating: {produto.rating}/5</p>
        <p className="italic">Tags: {produto.tags.join(", ")}</p>
        <p className="italic">Reviews: {produto.reviews.length}</p>
        <hr className="my-2" />
        <p className="font-bold bg-white text-black p-2 border border-black">Preço: R${produto.price}</p>
      </div>
    );
  }

  return (
    <div>
      <header style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 className="text-2xl font-bold text-center m-4">Pesquisa de Produtos</h1>
        <input
          type="text"
          placeholder="Digite o título do produto..."
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
          className="w-3/4 bg-white text-black m-6 p-2 mx-auto rounded-md"
        />
      </header>
      <main>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
          {produtosFiltrados.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      </main>
    </div>
  );
}
