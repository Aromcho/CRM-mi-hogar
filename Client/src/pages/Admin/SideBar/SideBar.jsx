import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import NavBar from '../BlogAdmin/NavBar/NavBar';
import UserManagement from '../UserManagement/UserManagement';
import ItemListContainer from '../../../components/ItemListContainer/ItemListContainer';
import PropertyList from '../../../components/PropertyList';
import './SideBar.css';
import { theme } from '../../../helpers/theme';
import axios from 'axios';

const SideBar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/sessions/online', { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return <div>Loading...</div>; // O cualquier otro indicador de carga
  }


  const name = "Belga";
  const email = "belga@gmail.com";

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
        style={{ flexGrow: 1 }}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  };

  const a11yProps = (index) => {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  };

  return (
    <Box className="d-flex">
      <Box className="sidebar-container" sx={{ bgcolor: '#f5f5f5', borderRight: 1, borderColor: 'divider' }}>
        <div className="user-section text-center p-4">
          <Avatar alt={name} src="/static/images/avatar/1.jpg" className="mx-auto" />
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2">{email}</Typography>
          <button className="btn-logout w-100" >Logout</button>
        </div>

        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            '.Mui-selected': {
              color: "#6495ED",  // Cambia el color del tab activo
            },
            '& .MuiTabs-indicator': {
              backgroundColor: "#6495ED",  // Cambia el color del indicador activo
            },
            '& .MuiTab-root.Mui-selected': {
              color: "#6495ED",  // Cambia el color del texto activo de las pestañas
            },
          }}
        >
          
          <Tab label={<span className="tab-text"><i className="bi bi-journal-text"></i> Blog de noticias</span>} {...a11yProps(0)} />
          <Tab label={<span className="tab-text"><i className="bi bi-people"></i> Usuarios</span>} {...a11yProps(1)} />
          <Tab label={<span className="tab-text"><i className="bi bi-send"></i> Envíos de mails</span>} {...a11yProps(2)} />
          <Tab label={<span className="tab-text"><i className="bi bi-file-earmark-text"></i> Propiedades</span>} {...a11yProps(3)} />
          <Tab label={<span className="tab-text"><i className="bi bi-file-earmark-text"></i> Portales</span>} {...a11yProps(4)} />

        </Tabs>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <TabPanel value={value} index={0}>
          <NavBar />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserManagement />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography variant="h6">Contenido de Envíos de mails</Typography>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ItemListContainer />
        </TabPanel>
        <TabPanel value={value} index={4}>
        <PropertyList />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default SideBar;