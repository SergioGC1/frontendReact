import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Registro() {
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const manejarRegistro = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/api/registro/", {
                username: usuario,
                email,
                password: contrasena,
            });
            alert("✅ Registro exitoso. Inicia sesión ahora.");
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("❌ Error al registrar. Intenta con otro usuario o revisa los campos.");
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={manejarRegistro}>
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
