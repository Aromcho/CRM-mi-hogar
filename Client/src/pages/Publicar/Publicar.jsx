import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import StepTypeAndCondition from '../../components/StepTypeAndCondition/StepTypeAndCondition';
import StepLocation from '../../components/StepLocation/StepLocation';
import StepDetails from '../../components/StepDetails/StepDetails';
import StepUpload from '../../components/StepUpload/StepUpload';
import StepConfirmation from '../../components/StepConfirmation/StepConfirmation';
import axios from 'axios';
import './Publicar.css';

const steps = [
  'Tipo y Condición',
  'Ubicación',
  'Detalles',
  'Subir Imágenes',
  'Confirmación',
];

const Publicar = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [propertyDetails, setPropertyDetails] = useState({
    address: '',
    age: 0,
    bathroom_amount: 0,
    room_amount: 0,
    total_surface: 0,
    roofed_surface: 0,
    suite_amount: 0,
    location: {
      divisions: [],
      full_location: '',
      name: '',
      geo_lat: 0,
      geo_long: 0,
    },
    branch: {
      address: '',
      name: '',
      phone: '',
      email: '',
    },
    disposition: '',
    photos: [],
    type: {
      code: '',
      id: null,
      name: '',
    },
    operations: [
      {
        operation_type: '',
        prices: [{ currency: 'USD', price: 0 }],
      },
    ],
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(propertyDetails));
      propertyDetails.photos.forEach((photo, index) => {
        formData.append(`photos[${index}]`, photo);
      });

      const response = await axios.post(
        'http://belga.com.ar:6080/api/property',
        formData
      );

      if (response.status === 200) {
        navigate('/success');
      } else {
        alert('Error al publicar la propiedad');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al publicar la propiedad');
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <StepTypeAndCondition
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
          />
        );
      case 1:
        return (
          <StepLocation
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
          />
        );
      case 2:
        return (
          <StepDetails
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
          />
        );
      case 3:
        return (
          <StepUpload
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
          />
        );
      case 4:
        return <StepConfirmation propertyDetails={propertyDetails} />;
      default:
        return null;
    }
  };

  return (
    <div className="publicar-container">
      <Stepper activeStep={activeStep} className="stepper">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="step-content">{renderStepContent(activeStep)}</div>
      <div className="button-container">
        {activeStep > 0 && (
          <Button
            variant="outlined"
            onClick={handleBack}
            className="button-back"
          >
            Atrás
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleNext}
          className="button-next"
        >
          {activeStep === steps.length - 1 ? 'Publicar' : 'Siguiente'}
        </Button>
      </div>
    </div>
  );
};

export default Publicar;
