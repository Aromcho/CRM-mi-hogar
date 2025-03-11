import React, { useEffect, useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { FiltersProvider } from "./context/FiltersContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ReactGA from "react-ga4";
import ProtectedRoute from "./context/ProtectedRoute";

/* Componentes */
import Menu from "./components/Menu/Menu.jsx";
import Sidebar from "./components/SideBar/SideBar.jsx";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import Publicar from "./pages/Publicar/Publicar.jsx";
import Error404 from "./pages/404/404.jsx";
import Error500 from "./pages/500/500.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Blog from "./pages/Blog/Blog.jsx";
import BlogDetail from "./pages/Blog/BlogDetail/BlogDetail.jsx";
import Print from "./components/Print/Print.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Cargando from "./pages/Cargando/Cargando.jsx";

/* Importa el archivo de estilos */
import "./App.css";

function AppContent() {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  // 🔥 Evitar que se muestre el contenido mientras está cargando
  if (loading) return <div> <Cargando />  </div>;

  return (
    <FiltersProvider>
      <div className="app-container">
        {/* 🔥 Mostrar Sidebar solo si el usuario está autenticado */}
        {user && <Sidebar />}

        <div className="content-container">
          <Menu />

          <Routes>
            {/* ✅ Bloquear login si el usuario ya está autenticado */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ✅ Agrupar rutas protegidas dentro de `ProtectedRoute` */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/properties" element={<ItemListContainer />} />
              <Route path="/propiedad/:id" element={<ItemDetailContainer />} />
              <Route path="/propertyDetail/:id" element={<ItemDetailContainer />} />
              <Route path="/publicar" element={<Publicar />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/print" element={<Print />} />
              <Route path="/venta/:tipo" element={<ItemListContainer />} />
            </Route>

            {/* Rutas de error */}
            <Route path="/404" element={<Error404 />} />
            <Route path="/500" element={<Error500 />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </div>
      </div>
    </FiltersProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
