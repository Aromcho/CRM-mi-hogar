import React from 'react';
import { FaClock, FaHome, FaCity, FaBuilding, FaTree, FaKey, FaWarehouse, FaStore, FaLandmark } from 'react-icons/fa';
import './CategoryCarouselWeb.css';

const CategoryCarouselWeb = () => {
  const propertyTypeOptions = [
    { value: 'Temporal', label: 'Temporal', icon: <FaClock /> },
    { value: 'Casa', label: 'Casa', icon: <FaHome /> },
    { value: 'Departamento', label: 'Departamento', icon: <FaCity /> },
    { value: 'PH', label: 'PH', icon: <FaBuilding /> },
    { value: 'Terreno', label: 'Terrenos', icon: <FaTree /> },
    { value: 'Oficina', label: 'Oficinas', icon: <FaKey /> },
    { value: 'Cochera', label: 'Cocheras', icon: <FaWarehouse /> },
    { value: 'Local', label: 'Locales', icon: <FaStore /> },
    { value: 'Edificio', label: 'Edificios', icon: <FaLandmark /> },
  ];

  return (
    <div className="category-carousel">
      {/* Versión de Escritorio */}
      <div className="category-desktop">
        <div className="row">
          {propertyTypeOptions.slice(0, 4).map((category, index) => (
            <div key={index} className="category-card">
              <div className="category-icon">{category.icon}</div>
              <div className="category-label">{category.label}</div>
            </div>
          ))}
        </div>
        <div className="row">
          {propertyTypeOptions.slice(4).map((category, index) => (
            <div key={index} className="category-card">
              <div className="category-icon">{category.icon}</div>
              <div className="category-label">{category.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Versión de Móvil */}
      <div className="category-mobile">
        <div className="category-scroll">
          {propertyTypeOptions.map((category, index) => (
            <div key={index} className="category-card-mobile">
              <div className="category-icon">{category.icon}</div>
              <div className="category-label">{category.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCarouselWeb;
