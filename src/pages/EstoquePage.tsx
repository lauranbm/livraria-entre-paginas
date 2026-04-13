import { useEffect, useState } from "react"; // busca e o carregamento dos dados
import Header from "../components/Header"; // reutilizar o cabeçalho
import type { ILivro } from "../types/ILivros"; // interface para manter a tipagem

function EstoquePage() {
  const [busca, setBusca] = useState(""); // controlar o texto digitado na busca
  const [livrosEmEstoque, setLivrosEmEstoque] = useState<ILivro[]>([]); // armazenar os livros carregados

  useEffect(() => {
    // carrega os livros salvos no sistema
    const livrosSalvos = localStorage.getItem("livros");

    if (livrosSalvos) {
      const listaLivros = JSON.parse(livrosSalvos) as ILivro[];
      setLivrosEmEstoque(listaLivros);
    }
  }, []);

  const livrosFiltrados = livrosEmEstoque.filter(
    (livro) =>
      // filtra os livros pelo título digitado
      livro.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-vh-100">
      <Header
        titulo="Livraria Entre Páginas"
        mostrarVoltar={true}
        destinoVoltar="/"
      />

      <main className="container-fluid">
        <section className="mb-4">
          <div className="card search-card">
            <div className="card-body">
              <h2 className="section-title mb-2">Estoque</h2>
              <p className="mb-3">
                Consulta de livros e quantidade disponível em estoque.
              </p>

              <label htmlFor="buscaEstoque" className="form-label">
                Buscar livro por título
              </label>
              <input
                type="text"
                id="buscaEstoque"
                className="form-control"
                placeholder="Digite o nome do livro"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="mb-4">
          <div className="card search-card">
            <div className="card-body">
              <div className="table-responsive tabela-arredondada">
                <table className="table table-bordered table-striped align-middle mb-0 vendas-table">
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Autor</th>
                      <th>Quantidade em estoque</th>
                    </tr>
                  </thead>
                  <tbody>
                    {livrosFiltrados.length > 0 ? (
                      livrosFiltrados.map((livro) => (
                        <tr key={livro.id}>
                          <td>{livro.titulo}</td>
                          <td>{livro.autor}</td>
                          <td>{livro.estoque}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="text-center">
                          Nenhum livro encontrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
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
  );
}

export default EstoquePage;