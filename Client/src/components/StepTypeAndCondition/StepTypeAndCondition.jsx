import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';

const StepTypeAndCondition = ({ propertyDetails, setPropertyDetails, onNext }) => {
  const [step, setStep] = useState(1);
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('USD'); // Default currency

  const handleSetPropertyType = (type, code, id) => {
    setPropertyDetails({
      ...propertyDetails,
      type: { name: type, code, id },
    });
    setStep(2);
  };

  const handleSetCondition = (condition) => {
    setPropertyDetails({
      ...propertyDetails,
      operations: [
        {
          ...propertyDetails.operations?.[0],
          operation_type: condition,
        },
      ],
    });
    setStep(3);
  };

  const handleSetPrice = () => {
    if (!price.trim() || parseFloat(price) <= 0) {
      alert('Por favor, ingrese un precio válido.');
      return;
    }

    setPropertyDetails({
      ...propertyDetails,
      operations: [
        {
          ...propertyDetails.operations?.[0],
          prices: [{ currency, price: parseFloat(price) }],
        },
      ],
    });

    if (onNext) {
      onNext();
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      {step === 1 && (
        <>
          <Typography variant="h4" textAlign="center" mb={3}>
            Detalles de la Propiedad
          </Typography>
          <Typography variant="h6" mb={2}>
            Seleccione el tipo de propiedad:
          </Typography>
          <Grid container spacing={2}>
            {[
              { type: 'Casa', icon: 'home', code: 'HS', id: 1 },
              { type: 'Departamento', icon: 'city', code: 'AP', id: 2 },
              { type: 'Local Comercial', icon: 'storefront', code: 'CM', id: 3 },
              { type: 'Terreno', icon: 'tree', code: 'LD', id: 4 },
              { type: 'PH', icon: 'office-building', code: 'PH', id: 5 },
              { type: 'Oficina', icon: 'desk', code: 'OF', id: 6 },
              { type: 'Cochera', icon: 'garage', code: 'PK', id: 7 },
              { type: 'Otro', icon: 'domain', code: 'OT', id: 8 },
            ].map((item) => (
              <Grid item xs={6} sm={4} md={3} key={item.type}>
                <Card
                  sx={{
                    backgroundColor:
                      propertyDetails?.type?.name === item.type ? '#8559A8' : '#fff',
                    color: propertyDetails?.type?.name === item.type ? '#fff' : '#333',
                    border: '2px solid #8559A8',
                  }}
                >
                  <CardActionArea onClick={() => handleSetPropertyType(item.type, item.code, item.id)}>
                    <CardContent>
                      <Typography variant="h6" textAlign="center">
                        {item.type}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {step === 2 && (
        <>
          <Typography variant="h4" textAlign="center" mb={3}>
            Condición de la Propiedad
          </Typography>
          <Grid container spacing={2}>
            {[
              { condition: 'venta', label: 'Venta' },
              { condition: 'alquiler', label: 'Alquiler' },
              { condition: 'temporal', label: 'Temporal' },
            ].map((item) => (
              <Grid item xs={12} sm={4} key={item.condition}>
                <Button
                  variant={
                    propertyDetails?.operations?.[0]?.operation_type === item.condition
                      ? 'contained'
                      : 'outlined'
                  }
                  fullWidth
                  onClick={() => handleSetCondition(item.condition)}
                >
                  {item.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {step === 3 && (
        <>
          <Typography variant="h4" textAlign="center" mb={3}>
            Ingrese el precio de la propiedad
          </Typography>
          <ToggleButtonGroup
            value={currency}
            exclusive
            onChange={(e, value) => setCurrency(value)}
            sx={{ marginBottom: 2 }}
          >
            <ToggleButton value="USD">USD</ToggleButton>
            <ToggleButton value="ARS">ARS</ToggleButton>
          </ToggleButtonGroup>
          <TextField
            label="Precio"
            fullWidth
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSetPrice();
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleSetPrice}
          >
            Continuar
          </Button>
        </>
      )}
    </Box>
  );
};

export default StepTypeAndCondition;
