import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FiltersContext } from '../../context/FiltersContext';
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css';
import { useParams, useNavigate } from 'react-router-dom';

const ItemListContainer = () => {
  const [properties, setProperties] = useState([]);
  // const { properties } = useContext(FiltersContext);
  const { tipo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:4002/properties/by-agent/67c9cece49c7dd479c5fdb79');
        const data = await response.json();
        // Assuming you have a method to set properties in your context
        setProperties(data.properties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);
  useEffect(() => {
    
    const fromHome = sessionStorage.getItem('fromHome');

    if (!fromHome) {
      // Restaurar la posición del scroll solo si no viene desde Home
      const scrollPosition = parseInt(sessionStorage.getItem('scrollPosition'), 10);
      if (scrollPosition && !isNaN(scrollPosition)) {
        window.scrollTo(0, scrollPosition);
      }
    } else {
      // Remover la bandera después de la primera navegación
      sessionStorage.removeItem('fromHome');
    }

    return () => {
      // Guardar la posición de scroll en el desmontaje
      sessionStorage.setItem('scrollPosition', window.scrollY);
    };
  }, []);

  const handlePropertyClick = (propertyId) => {
    // Guardar la posición actual antes de navegar
    sessionStorage.setItem('scrollPosition', window.scrollY);
    navigate(`/property/${propertyId}`);
  };

  return (
    <Container className="item-list-container">
      <ItemList properties={properties} onPropertyClick={handlePropertyClick} />
    </Container>
  );
};

export default ItemListContainer;
