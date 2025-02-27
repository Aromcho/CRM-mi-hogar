import React from 'react';
import './StepConfirmation.css';

const StepConfirmation = ({ propertyDetails }) => {
  const {
    type,
    operations,
    location,
    address,
    room_amount,
    bathroom_amount,
    total_surface,
    age,
    description,
    photos,
  } = propertyDetails;

  return (
    <div className="step-confirmation-container">
      <h2 className="step-title">Confirmación de la Publicación</h2>

      {/* Información Básica */}
      <div>
        <h3 className="section-title">Información Básica</h3>
        <p className="info">Tipo de Propiedad: {type?.name || 'No especificado'}</p>
        <p className="info">Condición: {operations?.[0]?.operation_type || 'No especificada'}</p>
        <p className="info">Ciudad: {location?.name || 'No especificada'}</p>
      </div>

      {/* Detalles de la Propiedad */}
      <div>
        <h3 className="section-title">Detalles de la Propiedad</h3>
        <p className="info">Dirección: {address || 'No especificada'}</p>
        <p className="info">Habitaciones: {room_amount || 0}</p>
        <p className="info">Baños: {bathroom_amount || 0}</p>
        <p className="info">Superficie Total: {total_surface || 0} m²</p>
        <p className="info">Antigüedad: {age || 0} años</p>
        <p className="info">Descripción: {description || 'Sin descripción'}</p>
      </div>

      {/* Fotos */}
      <div>
        <h3 className="section-title">Imágenes</h3>
        <div className="image-container">
          {photos?.length > 0 ? (
            photos.map((photo, index) => (
              <div key={index} className="image-card">
                <img src={photo.image || ''} alt={`Imagen ${index + 1}`} />
                <p className="image-info">
                  {index === 0 ? 'Portada' : `Imagen ${index + 1}`}
                </p>
              </div>
            ))
          ) : (
            <p className="info">No se cargaron imágenes.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepConfirmation;
