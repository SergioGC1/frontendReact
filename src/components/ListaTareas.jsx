"use client"

export default function ListaTareas({ tareas, onEliminar, onEditar }) {
    if (tareas.length === 0) {
        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    background: "#fff",
                    border: "1px solid #e0e0e0",
                    width: "100%",
                }}
            >
                <div style={{ fontSize: "2rem", marginBottom: "20px" }}>📝</div>
                <h3
                    style={{
                        color: "#333",
                        fontSize: "1.2rem",
                        marginBottom: "10px",
                        fontWeight: "600",
                    }}
                >
                    No tienes tareas aún
                </h3>
                <p
                    style={{
                        color: "#666",
                        fontSize: "1rem",
                        margin: 0,
                    }}
                >
                    ¡Crea tu primera tarea para comenzar!
                </p>
            </div>
        )
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "100%",
            }}
        >
            {tareas.map((tarea) => (
                <div
                    key={tarea.id}
                    style={{
                        background: "#fff",
                        border: "1px solid #e0e0e0",
                        padding: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "20px",
                        width: "100%",
                    }}
                >
                    {/* Contenido de la tarea */}
                    <div style={{ flex: 1 }}>
                        <h3
                            style={{
                                margin: "0 0 8px 0",
                                color: "#000",
                                fontSize: "1.1rem",
                                fontWeight: "bold",
                                lineHeight: 1.3,
                            }}
                        >
                            {tarea.titulo}
                        </h3>
                        <p
                            style={{
                                margin: 0,
                                color: "#333",
                                fontSize: "0.9rem",
                                lineHeight: 1.5,
                            }}
                        >
                            {tarea.descripcion}
                        </p>
                    </div>

                    {/* Botones de acción */}
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexShrink: 0,
                        }}
                    >
                        <button
                            onClick={() => onEditar(tarea.id)}
                            style={{
                                background: "#f5f5f5",
                                color: "#000",
                                border: "1px solid #e0e0e0",
                                borderRadius: 4,
                                padding: "8px 12px",
                                cursor: "pointer",
                                fontSize: "14px",
                            }}
                            title="Editar tarea"
                        >
                            ✏️ Editar
                        </button>

                        <button
                            onClick={() => onEliminar(tarea.id)}
                            style={{
                                background: "#f5f5f5",
                                color: "#000",
                                border: "1px solid #e0e0e0",
                                borderRadius: 4,
                                padding: "8px 12px",
                                cursor: "pointer",
                                fontSize: "14px",
                            }}
                            title="Eliminar tarea"
                        >
                            🗑️ Eliminar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
