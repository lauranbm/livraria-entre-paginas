interface CardResumoProps { //defini o contrato de dados do componente
  titulo: string;
  valor: string | number; //Mostra o tipo de cada informação que ele recebe.
}

function CardResumo({ titulo, valor }: CardResumoProps) { //Aqui a função recebe essas props já tipadas
  return (
    <div className="card dashboard-card h-100">
      <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
        <h3>{titulo}</h3>     {/* aqui os dados são exibidos na interface */}
        <p>{valor}</p>
      </div>
    </div>
  );
}

export default CardResumo;