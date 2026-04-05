import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeAdmin from "./presentation/pages/HomeAdmin";
import GestionConductores from "./presentation/pages/GestionConductores";
import RegistrarConductor from "./presentation/pages/RegistrarConductor";
import Login from "./presentation/pages/Login";
import AuthGuard from "./presentation/Components/AuthGuard.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={AuthGuard()} />

        <Route path="/Home" element={<HomeAdmin />} />
        <Route path="/conductores" element={<GestionConductores />} />
        <Route path="/conductores/registrar" element={<RegistrarConductor />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
/*
Inicializar con npm run dev

*/