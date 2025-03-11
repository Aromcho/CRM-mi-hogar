import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Row, Col, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaSignOutAlt } from "react-icons/fa"; // 🔥 Nuevo icono de cerrar sesión
import { FiltersContext } from "../../context/FiltersContext";
import { IoMdSettings } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext"; // 🔥 Importar contexto de autenticación
import "./Menu.css";

export const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const navigate = useNavigate(); // 🔥 Hook para redirección
  const { logout } = useContext(AuthContext); // 🔥 Obtenemos la función logout

  const { filters, updateFilters } = useContext(FiltersContext);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    updateFilters({ searchQuery: query });

    if (query.length > 2) {
      try {
        const response = await axios.get("/api/property/autocomplete", {
          params: { query },
        });
        setAutocompleteSuggestions(response.data);
      } catch (error) {
        console.error("Error en el autocompletado:", error);
      }
    } else {
      setAutocompleteSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    updateFilters({ searchQuery: suggestion.value });
    setAutocompleteSuggestions([]);
  };

  const handleLogout = async () => {
    try {
      await logout(); // 🔥 Llamamos la función de logout del contexto de autenticación
      navigate("/login"); // 🔥 Redirigir al usuario al login después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const isLoginPage = location.pathname === "/login";
  if (isLoginPage) {
    return null;
  }

  return (
    <Navbar expand="lg" bg="white" fixed="top" className="menu-container">
      <div className="nav-flex-container">
        <Navbar.Brand as={Link} to="/">
          <img
            className="logo-img"
            src="/images/logo-mi-hogar.png"
            alt="mi hogar"
          />
        </Navbar.Brand>
        <div className="input-nav-icon-wrapper">
          <FaSearch className="input-icon-placeholder" />
          <Form.Control
            type="text"
            className="input-search input-with-icon"
            value={filters.searchQuery}
            placeholder="Buscar..."
            onChange={handleSearchChange}
          />
          {autocompleteSuggestions.length > 0 && (
            <div className="autocomplete-suggestions">
              <ul>
                {autocompleteSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.value}
                    onClick={() => handleSuggestionSelect(suggestion)}
                  >
                    {suggestion.value}{" "}
                    {suggestion.secundvalue && ` - ${suggestion.secundvalue}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="menu-config">
          <div className="action-button">
            <IoMdSettings />
          </div>
          <div className="action-button">
            <IoIosNotifications />
          </div>
          {/* 🔥 Icono de cerrar sesión */}
          <div
            className="action-button logout-button"
            title="Cerrar sesión" // Tooltip al hacer hover
            onClick={handleLogout} // Acción al hacer clic
          >
            <FaSignOutAlt /> {/* Nuevo icono */}
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Menu;
