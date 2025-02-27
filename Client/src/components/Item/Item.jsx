import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaBed, FaShower, FaCar, FaRulerCombined } from "react-icons/fa";
import "./Item.css";

const Item = ({ property }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = async () => {
    try {
      const product = {
        id: property.id,
        name: property.publication_title || property.address || 'Producto sin nombre',
        price: property.operations[0]?.prices[0]?.price || 0,
        photos: property.photos?.[0]?.image || 'default-image.jpg'
      };
  
      if (!isFavorited) {
        const response = await fetch('/api/cookies/set-product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ product }),
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Error al guardar el producto en la cookie');
      } else {
        const response = await fetch(`/api/cookies/delete-product/${product.id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Error al eliminar el producto de la cookie');
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error('Error al manejar la cookie del producto:', error);
    }
  };

  useEffect(() => {
    const checkIfFavorited = async () => {
      try {
        const response = await fetch('/api/cookies/get-products');
        if (!response.ok) throw new Error('Error al obtener las cookies de productos');
        const data = await response.json();
        const favoritedProducts = data.products || [];
        const isFav = favoritedProducts.some(prod => prod.id === property.id);
        setIsFavorited(isFav);
      } catch (error) {
        console.error('Error al obtener las cookies de productos:', error);
      }
    };
    checkIfFavorited();
  }, [property.id]);

  const imageUrl = property.photos?.[0]?.image || 'https://via.placeholder.com/300x200';
  const price = property.operations[0]?.prices[0]?.price 
    ? `${property.operations[0].prices[0].currency === 'USD' ? 'USD' : '$'} ${property.operations[0].prices[0].price.toLocaleString('es-ES')}`
    : 'Precio no disponible';
  const operationType = property.operations[0]?.operation_type || 'N/A';
  const bedrooms = property.suite_amount || 0;
  const bathrooms = property.bathroom_amount || 0;
  const parkingLots = property.parking_lot_amount || 0;
  const size = property.total_surface || 0; 
  const address = property.address || 'Dirección no disponible'; 
  const barrio = property.location?.name || 'Barrio no disponible'; 
  const propertyId = property.id;

  return (
    <div className="card-item">
      <Link to={`/propiedad/${propertyId}`} className="link-full">
        {/* Imagen y Favorito */}
        <div className="image-container">
          <img src={imageUrl} alt={address} className="card-image" />
          <div className="favorite-icon" onClick={(e) => { e.preventDefault(); toggleFavorite(); }}>
            <FaHeart className={`heart-icon ${isFavorited ? 'favorited' : ''}`} />
          </div>
        </div>

        {/* Información Principal */}
        <div className="card-content">
          <div className="card-header">
            <span className="operation-type">{operationType}</span>
            <span className="price-item">{price}</span>
          </div>
          <h3 className="address">{address}</h3>
          <p className="barrio">{barrio}</p>
        </div>

        {/* Información Adicional */}
        <div className="card-info">
          {size > 0 && (
            <div className="info-item-icon">
              <FaRulerCombined />
              <span>{size} m²</span>
            </div>
          )}
          {bedrooms > 0 && (
            <div className="info-item-icon">
              <FaBed />
              <span>{bedrooms} Hab.</span>
            </div>
          )}
          {bathrooms > 0 && (
            <div className="info-item-icon">
              <FaShower />
              <span>{bathrooms} Baños</span>
            </div>
          )}
          {parkingLots > 0 && (
            <div className="info-item-icon">
              <FaCar />
              <span>{parkingLots} Coch.</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Item;
