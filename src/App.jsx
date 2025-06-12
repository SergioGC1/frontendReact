import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CrearTarea from "./components/CrearTarea";
import ListaTareas from "./components/ListaTareas";
import EditarTarea from "./components/EditarTarea";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/crear" element={<CrearTarea />} />
                <Route path="/tareas" element={<ListaTareas />} />
                <Route path="/editar/:id" element={<EditarTarea />} />
            </Routes>
        </Router>
    );
}
