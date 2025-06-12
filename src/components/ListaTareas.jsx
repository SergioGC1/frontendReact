import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListaTareas() {
    const [tareas, setTareas] = useState([]);
    const token = localStorage.getItem("access");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/tareas/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => setTareas(res.data))
            .catch((err) => console.error(err));
    }, []);

    const eliminarTarea = async (id) => {
        if (!confirm("¿Seguro que quieres eliminar esta tarea?")) return;
        try {
            await axios.delete(`http://localhost:8000/api/tareas/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTareas(tareas.filter((t) => t.id !== id));
        } catch (err) {
            alert("❌ Error al eliminar tarea");
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Mis tareas</h2>
            <ul>
                {tareas.map((tarea) => (
                    <li key={tarea.id}>
                        <strong>{tarea.titulo}</strong> - {tarea.descripcion}{" "}
                        <button onClick={() => navigate(`/editar/${tarea.id}`)}>✏️</button>{" "}
                        <button onClick={() => eliminarTarea(tarea.id)}>🗑️</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
