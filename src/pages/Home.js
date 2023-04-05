import React from 'react';
import { Link } from 'react-router-dom';
import ProductCatalog from '../pages/ProductCatalog';

function Home() {
    return (
      <div>
        <h1>Bienvenido a la tienda en línea</h1>
        <p>Explora nuestro catálogo de productos:</p>
        <ul>
          <li>
            <Link to="/product-catalog">Productos</Link>
            <ProductCatalog/>
          </li>
        </ul>
        <p>Inicia sesión o regístrate para realizar compras:</p>
        <ul>
          <li>
            <Link to="/signin">Iniciar sesión</Link>
          </li>
          <li>
            <Link to="/signup">Registrarse</Link>
          </li>
        </ul>
      </div>
    );
  }
  
  export default Home;