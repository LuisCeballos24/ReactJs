import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/layout.css';

function Layout(props) {
  return (
    <div className="layout">
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/product-catalog">Catálogo</Link>
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