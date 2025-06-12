import { useState } from "react";
import axios from "axios";

export default function CrearTarea() {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");


    const manejarSubmit = async (e) => {
        const token = localStorage.getItem("access"); // Cambiado de "token" a "access"
        console.log("Token:", token);
        e.preventDefault();
        try {
            const respuesta = await axios.post(
                "http://localhost:8000/api/tareas/",
                { titulo, descripcion },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("✅ Tarea creada correctamente");
            console.log(respuesta.data);
        } catch (err) {
            alert("❌ Error al crear tarea");
            console.error(err);
        }
    };

    return (
        <form onSubmit={manejarSubmit}>
            <h2>Crear nueva tarea</h2>
            <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
            />
            <br />
            <textarea
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            />
            <br />
            <button type="submit">Crear</button>
        </form>
    );
}
