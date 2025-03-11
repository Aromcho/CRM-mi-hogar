import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from "../../components/SideBar/SideBar.jsx";
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario

  
  
  return (
    <div className="admin-container d-flex mt-4 pt-4">
        <>
          {/* Pasamos los datos del usuario como props al componente SideBar */}
          
        </>
      
    </div>
  );
};

export default Admin;
