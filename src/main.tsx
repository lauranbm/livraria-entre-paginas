import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; //renderiza a aplicação
import { BrowserRouter, Routes, Route } from "react-router"; //fazer navegação entre paginas
import "./index.css";
import App from "./App";
import VendasPage from "./pages/VendasPage";
import EstoquePage from "./pages/EstoquePage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes> //rotas de navegação
        <Route path="/" element={<App />} /> //rota principal
        <Route path="/vendas" element={<VendasPage />} />
        <Route path="/estoque" element={<EstoquePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);