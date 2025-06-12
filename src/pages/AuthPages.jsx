import { useState } from "react";
import axios from "axios";
import Login from "../components/Login";
import Registro from "../components/Registro";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
    const [mostrarLogin, setMostrarLogin] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (usuario, contrasena) => {
        setError("");
        try {
            const respuesta = await axios.post('http://localhost:8000/api/token/', {
                username: usuario,
                password: contrasena
            });
            localStorage.setItem('access', respuesta.data.access);
            localStorage.setItem('refresh', respuesta.data.refresh);
            navigate('/tareas');
        } catch (err) {
            setError('Credenciales incorrectas');
        }
    };

    const handleRegistro = async (usuario, email, contrasena) => {
        setError("");
        try {
            await axios.post("http://localhost:8000/api/registro/", {
                username: usuario,
                email,
                password: contrasena,
            });
            alert("✅ Registro exitoso. Inicia sesión ahora.");
            setMostrarLogin(true);
        } catch (err) {
            setError("❌ Error al registrar. Intenta con otro usuario o revisa los campos.");
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(120deg, #f9f9f9 60%, #e0e7ff 100%)"
        }}>
            <div style={{
                background: "#fff",
                padding: "40px 32px",
                borderRadius: 16,
                boxShadow: "0 4px 24px #0002",
                minWidth: 320,
                width: "100%",
                maxWidth: 350
            }}>
                <h2 style={{ textAlign: "center", marginBottom: 24, color: "#222" }}>
                    {mostrarLogin ? "Iniciar sesión" : "Crear cuenta"}
                </h2>
                {mostrarLogin ? (
                    <>
                        <Login onLogin={handleLogin} error={error} />
                        <p style={{ marginTop: 16, textAlign: "center" }}>
                            ¿No tienes cuenta?{" "}
                            <button
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#6366f1",
                                    cursor: "pointer",
                                    fontWeight: "bold"
                                }}
                                onClick={() => { setMostrarLogin(false); setError(""); }}>
                                Regístrate
                            </button>
                        </p>
                    </>
                ) : (
                    <>
                        <Registro onRegistro={handleRegistro} error={error} />
                        <p style={{ marginTop: 16, textAlign: "center" }}>
                            ¿Ya tienes cuenta?{" "}
                            <button
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#6366f1",
                                    cursor: "pointer",
                                    fontWeight: "bold"
                                }}
                                onClick={() => { setMostrarLogin(true); setError(""); }}>
                                Inicia sesión
                            </button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}