import { useEffect, useState } from "react"; // armazenar e carregar os dados de venda
import Header from "../components/Header"; // reaproveitar o mesmo cabeçalho
import type { ILivro } from "../types/ILivros"; // manter a tipagem dos dados

function VendasPage() {
  const [livrosVendidos, setLivrosVendidos] = useState<ILivro[]>([]);

  useEffect(() => {
    // busca livros salvos no localStorage
    const livrosSalvos = localStorage.getItem("livros");

    if (livrosSalvos) {
      const listaLivros = JSON.parse(livrosSalvos) as ILivro[];
      const vendidos = listaLivros.filter((livro) => livro.vendidos > 0);
      setLivrosVendidos(vendidos);
    }
  }, []);

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
              <h2 className="section-title mb-2">Vendas</h2>
              <p className="mb-0">Registro de vendas.</p>
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
                      <th>Preço</th>
                      <th>Quantidade vendida</th>
                    </tr>
                  </thead>
                  <tbody>
                    {livrosVendidos.length > 0 ? (
                      livrosVendidos.map((livro) => (
                        <tr key={livro.id}>
                          <td>{livro.titulo}</td>
                          <td>{livro.autor}</td>
                          <td>
                            {livro.preco.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{livro.vendidos}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center">
                          Nenhuma venda registrada.
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

export default VendasPage;