import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const StepDetails = ({ propertyDetails, setPropertyDetails, onNext }) => {
  const [step, setStep] = useState(1);

  const handleInputChange = (field, value) => {
    setPropertyDetails({ ...propertyDetails, [field]: value });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" textAlign="center" mb={3}>
        Detalles de la Propiedad
      </Typography>

      {step === 1 && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Cantidad de habitaciones"
              type="number"
              fullWidth
              value={propertyDetails.room_amount || 0}
              onChange={(e) => handleInputChange('room_amount', +e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Cantidad de baños"
              type="number"
              fullWidth
              value={propertyDetails.bathroom_amount || 0}
              onChange={(e) => handleInputChange('bathroom_amount', +e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Cantidad de cocheras"
              type="number"
              fullWidth
              value={propertyDetails.parking_lot_amount || 0}
              onChange={(e) => handleInputChange('parking_lot_amount', +e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Antigüedad (en años)"
              type="number"
              fullWidth
              value={propertyDetails.age || 0}
              onChange={(e) => handleInputChange('age', +e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setStep(2)}
            >
              Siguiente
            </Button>
          </Grid>
        </Grid>
      )}

      {step === 2 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Metros cuadrados"
              type="number"
              fullWidth
              value={propertyDetails.total_surface || ''}
              onChange={(e) =>
                handleInputChange('total_surface', +e.target.value || 0)
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setStep(3)}
            >
              Siguiente
            </Button>
          </Grid>
        </Grid>
      )}

      {step === 3 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Descripción de la propiedad"
              multiline
              rows={4}
              fullWidth
              value={propertyDetails.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={onNext}
            >
              Finalizar
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default StepDetails;
