import React from 'react';
import './LoginFloating.css';

const LoginFloating = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:6080/api/sessions/google/web';
  };

  return (
    <div className="login-floating">
      <button className="google-login-btn" onClick={handleGoogleLogin}>
        <img
          src="https://img.icons8.com/color/48/000000/google-logo.png"
          alt="Google logo"
        />
        Continuar con Google
      </button>
    </div>
  );
};

export default LoginFloating;