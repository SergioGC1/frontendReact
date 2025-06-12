// frontend/src/components/EditarTarea.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditarTarea() {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("access");

    useEffect(() => {
        axios.get(`http://localhost:8000/api/tareas/${id}/`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            setTitulo(res.data.titulo);
            setDescripcion(res.data.descripcion);
        }).catch(err => {
            console.error("❌ Error al cargar la tarea", err);
        });
    }, [id]);

    const manejarActualizacion = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/tareas/${id}/`, {
                titulo,
                descripcion
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("✅ Tarea actualizada");
            navigate("/");
        } catch (err) {
            alert("❌ Error al actualizar tarea");
            console.error(err);
        }
    };

    return (
        <form onSubmit={manejarActualizacion}>
            <h2>Editar tarea</h2>
            <input value={titulo} onChange={e => setTitulo(e.target.value)} required />
            <br />
            <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} />
            <br />
            <button type="submit">Guardar cambios</button>
        </form>
    );
}
