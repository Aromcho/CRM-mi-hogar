import useProperties from "../hooks/useProperties";
import { Container, Row, Col } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Skeleton from "@mui/material/Skeleton";
import Item from "./Item/Item.jsx";

const PropertyList = () => {
  const { properties, loading, error } = useProperties();

  return (
    <Container className="px-0">
      <div className="item-list">
        {loading ? (
          [...Array(4)].map((_, index) => (
            <div className="Item mb-2" key={index}>
              <Skeleton variant="rectangular" height={300} />
              <div className="card-body">
                <Skeleton variant="text" width="80%" height={30} />
                <Skeleton variant="text" width="60%" />
              </div>
            </div>
          ))
        ) : properties.length > 0 ? (
          properties.map((property) => (
            <Item className="Item" key={property.id} property={property} />
          ))
        ) : (
          <p>No se encontraron propiedades de Belga Inmobiliaria.</p>
        )}
      </div>
    </Container>
  );
};

export default PropertyList;
