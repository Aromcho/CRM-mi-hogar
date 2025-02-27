import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { PATHS } from "../../../config/index.js";
import './Menu.css';

/* Icons */
import {
  TelIcon,
  BelgaIsoIcon,
  SearchIcon,
  EmprendimientosIcon,
} from "../Icons/Icons.jsx";

export const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <Navbar expand="lg"       bg="white" 
    className="menu-container">
      <div className="nav-flex-container">
        <Navbar.Brand as={Link} to="/">
          <img
            className="logo-img"
            src="/images/logo-mi-hogar.png"
            alt="Belga inmobiliaria"
          />
        </Navbar.Brand>

       

        {/* Botón hamburguesa */}
        <div
          className={`burger-button ${showMenu ? "active" : ""}`}
          onClick={() => setShowMenu(!showMenu)}
        >
          <div className="icon-wrapper">
            <div className={`burger-cross-custom ${showMenu ? "cross" : "burger"}`}>
              <div className="line" />
              <div className="line" />
              <div className="line" />
            </div>
          </div>
        </div>
      </div>

      {/* Menú desplegable */}
      <div className={`burger-menu ${showMenu ? "active" : ""}`}>
        <ul className="burger-menu-list">
          <li className="burger-menu-item">
            <Link to={PATHS.EMPRENDIMIENTOS} className="burger--menu-link">
              <EmprendimientosIcon />
              <span className="link-text">Emprendimientos</span>
            </Link>
          </li>
          <li className="burger-menu-item">
            <Link to="/favorites" className="burger--menu-link">
              <SearchIcon />
              <span className="link-text">Favoritas</span>
            </Link>
          </li>
          <li
            className="burger-menu-item"
            onClick={() => {
              setShowMenu(false);
              if (location.pathname === "/") {
                document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
              } else {
                navigate("/", { state: { scrollTo: "contact-section" } });
              }
            }}
          >
            <Link className="burger--menu-link">
              <TelIcon />
              <span className="link-text">Contáctanos</span>
            </Link>
          </li>
        </ul>
      </div>
    </Navbar>
  );
};

export default Menu;