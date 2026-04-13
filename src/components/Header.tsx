import { Link } from "react-router"; //import para fazer navegação entre páginas

interface HeaderProps { //props que o Header pode receber
  titulo: string;
  mostrarVoltar?: boolean;
  destinoVoltar?: string;
}

function Header({ //função que monta o cabeçalho
  titulo,
  mostrarVoltar = false, //servem para controlar o botão de voltar
  destinoVoltar = "/",  
}: HeaderProps) {
  return (
    <header className="app-header">
      <div className="container-fluid header-content">
        {mostrarVoltar && (
          <Link to={destinoVoltar} className="header-voltar">
            Voltar
          </Link>
        )}

        <h1>{titulo}</h1>
      </div>
    </header>
  );
}

export default Header;