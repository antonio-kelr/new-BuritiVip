import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import AdminLayout from "./components/Admin/AdminLayout";
import NotFound from "./components/NotFound";
import AdminHome from "./components/Admin/pages/AdminHome";
import Home from "./components/LandingPage/pages/Home";
import Login from './components/Login/login';
import AdminAgendas from "./components/Admin/pages/AdminAgendas";
import TokenDeacesso from "./components/Login/token";

function App() {
  const handleLogin = () => {
    console.log("Login realizado com sucesso!");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/admin/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/admin" element={<TokenDeacesso />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="agendas" element={<AdminAgendas />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
