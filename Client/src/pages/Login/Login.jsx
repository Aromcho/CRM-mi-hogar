import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginFloating from '../../components/LoginFloating/LoginFloating';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    /**
     * 🟢 Iniciar sesión con email y contraseña
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/sessions/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include' // Importante: para incluir cookies con la solicitud
            });

            const data = await response.json();
            if (data.user?.role === 'ADMIN') {
                navigate('/admin', { state: { user: data.user } });
            } else {
                navigate('/', { state: { user: data.user } });
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    /**
     * 🟢 Iniciar sesión con Google automáticamente
     */
    

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form className='formulario' onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        id="email"
                        placeholder='Email:'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        id="password"
                        placeholder='Contraseña:'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className='login-button' type="submit">Ingresar</button>
            </form>
o
            {/* Google Login Flotante */}
            <LoginFloating />
        </div>
    );
};

export default Login;
