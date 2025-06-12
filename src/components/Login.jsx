import { useState } from 'react';

export default function Login({ onLogin, error, setMostrarLogin }) {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const manejarSubmit = (e) => {
        e.preventDefault();
        if (onLogin) onLogin(usuario, contrasena);
    };

    return (
        <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={manejarSubmit}>
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
