export default function Tarea({
    titulo,
    setTitulo,
    descripcion,
    setDescripcion,
    onSubmit,
    loading,
    esEdicion
}) {
    return (
        <form onSubmit={onSubmit} style={{ maxWidth: 400, margin: "40px auto", background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 2px 8px #0001" }}>
            <h2 style={{ textAlign: "center", color: "#000" }}>{esEdicion ? "Editar tarea" : "Crear nueva tarea"}</h2>
            <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
                style={{ width: "100%", marginBottom: 12, padding: 8, borderRadius: 4, border: "1px solid #e0e0e0" }}
            />
            <textarea
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                style={{ width: "100%", marginBottom: 12, padding: 8, borderRadius: 4, border: "1px solid #e0e0e0", minHeight: 80 }}
            />
            <div style={{ display: "flex", gap: 12 }}>
                <button type="submit" disabled={loading} style={{ flex: 1, background: "#222", color: "#fff", border: "none", borderRadius: 4, padding: "10px 0", fontWeight: "bold" }}>
                    {esEdicion ? "Guardar cambios" : "Crear"}
                </button>
            </div>
        </form>
    );
}