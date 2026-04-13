interface LivroCardProps {
  // Aqui eu defini as props que o card recebe
  id: number;
  titulo: string;
  autor: string;
  preco: number;
  estoque: number;
  vendidos: number;
  imagem: string;
  onRegistrarVenda: (id: number) => void; // Aqui eu defini a função que será chamada ao registrar a venda.
}

function LivroCard({
  // função que monta o card do livro
  id,
  titulo,
  autor,
  preco,
  estoque,
  vendidos,
  imagem,
  onRegistrarVenda,
}: LivroCardProps) {
  return (
    <div className="card book-card h-100">
      <div className="book-card-horizontal">
        {/* Aqui eu organizei a parte da imagem */}
        <div className="book-image-side">
          <img
            src={imagem}
            alt={`Capa do livro ${titulo}`}
            className="book-cover"
          />
        </div>

        {/* Aqui eu organizei as informações do livro */}
        <div className="book-info-side">
          <h4>{titulo}</h4>

          <p>
            <strong>Autor:</strong> {autor}
          </p>

          <p>
            <strong>Preço:</strong>{" "}
            {preco.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <p>
            <strong>Em estoque:</strong> {estoque}
          </p>

          <p className="mb-3">
            <strong>Vendidos:</strong> {vendidos}
          </p>

          {/* Aqui eu usei uma condição para mudar o botão de acordo com o estoque. */}
          {estoque === 0 ? (
            <button className="btn btn-danger w-100" disabled>
              Esgotado
            </button>
          ) : (
            <button
              className="btn btn-success w-100"
              onClick={() => onRegistrarVenda(id)}
            >
              Registrar venda
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LivroCard;