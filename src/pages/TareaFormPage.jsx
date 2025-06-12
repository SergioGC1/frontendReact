import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Tarea from "../components/Tarea";

export default function TareaFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("access");

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            axios.get(`http://localhost:8000/api/tareas/${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(res => {
                setTitulo(res.data.titulo);
                setDescripcion(res.data.descripcion);
            })
            .catch(err => {
                alert("❌ No se pudo cargar la tarea");
                navigate("/tareas");
            })
            .finally(() => setLoading(false));
        } else {
            setTitulo("");
            setDescripcion("");
        }
    }, [id, token, navigate]);

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                await axios.put(`http://localhost:8000/api/tareas/${id}/`, { titulo, descripcion }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert("✅ Tarea actualizada correctamente");
            } else {
                await axios.post("http://localhost:8000/api/tareas/", { titulo, descripcion }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert("✅ Tarea creada correctamente");
            }
            navigate("/tareas");
        } catch (err) {
            alert("❌ Error al guardar la tarea");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && id) {
        return <div style={{ textAlign: "center", marginTop: 40 }}>Cargando...</div>;
    }

    return (
        <Tarea
            titulo={titulo}
            setTitulo={setTitulo}
            descripcion={descripcion}
            setDescripcion={setDescripcion}
            onSubmit={manejarSubmit}
            loading={loading}
            esEdicion={!!id}
        />
    );
}