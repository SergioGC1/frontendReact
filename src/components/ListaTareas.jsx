import { useEffect, useState } from "react";
import axios from "axios";

export default function ListaTareas() {
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        const fetchTareas = async () => {
            try {
                const token = localStorage.getItem("access");
                const respuesta = await axios.get("http://localhost:8000/api/tareas/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Tareas recibidas:", respuesta.data);
                setTareas(respuesta.data);
            } catch (err) {
                console.error("Error al cargar tareas:", err);
            }
        };

        fetchTareas();
    }, []);

    return (
        <div>
            <h2>Mis tareas</h2>
            <ul>
                {tareas.map((tarea) => (
                    <li key={tarea.id}>
                        <strong>{tarea.titulo}</strong> - {tarea.descripcion}
                    </li>
                ))}
            </ul>
        </div>
    );
}
