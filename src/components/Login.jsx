import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const manejarLogin = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await axios.post('http://localhost:8000/api/token/', {
                username: usuario,
                password: contrasena
            });
            localStorage.setItem('access', respuesta.data.access);
            localStorage.setItem('refresh', respuesta.data.refresh);
            setError('');
            alert('¡Inicio de sesión exitoso!');
            navigate('/tareas');
        } catch (err) {
            console.error(err.response?.data || err.message);
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={manejarLogin}>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                />
                <br />
                <button type="submit">Entrar</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}
