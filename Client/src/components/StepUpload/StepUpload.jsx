import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardActions,
} from '@mui/material';
import { useState } from 'react';

const StepUpload = ({ propertyDetails = { photos: [] }, setPropertyDetails }) => {
  const handlePickImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImage = {
        description: '',
        image: URL.createObjectURL(file), // Generate preview URL
        original: file,
        thumb: URL.createObjectURL(file),
        is_blueprint: false,
        is_front_cover: propertyDetails?.photos?.length === 0, // First image as cover
        order: propertyDetails?.photos?.length || 0,
      };

      setPropertyDetails({
        ...propertyDetails,
        photos: [...(propertyDetails.photos || []), newImage],
      });
    }
  };

  const handleRemoveImage = (image) => {
    const updatedPhotos = propertyDetails.photos.filter(
      (photo) => photo.image !== image
    );
    setPropertyDetails({ ...propertyDetails, photos: updatedPhotos });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" textAlign="center" mb={3}>
        Subir Imágenes de la Propiedad
      </Typography>

      <Box textAlign="center" mb={3}>
        <Button
          variant="contained"
          component="label"
          color="primary"
          sx={{ textTransform: 'none' }}
        >
          Seleccionar Imagen
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handlePickImage}
          />
        </Button>
      </Box>

      <Grid container spacing={2}>
        {propertyDetails?.photos?.length > 0 ? (
          propertyDetails.photos.map((photo, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={photo.image}
                  alt={`Imagen ${index + 1}`}
                />
                <CardActions>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleRemoveImage(photo.image)}
                  >
                    Eliminar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" textAlign="center" width="100%">
            No se han cargado imágenes aún.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default StepUpload;
