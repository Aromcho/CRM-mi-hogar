import React, { useState, useEffect } from 'react';
import './FeaturedSection.css';
import axios from 'axios';
import SkeletonCard from '../SkeletonCard/SkeletonCard';
import Item from '../Item/Item';
import { FaHome, FaBuilding, FaWarehouse, FaCity, FaCar, FaRegBuilding, FaStore, FaLandmark } from 'react-icons/fa';

const FeaturedSection = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState({});

  const propertyTypes = [
    { type: 'Casa', title: 'Casas', icon: <FaHome /> },
    { type: 'Departamento', title: 'Departamentos', icon: <FaBuilding /> },
    { type: 'PH', title: 'PH', icon: <FaWarehouse /> },
    { type: 'Terreno', title: 'Terrenos', icon: <FaLandmark /> },
    { type: 'Oficina', title: 'Oficinas', icon: <FaRegBuilding /> },
    { type: 'Cochera', title: 'Cocheras', icon: <FaCar /> },
    { type: 'Local', title: 'Locales', icon: <FaStore /> },
  ];

  useEffect(() => {
    const fetchData = async (type) => {
      setLoading((prev) => ({ ...prev, [type]: true }));
      try {
        const response = await axios.get('/api/property/properties/', {
          params: { limit: 5, property_type: type },
        });
        setData((prev) => ({ ...prev, [type]: response.data.objects }));
      } catch (error) {
        console.error(`Error al obtener propiedades para ${type}:`, error);
      } finally {
        setLoading((prev) => ({ ...prev, [type]: false }));
      }
    };

    propertyTypes.forEach(({ type }) => fetchData(type));
  }, []);

  return (
    <div className="featured-section">
      {propertyTypes.map(({ type, title, icon }) => (
        <div key={type} className="section-container">
          <div className="section-title-cont">
            <div className="section-title-icon">{icon}</div>
            <h2 className="section-title">{title}</h2>
          </div>
          {loading[type] ? (
            <div className="card-scroll">
              {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : data[type]?.length > 0 ? (
            <div className="card-scroll">
              {data[type].map((item) => (
                <Item key={item._id} property={item} />
              ))}
            </div>
          ) : (
            <p className="empty-text">No se encontraron {title.toLowerCase()}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeaturedSection;
