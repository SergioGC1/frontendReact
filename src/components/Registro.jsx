import { useState } from "react";

export default function Registro({ onRegistro, error }) {
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");

    const manejarSubmit = (e) => {
        e.preventDefault();
        if (onRegistro) onRegistro(usuario, email, contrasena);
    };

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={manejarSubmit}>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                />
                <br />
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Registrarse</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}
