import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropertyForm from './PropertyForm/PropertyForm.jsx';

const UtilsListBar = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="utils-list-bar">
            <Button variant="primary" onClick={handleShow}>
                Crear Propiedad
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Propiedad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PropertyForm /> {/* 🔥 Aquí renderizamos el formulario */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary">
                        Guardar Propiedad
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UtilsListBar;