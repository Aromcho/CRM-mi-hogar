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
} from '@mui/material';
import { locationsData } from '../../data/locationsData';

const StepLocation = ({ propertyDetails, setPropertyDetails, onNext }) => {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
  const [address, setAddress] = useState('');
  const [step, setStep] = useState(1);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setNeighborhoods(locationsData[city] || []);

    if (locationsData[city]?.length > 0) {
      setStep(2); // Avanzar automáticamente al paso 2 si hay barrios
    } else {
      alert(`No hay barrios disponibles para ${city}. Por favor, elija otra ciudad.`);
    }

    setPropertyDetails({
      ...propertyDetails,
      location: {
        ...propertyDetails.location,
        name: city,
        divisions: [],
        full_location: '',
      },
    });
  };

  const handleNeighborhoodSelect = (neighborhood) => {
    setSelectedNeighborhood(neighborhood);

    setPropertyDetails({
      ...propertyDetails,
      location: {
        ...propertyDetails.location,
        divisions: [neighborhood],
        full_location: `${address}, ${selectedCity}, ${neighborhood}`,
      },
    });

    setStep(3); // Avanzar automáticamente al paso 3
  };

  const handleAddressChange = (text) => {
    setAddress(text);

    setPropertyDetails({
      ...propertyDetails,
      location: {
        ...propertyDetails.location,
        full_location: `${text}, ${selectedCity}, ${selectedNeighborhood}`,
      },
      address: text,
    });
  };

  const handleAddressSubmit = () => {
    if (!address.trim()) {
      alert('Por favor, ingrese una dirección válida.');
      return;
    }
    if (onNext) {
      onNext(); // Avanzar automáticamente al siguiente paso
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Paso 1: Seleccionar Ciudad */}
      {step === 1 && (
        <>
          <Typography variant="h4" textAlign="center" mb={3}>
            Ubicación de la Propiedad
          </Typography>
          <Typography variant="h6" mb={2}>
            Seleccione la ciudad:
          </Typography>
          <Grid container spacing={2}>
            {Object.keys(locationsData).map((city) => (
              <Grid item xs={6} md={4} key={city}>
                <Card
                  sx={{
                    backgroundColor: selectedCity === city ? '#8559A8' : '#fff',
                    color: selectedCity === city ? '#fff' : '#333',
                    border: '2px solid #8559A8',
                  }}
                >
                  <CardActionArea onClick={() => handleCitySelect(city)}>
                    <CardContent>
                      <Typography variant="h6" textAlign="center">
                        {city}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Paso 2: Seleccionar Barrio */}
      {step === 2 && (
        <>
          <Typography variant="h4" textAlign="center" mb={3}>
            Ubicación de la Propiedad
          </Typography>
          <Typography variant="h6" mb={2}>
            Seleccione el barrio:
          </Typography>
          <Grid container spacing={2}>
            {neighborhoods.map((neighborhood) => (
              <Grid item xs={6} md={4} key={neighborhood}>
                <Card
                  sx={{
                    backgroundColor:
                      selectedNeighborhood === neighborhood ? '#8559A8' : '#fff',
                    color: selectedNeighborhood === neighborhood ? '#fff' : '#333',
                    border: '2px solid #8559A8',
                  }}
                >
                  <CardActionArea
                    onClick={() => handleNeighborhoodSelect(neighborhood)}
                  >
                    <CardContent>
                      <Typography variant="h6" textAlign="center">
                        {neighborhood}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Paso 3: Ingresar Dirección */}
      {step === 3 && (
        <>
          <Typography variant="h4" textAlign="center" mb={3}>
            Ubicación de la Propiedad
          </Typography>
          <Typography variant="h6" mb={2}>
            Ingrese la dirección:
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ej: Gorostiaga 1601"
            value={address}
            onChange={(e) => handleAddressChange(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleAddressSubmit();
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleAddressSubmit}
          >
            Continuar
          </Button>
        </>
      )}
    </Box>
  );
};

export default StepLocation;
