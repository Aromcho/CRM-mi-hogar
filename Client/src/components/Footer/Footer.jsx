import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedin, FaYoutube, FaApple, FaGooglePlay, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* 📲 Redes Sociales */}
        <div className="footer-section footer-social">
          <h3 className="footer-title">¡Síguenos en nuestras redes!</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
          </div>
        </div>

        {/* 📝 Información */}
        <div className="footer-section footer-info">
          <h3 className="footer-title">Sobre Nosotros</h3>
          <p>
            Explora propiedades únicas con una experiencia optimizada. ¡Descarga nuestra app y descubre tu próximo hogar!
          </p>
          <Link to="/terms" className="footer-link">Términos y Condiciones</Link>
        </div>

        {/* 📱 Descarga de Apps */}
        <div className="footer-section footer-apps">
          <h3 className="footer-title">Descarga la App</h3>
          <div className="app-buttons">
            <a href="#" target="_blank" rel="noopener noreferrer" className="app-button google-play">
              <FaGooglePlay /> Google Play
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="app-button app-store">
              <FaApple /> App Store
            </a>
            <p>&copy; {new Date().getFullYear()} Mi Hogar. Todos los derechos reservados.</p>

          </div>
        </div>
      </div>

      
    </footer>
  );
};

export default Footer;
