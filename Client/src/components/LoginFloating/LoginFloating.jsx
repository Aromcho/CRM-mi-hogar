import React from 'react';
import './LoginFloating.css';

const LoginFloating = () => {
  /**
   * 🟢 Manejar el Inicio de Sesión con Google
   */
  const handleGoogleLogin = () => {
    // Redirige directamente al backend para el flujo OAuth 2.0
    window.location.href = 'http://localhost:6080/api/sessions/google/web';
  };

  return (
    <div className="login-floating">
      <h4>Inicia sesión con Google</h4>
      <button className="google-login-btn" onClick={handleGoogleLogin}>
        Iniciar sesión con Google
      </button>
    </div>
  );
};

export default LoginFloating;
