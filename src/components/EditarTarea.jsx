import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditarTarea() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("access");

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8000/api/tareas/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            setTitulo(res.data.titulo);
            setDescripcion(res.data.descripcion);
        })
        .catch((err) => {
            console.error("Error cargando tarea", err);
            alert("❌ No se pudo cargar la tarea");
        });
    }, [id]);

    const manejarSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/tareas/${id}/`, {
                titulo,
                descripcion,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("✅ Tarea actualizada correctamente");
            navigate("/tareas");
        } catch (err) {
            alert("❌ Error al actualizar la tarea");
            console.error(err);
        }
    };

    return (
        <form onSubmit={manejarSubmit}>
            <h2>Editar tarea</h2>
            <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
            />
            <br />
            <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            />
            <br />
            <button type="submit">Guardar cambios</button>
        </form>
    );
}
