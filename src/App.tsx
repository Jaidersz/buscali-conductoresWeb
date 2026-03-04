import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeAdmin from "./presentation/pages/HomeAdmin";
import GestionConductores from "./presentation/pages/GestionConductores";
import RegistrarConductor from "./presentation/pages/RegistrarConductor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeAdmin />} />
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