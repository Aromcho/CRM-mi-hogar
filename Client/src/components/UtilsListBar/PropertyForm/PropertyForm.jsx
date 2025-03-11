import React from 'react';
import { Form } from 'react-bootstrap';

const PropertyForm = () => {
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" placeholder="Ingrese la dirección" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Cantidad de habitaciones</Form.Label>
                <Form.Control type="number" placeholder="Ej: 3" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Cantidad de baños</Form.Label>
                <Form.Control type="number" placeholder="Ej: 2" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Latitud</Form.Label>
                <Form.Control type="text" placeholder="Ej: -34.6037" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Longitud</Form.Label>
                <Form.Control type="text" placeholder="Ej: -58.3816" />
            </Form.Group>
        </Form>
    );
};

export default PropertyForm;
