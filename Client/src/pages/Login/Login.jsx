import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";  
import LoginFloating from "../../components/LoginFloating/LoginFloating";
import "./Login.css";

const Login = () => {
  const { login, loading, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // ✅ Redirigir si el usuario ya está autenticado
  useEffect(() => {
    if (user) {
      navigate("/"); 
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/"); 
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return user ? null : ( // 🔥 Si el usuario está autenticado, no mostrar el formulario
    <div className="login-container">
      <div className="login-card">
        <img className="logo-login" src="./images/logo-mi-hogar.png" alt="Mi Hogar" />
        <h2>Bienvenido de vuelta</h2>
        {error && <div className="error-message">{error}</div>}
        <form className="formulario" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
        <LoginFloating />
      </div>
    </div>
  );
};

export default Login;
