import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import {
  MdHome,
  MdGpsFixed,
  MdFormatListBulleted,
  MdTableView,
  MdContacts,
  MdBarChart,
  MdLock,
  MdSecurity,
  MdMedicalServices,
  MdArticle,
  MdBookmarkAdded,
  MdChevronRight,
} from 'react-icons/md';

import "./SideBar.css";

const Sidebar = () => {
  const location = useLocation();
  const [menuState, setMenuState] = useState({});

  const isPathActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const toggleMenuState = (menu) => {
    setMenuState((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [menu]: !prev[menu],
    }));
  };

  useEffect(() => {
    onRouteChanged();
  }, [location]);

  const onRouteChanged = () => {
    document.querySelector('#sidebar')?.classList.remove('active');
    setMenuState({});
  };

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        {/* Profile */}
        <li className="nav-item nav-profile">
          <a href="#!" className="nav-link" onClick={(e) => e.preventDefault()}>
            <div className="nav-profile-image">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&s" alt="profile" />
              <span className="login-status online"></span>
            </div>
            <div className="nav-profile-text">
              <span className="font-weight-bold mb-2">David Grey. H</span>
              <span className="text-secondary text-small">Project Manager</span>
            </div>
            <MdBookmarkAdded className="nav-profile-badge icon-color" />
          </a>
        </li>

        {/* Dashboard */}
        <li className={`nav-item ${isPathActive('/') ? 'active' : ''}`}>
          <Link className="nav-link" to="/">
            <MdHome className="menu-icon icon-color" />
            <span className="menu-title">Analiticas</span>
          </Link>
        </li>

        <li className={`nav-item ${isPathActive('/properties') ? 'active' : ''}`}>
          <Link className="nav-link" to="/properties">
            <MdHome className="menu-icon icon-color" />
            <span className="menu-title">Propiedades</span>
          </Link>
        </li>

        {/* Basic UI Elements */}
        <li className={`nav-item ${isPathActive('/basic-ui') ? 'active' : ''}`}>
          <div className="nav-link" onClick={() => toggleMenuState('basicUiMenuOpen')}>
            <MdGpsFixed className="menu-icon icon-color" />
            <span className="menu-title">Basic UI Elements</span>
            <MdChevronRight className={`menu-arrow ${menuState.basicUiMenuOpen ? 'rotated' : ''}`} />
          </div>
          <Collapse in={menuState.basicUiMenuOpen}>
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"><Link className="nav-link" to="/basic-ui/buttons">Buttons</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/basic-ui/dropdowns">Dropdowns</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/basic-ui/typography">Typography</Link></li>
            </ul>
          </Collapse>
        </li>

        {/* Tables */}
        <li className={`nav-item ${isPathActive('/tables') ? 'active' : ''}`}>
          <div className="nav-link" onClick={() => toggleMenuState('tablesMenuOpen')}>
            <MdTableView className="menu-icon icon-color" />
            <span className="menu-title">Tables</span>
            <MdChevronRight className={`menu-arrow ${menuState.tablesMenuOpen ? 'rotated' : ''}`} />
          </div>
          <Collapse in={menuState.tablesMenuOpen}>
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"><Link className="nav-link" to="/tables/basic-table">Basic Table</Link></li>
            </ul>
          </Collapse>
        </li>

        {/* Charts */}
        <li className={`nav-item ${isPathActive('/charts') ? 'active' : ''}`}>
          <div className="nav-link" onClick={() => toggleMenuState('chartsMenuOpen')}>
            <MdBarChart className="menu-icon icon-color" />
            <span className="menu-title">Portales</span>
            <MdChevronRight className={`menu-arrow ${menuState.chartsMenuOpen ? 'rotated' : ''}`} />
          </div>
          <Collapse in={menuState.chartsMenuOpen}>
            <ul className="nav flex-column sub-menu">
            <li className="nav-item"><Link className="nav-link" to="/charts/chart-js">MI HOGAR</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/charts/chart-js">ZONAPROP</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/charts/chart-js">ARGENPROP</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/charts/chart-js">MERCADOLIBRE</Link></li>
            </ul>
          </Collapse>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
