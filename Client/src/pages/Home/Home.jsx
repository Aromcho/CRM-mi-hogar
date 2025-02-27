import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom"; // Corregir el import de Link
import { FiltersContext } from '../../context/FiltersContext';
import 'leaflet/dist/leaflet.css';
import "./Home.css";
import Title from "../../components/Title/Title.jsx";
import BackToTop from "../../components/BackToTop/BackToTop.jsx";
import SearchHomeForm from "../../components/SearchHomeForm/SearchHomeForm.jsx";
import HomeMap from "../../components/HomeMap/HomeMap.jsx";
import { Container } from "react-bootstrap";
import FromContact from "../../components/FormContact/FormContact.jsx";
import CategoryCarouselWeb from "../../components/CategoryCarouselWeb/CategoryCarouselWeb.jsx";
import FeaturedSection from "../../components/FeaturedSection/FeaturedSection.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { filters, updateFilters } = useContext(FiltersContext);
  const [isMobile, setIsMobile] = useState(false); // Nuevo estado para detectar si es mobile
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Función para verificar el tamaño de la pantalla
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 992); // Definir si es mobile con ancho <= 992px
    };

    checkIsMobile(); // Verificar en el primer renderizado

    // Agregar un listener para cambios de tamaño de pantalla
    window.addEventListener("resize", checkIsMobile);

    return () => {
      // Limpiar el listener al desmontar el componente
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem('fromHome', 'true');
    navigate("/propertylist", { state: { filters } }); // Redirigir a la lista de propiedades
  };

  useEffect(() => {
    if (location.state?.scrollTo === "contact-section") {
      const element = document.getElementById("contact-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const data = [
    {
      id: 1,
      name: "Casa Central LA IMPRENTA",
      direction: "Gorostiaga 1601",
      direction_b: "(Esquina Migueletes)",
      loc: { lat: -34.5652519, lon: -58.4364415 },
    },
    {
      id: 2,
      name: "BELGRANO C",
      direction: "Juramento 2102",
      direction_b: "1426 CABA",
      loc: { lat: -34.56051641836724, lon: -58.45384234503877 },
    },
    {
      id: 3,
      name: "BELGRANO R",
      direction: "Superí 1485",
      direction_b: "(Esquina Av. de los Incas)",
      loc: { lat: -34.5735786974359, lon: -58.46109912564103 },
    },
  ];
  return (
    <div className="layout transparent">
      <div className="hero-wrapper">
        
          
        <div className="container-form-serch align--center">
          <SearchHomeForm formData={filters} setFormData={updateFilters} handleSubmit={handleSubmit} />
        </div>
      </div>

      <div className="seleccion-section">
        <CategoryCarouselWeb />
      </div>
      {/*inversion sectin*/}
      <div className="destacados">
      <FeaturedSection />
      </div>
      
      
    </div>
  );
};

export default Home;
