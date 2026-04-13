import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router";
import Header from "./components/Header";
import CardResumo from "./components/CardResumo";
import LivroCard from "./components/LivroCard";
import type { ILivro } from "./types/ILivros";

function App() {
  // livros pré-cadastrados no sistema principal
  const [livros, setLivros] = useState<ILivro[]>([
    {
      id: 1,
      titulo: "Dom Casmurro",
      autor: "Machado de Assis",
      preco: 39.9,
      estoque: 0,
      vendidos: 3,
      imagem: "/imagens/livros/dom-casmurro.png",
    },
    {
      id: 2,
      titulo: "O Pequeno Príncipe",
      autor: "Antoine de Saint-Exupéry",
      preco: 29.9,
      estoque: 2,
      vendidos: 1,
      imagem: "/imagens/livros/o-pequeno-principe.png",
    },
    {
      id: 3,
      titulo: "A Revolução dos Bichos",
      autor: "George Orwell",
      preco: 35.5,
      estoque: 4,
      vendidos: 0,
      imagem: "/imagens/livros/revolucao-dos-bichos.png",
    },
    {
      id: 4,
      titulo: "Onde Morre o Amor",
      autor: "Douglas Rodrigues",
      preco: 49.9,
      estoque: 5,
      vendidos: 0,
      imagem: "/imagens/livros/onde-morre-o-amor.png",
    },
    {
      id: 5,
      titulo: "Box Harry Potter",
      autor: "J. K. Rowling",
      preco: 297.0,
      estoque: 3,
      vendidos: 0,
      imagem: "/imagens/livros/box-harry-potter.png",
    },
  ]);

  const [busca, setBusca] = useState("");
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novoAutor, setNovoAutor] = useState("");
  const [novoPreco, setNovoPreco] = useState("");
  const [novoEstoque, setNovoEstoque] = useState("");
  const [novaImagem, setNovaImagem] = useState("");

  // atualiza o estoque e a quantidade vendida
  function registrarVenda(id: number) {
    const novaLista = livros.map((livro) =>
      livro.id === id && livro.estoque > 0
        ? {
            ...livro,
            estoque: livro.estoque - 1,
            vendidos: livro.vendidos + 1,
          }
        : livro
    );

    setLivros(novaLista);
  }

  // adiciona um novo livro
  function cadastrarLivro(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const precoConvertido = Number(novoPreco);
    const estoqueConvertido = Number(novoEstoque);

    if (
      novoTitulo.trim() === "" ||
      novoAutor.trim() === "" ||
      novaImagem.trim() === "" ||
      isNaN(precoConvertido) ||
      isNaN(estoqueConvertido)
    ) {
      return;
    }

    const novoLivro: ILivro = {
      id: Date.now(),
      titulo: novoTitulo,
      autor: novoAutor,
      preco: precoConvertido,
      estoque: estoqueConvertido,
      vendidos: 0,
      imagem: novaImagem,
    };

    setLivros([...livros, novoLivro]);

    setNovoTitulo("");
    setNovoAutor("");
    setNovoPreco("");
    setNovoEstoque("");
    setNovaImagem("");
  }

  // usada para a navegação interna do menu
  function irParaSecao(id: string) {
    const elemento = document.getElementById(id);

    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // salva a lista de livros no localStorage
  useEffect(() => {
    localStorage.setItem("livros", JSON.stringify(livros));
  }, [livros]);

  // cálculos do dashboard
  const totalTitulos = livros.length;

  const totalEstoque = livros.reduce(
    (acumulador, livro) => acumulador + livro.estoque,
    0
  );

  const totalVendidos = livros.reduce(
    (acumulador, livro) => acumulador + livro.vendidos,
    0
  );

  const faturamentoTotal = livros.reduce(
    (acumulador, livro) => acumulador + livro.preco * livro.vendidos,
    0
  );

  const livrosFiltrados = livros.filter((livro) =>
    livro.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-vh-100">
      <Header titulo="Livraria Entre Páginas" />

      <div className="container-fluid">
        <div className="row">
          <aside className="col-12 col-md-auto mb-4">
            <nav className="card menu-card" style={{ width: "210px" }}>
              <div className="card-body p-3">
                <h2 className="fs-6 mb-3">Menu</h2>

                <ul className="list-group">
                  <li
                    className="list-group-item active py-2"
                    onClick={() => irParaSecao("dashboard-section")}
                    style={{ cursor: "pointer" }}
                  >
                    Dashboard
                  </li>

                  <li
                    className="list-group-item py-2"
                    onClick={() => irParaSecao("livros-section")}
                    style={{ cursor: "pointer" }}
                  >
                    Livros
                  </li>

                  <li className="list-group-item py-2">
                    <Link
                      to="/vendas"
                      className="text-decoration-none text-reset d-block"
                    >
                      Vendas
                    </Link>
                  </li>

                  <li className="list-group-item py-2">
                    <Link
                      to="/estoque"
                      className="text-decoration-none text-reset d-block"
                    >
                      Estoque
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </aside>

          <main className="col-12 col-md">
            <section className="mb-4" id="dashboard-section">
              <div className="row g-3">
                <div className="col-12 col-md-6 col-lg-3">
                  <CardResumo titulo="Títulos cadastrados" valor={totalTitulos} />
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                  <CardResumo
                    titulo="Exemplares em estoque"
                    valor={totalEstoque}
                  />
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                  <CardResumo
                    titulo="Exemplares vendidos"
                    valor={totalVendidos}
                  />
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                  <CardResumo
                    titulo="Faturamento total"
                    valor={faturamentoTotal.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  />
                </div>
              </div>
            </section>

            <section className="mb-4">
              <div className="card search-card">
                <div className="card-body">
                  <h2 className="section-title mb-3">Cadastrar novo livro</h2>

                  <form onSubmit={cadastrarLivro}>
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <label htmlFor="novoTitulo" className="form-label">
                          Título
                        </label>
                        <input
                          type="text"
                          id="novoTitulo"
                          className="form-control"
                          placeholder="Digite o título"
                          value={novoTitulo}
                          onChange={(e) => setNovoTitulo(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <label htmlFor="novoAutor" className="form-label">
                          Autor
                        </label>
                        <input
                          type="text"
                          id="novoAutor"
                          className="form-control"
                          placeholder="Digite o autor"
                          value={novoAutor}
                          onChange={(e) => setNovoAutor(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12 col-md-4">
                        <label htmlFor="novoPreco" className="form-label">
                          Preço
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          id="novoPreco"
                          className="form-control"
                          placeholder="Digite o preço"
                          value={novoPreco}
                          onChange={(e) => setNovoPreco(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12 col-md-4">
                        <label htmlFor="novoEstoque" className="form-label">
                          Estoque
                        </label>
                        <input
                          type="number"
                          min="0"
                          id="novoEstoque"
                          className="form-control"
                          placeholder="Digite a quantidade"
                          value={novoEstoque}
                          onChange={(e) => setNovoEstoque(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12 col-md-4">
                        <label htmlFor="novaImagem" className="form-label">
                          Caminho da imagem
                        </label>
                        <input
                          type="text"
                          id="novaImagem"
                          className="form-control"
                          placeholder="/imagens/livros/nome-do-arquivo.png"
                          value={novaImagem}
                          onChange={(e) => setNovaImagem(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <button type="submit" className="btn btn-success">
                          Cadastrar livro
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>

            <section className="mb-4" id="livros-section">
              <div className="card search-card mb-4">
                <div className="card-body">
                  <h2 className="section-title mb-3">Lista de livros</h2>

                  <label htmlFor="buscaLivro" className="form-label">
                    Buscar livro por título
                  </label>
                  <input
                    type="text"
                    id="buscaLivro"
                    className="form-control"
                    placeholder="Digite o título do livro"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                  />
                </div>
              </div>

              <div className="row g-3">
                {livrosFiltrados.length > 0 ? (
                  livrosFiltrados.map((livro) => (
                    <div className="col-12 col-md-6 col-xl-4" key={livro.id}>
                      <LivroCard
                        id={livro.id}
                        titulo={livro.titulo}
                        autor={livro.autor}
                        preco={livro.preco}
                        estoque={livro.estoque}
                        vendidos={livro.vendidos}
                        imagem={livro.imagem}
                        onRegistrarVenda={registrarVenda}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div className="alert alert-warning mb-0">
                      Nenhum livro encontrado com esse título.
                    </div>
                  </div>
                )}
              </div>
            </section>

            <address className="app-footer text-center py-3 border-top">
              <p className="mb-1">Laura Neves Bittencourt Moreira</p>
              <p className="mb-1">11/04/2026</p>
              <p className="mb-0">
                Desenvolvimento de Software WEB - Prof. Alexandre Almeida
              </p>
            </address>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;