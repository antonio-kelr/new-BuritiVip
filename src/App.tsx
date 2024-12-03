import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import AdminLayout from "./components/Admin/AdminLayout";
import NotFound from "./components/NotFound";
import AdminHome from "./components/Admin/pages/AdminHome";
import Login from "./components/Login/login";
import AdminAgendas from "./components/Admin/pages/AdminAgendas";
import AdminCobeturas from "./components/Admin/pages/AdminCoberturas/cobertura";
import TokenDeacesso from "./components/Login/token";
import Classificados from "./components/Admin/pages/adminClassificados/classificados";
import Recados from "./components/Admin/pages/AdminRecados/Recados";
import Noticias from "./components/Admin/pages//AdminNoticias/Noticias";
import { PageMais } from "./components/PageMais/PageMais";
import CoberturaMais from "./components/PageMais/pages/maisCoberturas/CoberturaMais";
import DetalheCoberturas from "./components/PageMais/pages//maisCoberturas/page/DetalheCoberturas";
import MaisNoticia from "./components/PageMais/pages/maisNoticias/maisNoticia";
import DetalheNoticias from "./components/PageMais/pages/maisNoticias/page/detalheNoticias";
import MaisAgenda from "./components/PageMais/pages/maisAgendas/maisAgenda";
import Classificacados from "./components/PageMais/pages/maisClassificados/classificacados";
import MaisRecados from "./components/PageMais/pages/maisRecados/maisRecados";
import DetalheClassificados from "./components/PageMais/pages/maisClassificados/page/DetalheClassificados";
import DetalheRecados from "./components/PageMais/pages/maisRecados/page/DetalheRecados";
import FaleConosco from "./components/FaleConosco/FaleConosco";
import Banner from "./components/Admin/pages/AdminBanner/banner";
import Anucios from "./components/Admin/pages/AdminAnucios/anucios";

function App() {
  const handleLogin = () => {
    console.log("Login realizado com sucesso!");
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota para a landing page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/faleconosco" element={<FaleConosco />} /> 


        {/* Rotas para o layout PageMais */}
        <Route element={<PageMais />}>
          <Route path="/coberturas" element={<CoberturaMais />}>
            <Route path="detalhe/:slug" element={<DetalheCoberturas />} />
          </Route>
          <Route path="/noticias" element={<MaisNoticia />}>
            <Route path="detalhe/:slug" element={<DetalheNoticias />} />
          </Route>
          <Route path="/agendas/:slug" element={<MaisAgenda />} />
          <Route path="/agendas" element={<MaisAgenda />} /> 


          <Route path="/classificados" element={<Classificacados />}>
            <Route path="detalhe/:slug" element={<DetalheClassificados />} />
          </Route>

          <Route path="/recados"  element={<MaisRecados />}>
            <Route path="detalhe/:slug" element={<DetalheRecados />} />
          </Route>
        </Route>

        {/* Rota para o admin */}
        <Route path="/admin/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/admin" element={<TokenDeacesso />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="banners" element={<Banner />} />
            <Route path="anucios" element={<Anucios />} />
            <Route path="agendas" element={<AdminAgendas />} />
            <Route path="coberturas" element={<AdminCobeturas />} />
            <Route path="Classificados" element={<Classificados />} />
            <Route path="recados" element={<Recados />} />
            <Route path="noticias" element={<Noticias />} />
          </Route>
        </Route>

        {/* Rota para página não encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
