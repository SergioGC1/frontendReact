"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import ListaTareas from "../components/ListaTareas"

export default function TareasPage() {
    const [tareas, setTareas] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem("access")

    useEffect(() => {
        const cargarTareas = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/tareas/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setTareas(response.data)
            } catch (err) {
                console.error("Error al cargar tareas:", err)
                if (err.response?.status === 401) {
                    cerrarSesion()
                }
            } finally {
                setLoading(false)
            }
        }

        if (token) {
            cargarTareas()
        } else {
            window.location.href = "/"
        }
    }, [token])

    const cerrarSesion = () => {
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        window.location.href = "/"
    }

    const eliminarTarea = async (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar esta tarea?")) return

        try {
            await axios.delete(`http://localhost:8000/api/tareas/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setTareas(tareas.filter((t) => t.id !== id))
        } catch (err) {
            alert("❌ Error al eliminar tarea")
            console.error(err)
        }
    }

    const irACrear = () => {
        window.location.href = "/crear"
    }

    const irAEditar = (id) => {
        window.location.href = `/editar/${id}`
    }

    if (loading) {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "system-ui, sans-serif",
                    color: "#000",
                    fontSize: "1rem",
                }}
            >
                Cargando tareas...
            </div>
        )
    }

    return (
        <div
            style={{
                width: "100%",
                minHeight: "100vh",
                background: "#fff",
                fontFamily: "system-ui, sans-serif",
            }}
        >
            {/* Header */}
            <div
                style={{
                    background: "#fff",
                    borderBottom: "1px solid #e0e0e0",
                    padding: "20px 0", // Solo padding vertical
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    width: "100%",
                    boxSizing: "border-box",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        padding: "0", // Sin margen lateral
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "20px",
                        boxSizing: "border-box",
                    }}
                >
                    {/* Título */}
                    <h1
                        style={{
                            margin: 0,
                            color: "#000",
                            fontSize: "1.8rem",
                            fontWeight: "bold",
                        }}
                    >
                        📋 Mis Tareas
                    </h1>

                    {/* Botones */}
                    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                        <button
                            onClick={irACrear}
                            style={{
                                background: "#000",
                                color: "#fff",
                                border: "none",
                                borderRadius: 4,
                                padding: "10px 20px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                fontSize: "14px",
                            }}
                        >
                            ➕ Nueva Tarea
                        </button>

                        <button
                            onClick={cerrarSesion}
                            style={{
                                background: "#f5f5f5",
                                color: "#000",
                                border: "1px solid #e0e0e0",
                                borderRadius: 4,
                                padding: "10px 20px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                fontSize: "14px",
                            }}
                        >
                            🚪 Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>

            <div
                style={{
                    width: "100%",
                    padding: "0", // Sin margen lateral
                    boxSizing: "border-box",
                }}
            >
                <ListaTareas tareas={tareas} onEliminar={eliminarTarea} onEditar={irAEditar} />
            </div>
        </div>
    )
}
