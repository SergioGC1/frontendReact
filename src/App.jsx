import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CrearTarea from "./components/CrearTarea";
import ListaTareas from "./components/ListaTareas";
import EditarTarea from "./components/EditarTarea";
import RutaPrivada from "./components/RutaPrivada";
import Registro from "./components/Registro";
import TareasPage from "./pages/TareasPage";


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/tareas" element={<TareasPage />} />
                <Route path="/crear" element={
                    <RutaPrivada>
                        <CrearTarea />
                    </RutaPrivada>
                } />
                <Route path="/editar/:id" element={
                    <RutaPrivada>
                        <EditarTarea />
                    </RutaPrivada>
                } />
            </Routes>
        </Router>
    );
}
