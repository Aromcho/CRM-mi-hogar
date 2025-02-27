import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado del usuario
  const [loading, setLoading] = useState(true); // Indicador de carga

  /**
   * Verificar Autenticación Inicial (JWT vía cookies)
   */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/sessions/online', { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * Inicio de sesión (Email y contraseña)
   */
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/sessions/login', { email, password }, { withCredentials: true });
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  /**
   * Cerrar sesión
   */
  const logout = async () => {
    try {
      await axios.delete('/api/sessions/logout', { withCredentials: true });
      setUser(null);
    } catch (error) {
      throw new Error('Logout failed');
    }
  };

  /**
   * Verificar si es Administrador
   */
  const isAdmin = () => user && user.role === 'ADMIN';

  /**
   * Inicio de sesión con Google
   */
  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:5173/api/sessions/google/web';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAdmin,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
