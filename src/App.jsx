import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RutaPrivada from "./components/RutaPrivada";
import Registro from "./components/Registro";
import TareasPage from "./pages/TareasPage";
import AuthPage from "./pages/AuthPages";
import TareaFormPage from "./pages/TareaFormPage";


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/tareas" element={<TareasPage />} />
                <Route path="/crear" element={
                    <RutaPrivada>
                        <TareaFormPage />
                    </RutaPrivada>
                } />
                <Route path="/editar/:id" element={
                    <RutaPrivada>
                        <TareaFormPage />
                    </RutaPrivada>
                } />
            </Routes>
        </Router>
    );
}
