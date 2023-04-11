import React from 'react';
import { Link } from 'react-router-dom';
import ProductCatalog from '../pages/ProductCatalog';

import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">Bienvenido a la tienda en línea</h1>
      </div>
      <div className="home-content">
        <div className="product-catalog-container">
          <h2 className="product-catalog-title">Explora nuestro catálogo de productos:</h2>
          <ProductCatalog />
        </div>
        <div className="signin-container">
          <h2 className="signin-title">Inicia sesión o regístrate para realizar compras:</h2>
          <ul className="signin-links">
            <li>
              <Link className="signin-link" to="/signin">Iniciar sesión</Link>
            </li>
            <li>
              <Link className="signin-link" to="/signup">Registrarse</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;