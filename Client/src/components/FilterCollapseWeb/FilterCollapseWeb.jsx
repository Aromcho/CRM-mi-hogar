import React, { useContext } from 'react';
import { Form, Button, Row, Col, Collapse, Container } from 'react-bootstrap';
import { FaCashRegister, FaKey, FaClock, FaHome, FaCity, FaTree, FaBuilding, FaWarehouse, FaSlidersH } from 'react-icons/fa';
import { FiltersContext } from '../../context/FiltersContext';
import './FilterCollapseWeb.css';

const FilterCollapseWeb = () => {
  const { filters, updateFilters } = useContext(FiltersContext);
  const [showAdvancedFilters, setShowAdvancedFilters] = React.useState(false);

  const handleToggleOperationType = (type) => {
    const updatedOperationType = filters.operation_type.includes(type)
      ? filters.operation_type.filter((item) => item !== type)
      : [...filters.operation_type, type];

    updateFilters({ operation_type: updatedOperationType });
  };

  const handleTogglePropertyType = (type) => {
    const updatedPropertyType = filters.property_type.includes(type)
      ? filters.property_type.filter((item) => item !== type)
      : [...filters.property_type, type];

    updateFilters({ property_type: updatedPropertyType });
  };

  const handleFormChange = (field, value) => {
    updateFilters({ [field]: value });
  };

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  const propertyTypeOptions = [ 
    { value: 'Casa', label: 'Casa', icon: <FaHome /> },
    { value: 'Departamento', label: 'Departamento', icon: <FaCity /> },
    { value: 'PH', label: 'PH', icon: <FaHome /> },
    { value: 'Terreno', label: 'Terrenos', icon: <FaTree /> },
    { value: 'Oficina', label: 'Oficinas', icon: <FaBuilding /> },
    { value: 'Cochera', label: 'Cocheras', icon: <FaWarehouse /> },
    { value: 'Locale', label: 'Locales', icon: <FaBuilding /> },
  ];

  return (
    <Container className="filter-collapse-web">
      <div className="filter-section">
        

        {/* Filtro por Tipo de Propiedad */}
        <h5 className="filter-title">Tipo de Propiedad</h5>
        <Row className="filter-options">
          {propertyTypeOptions.map((property, index) => (
            <Col key={index} xs={6} md={3}>
              <Button
                variant={filters.property_type.includes(property.value) ? 'primary' : 'outline-secondary'}
                className="filter-button"
                onClick={() => handleTogglePropertyType(property.value)}
              >
                {property.icon}
                <span className="filter-button-text">{property.label}</span>
              </Button>
            </Col>
          ))}
        </Row>

        {/* Filtros por Habitaciones y Cocheras */}
        <Collapse in={showAdvancedFilters}>
          <div className="advanced-filters mt-3">
            <h5 className="filter-title">Dormitorios (min - max)</h5>
            <Row>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Mínimo"
                  value={filters.min_rooms || ''}
                  onChange={(e) => handleFormChange('min_rooms', parseInt(e.target.value) || undefined)}
                />
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Máximo"
                  value={filters.max_rooms || ''}
                  onChange={(e) => handleFormChange('max_rooms', parseInt(e.target.value) || undefined)}
                />
              </Col>
            </Row>

            <h5 className="filter-title mt-3">Cocheras (min - max)</h5>
            <Row>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Mínimo"
                  value={filters.min_garages || ''}
                  onChange={(e) => handleFormChange('min_garages', parseInt(e.target.value) || undefined)}
                />
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Máximo"
                  value={filters.max_garages || ''}
                  onChange={(e) => handleFormChange('max_garages', parseInt(e.target.value) || undefined)}
                />
              </Col>
            </Row>
          </div>
        </Collapse>

        {/* Botones de Acción */}
        <div className="filter-actions mt-4">
          <Button variant="success" onClick={() => console.log('Filtros aplicados', filters)}>
            Aplicar Filtros
          </Button>
          <Button variant="outline-dark" onClick={toggleAdvancedFilters} className="ms-2">
            <FaSlidersH /> Filtros Avanzados
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default FilterCollapseWeb;
