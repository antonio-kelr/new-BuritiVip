import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import AdminLayout from "./components/Admin/AdminLayout";
import NotFound from "./components/NotFound";
import AdminHome from "./components/Admin/pages/AdminHome";
import Home from "./components/LandingPage/pages/Home";
import AdminAgendas from "./components/Admin/pages/AdminAgendas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="agendas" element={<AdminAgendas />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
