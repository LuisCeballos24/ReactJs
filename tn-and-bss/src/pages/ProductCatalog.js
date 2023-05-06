import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, auth } from '../utils/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import '../styles/ProductCatalog.css';

function isUserOwner(ownerId) {
  return auth.currentUser && ownerId === auth.currentUser.uid;
}

function ProductItem(props) {
  const handleDeleteClick = () => {
    console.log('uid:', props.ownerId);
    props.onDelete(props.ownerId);
  };

  // Define una variable booleana para determinar si el usuario actual es el propietario del producto
  const isOwner = isUserOwner(props.ownerId);
  async function handleAddToCartClick() {
    try {
      const existingOrderQuerySnapshot = await db
        .collection("ordenes")
        .where("productId", "==", props.id)
        .where("buyerId", "==", auth.currentUser.uid)
        .get();
      const existingOrderDoc = existingOrderQuerySnapshot.docs[0];
      const existingOrder = existingOrderDoc && existingOrderDoc.data();
  
      if (existingOrder) {
        await existingOrderDoc.ref.update({
          quantity: existingOrder.quantity + 1
        });
        console.log(`Producto con id ${props.id} actualizado en el carrito correctamente`);
      } else {
        const orderData = {
          productId: props.id,
          name: props.name,
          price: props.price,
          quantity: 1,
          ownerId: props.ownerId,
          buyerId: auth.currentUser.uid,
          createdAt: new Date()
        };
        await db.collection("ordenes").add(orderData);
        console.log(`Producto con id ${props.id} agregado al carrito correctamente`);
      }
    } catch (error) {
      console.error(`Error al agregar producto con id ${props.id} al carrito: ${error.message}`);
    }
  }

  return (
    <div className="product-item" key={props.key}>
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <p>Precio: ${props.price}</p>
      <button onClick={handleAddToCartClick}>
        <FontAwesomeIcon icon={faShoppingCart} />
      </button>
      {isOwner && (
        <button onClick={handleDeleteClick}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
    </div>
  );
}

function ProductCatalog() {
  const [products, loading, error] = useCollectionData(
    db.collection("productos")
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
          id={product.id} // cambiar "productId" por "id"
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

export default ProductCatalog;