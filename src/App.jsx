import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CrearTarea from "./components/CrearTarea";
import ListaTareas from "./components/ListaTareas";
import EditarTarea from "./components/EditarTarea";
import RutaPrivada from "./components/RutaPrivada";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/tareas" element={
                    <RutaPrivada>
                        <ListaTareas />
                    </RutaPrivada>
                } />
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
