import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaStore } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import '../styles/layout.css';

function Layout(props) {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);

  const handleUserDropdown = () => {
    setUserDropdownOpen(prevState => !prevState);
    setStoreDropdownOpen(false);
  };
  
  const handleStoreDropdown = () => {
    setStoreDropdownOpen(prevState => !prevState);
    setUserDropdownOpen(false);
  };


  return (
    <div className="layout">
      <nav>
        <div className="icon-container">
          <Dropdown show={userDropdownOpen} onToggle={handleUserDropdown}>
            <Dropdown.Toggle id="dropdown-basic">
              <FaUser size={20} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/user/profile">Perfil</Dropdown.Item>
              <Dropdown.Item href="/user/settings">Configuración</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/user/logout">Cerrar sesión</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown show={storeDropdownOpen} onToggle={handleStoreDropdown}>
            <Dropdown.Toggle id="dropdown-basic">
              <FaStore size={20} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/my-product-catalog">Mis productos</Dropdown.Item>
              <Dropdown.Item href="/orders">Pedidos</Dropdown.Item>
              <Dropdown.Item href="/store/stats">Estadísticas</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/my-product-catalog">Mi Catálogo</Link>
          </li>
          <li>
            <Link to="/add-product">Agregar producto</Link>
          </li>
          <li>
            <Link to="/signin">Iniciar sesión</Link>
          </li>
          <li>
            <Link to="/signup">Registrarse</Link>
          </li>
        </ul>
      </nav>
      <div className="content">{props.children}</div>
      <footer>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/about">Acerca de</Link>
          </li>
          <li>
            <Link to="/contact">Contacto</Link>
          </li>
        </ul>
        <p>&copy; 2023, Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Layout;