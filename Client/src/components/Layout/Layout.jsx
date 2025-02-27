import React from "react";
import "./Layout.css"; // Archivo CSS para los estilos globales y específicos
//import Footer from "../../Frontend/src/components/Footer/Footer.jsx";
import { TelIcon, WhatsappIcon } from "../../components/Icons/Icons.jsx";
import { FaEnvelope } from "react-icons/fa"; // Importa el icono de correo

const Layout = ({ children, menuTheme, footerSmall }) => {
  return (
    <div className="layout-wrapper">
      {children} {/* Aquí se renderizan las rutas */}
      
    </div>
  );
};

export default Layout;
