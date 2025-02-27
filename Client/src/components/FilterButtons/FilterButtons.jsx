import React, { useContext, useState } from 'react';
import { FiltersContext } from '../../context/FiltersContext';
import HomeMap from '../HomeMap/HomeMap';
import './FilterButtons.css';

const FilterButtons = () => {
  const { filters, updateFilters } = useContext(FiltersContext);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const toggleFilter = (filter) => {
    const updatedOperationType = filters.operation_type.includes(filter)
      ? filters.operation_type.filter((item) => item !== filter)
      : [...filters.operation_type, filter];

    updateFilters({ operation_type: updatedOperationType });
  };

  const openMapModal = () => setIsMapModalOpen(true);
  const closeMapModal = () => setIsMapModalOpen(false);

  return (
    <div className="filter-buttons">
      <button
        className={`filter-button ${filters.operation_type.includes('Alquiler') ? 'active' : ''}`}
        onClick={() => toggleFilter('Alquiler')}
      >
        Alquiler
      </button>
      <button
        className={`filter-button ${filters.operation_type.includes('Venta') ? 'active' : ''}`}
        onClick={() => toggleFilter('Venta')}
      >
        Venta
      </button>
      <button className="filter-button map-button" onClick={openMapModal}>
        📍 Mapa
      </button>

      {/* Modal del Mapa */}
      {isMapModalOpen && (
        <div className="map-modal-overlay" onClick={closeMapModal}>
          <div className="map-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeMapModal}>✖</button>
            <HomeMap />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButtons;
