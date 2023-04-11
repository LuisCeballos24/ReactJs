import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, auth } from '../utils/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import '../styles/ProductCatalog.css';

function ProductItem(props) {
  const handleDeleteClick = () => {
    console.log('uid:', props.ownerId);
    props.onDelete(props.ownerId);
  };

  return (
    <div className="product-item" key={props.key}>
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <p>Precio: ${props.price}</p>
      <button onClick={handleDeleteClick}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}

function MyProductCatalog() {
  const [products, loading, error] = useCollectionData(
    db.collection("productos").where("uid", "==", auth.currentUser.uid)
  );

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error al cargar productos: {error.message}</p>;
  }

  const handleProductDelete = async (uid) => {
    try {
      const querySnapshot = await db
        .collection("productos")
        .where("uid", "==", uid)
        .get();
  
      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        await db.collection("productos").doc(docId).delete();
        console.log(`Producto con uid ${uid} eliminado correctamente`);
      }
    } catch (error) {
      console.error(`Error al eliminar producto con uid ${uid}: ${error.message}`);
    }
  };

  return (
    <div className="product-catalog-container">
      <h1>Productos</h1>
      <div className="product-list-container">
        {products.map((product) => (
          <ProductItem
            key={product.uid}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            ownerId={product.uid}
            onDelete={handleProductDelete}
          />
        ))}
     </div>
    </div>
  );
}

export default MyProductCatalog;