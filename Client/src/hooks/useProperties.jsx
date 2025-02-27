import { useEffect, useState } from "react";
import axios from "axios";

const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Hacer la solicitud al microservicio de propiedades en el puerto 4002
        const response = await axios.get("http://localhost:4002/properties", {
          params: { "branch.id": 713 }, // Filtramos por el ID de la inmobiliaria Belga
        });

        setProperties(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, loading, error };
};

export default useProperties;
