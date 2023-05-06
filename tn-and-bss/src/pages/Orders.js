import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, auth } from '../utils/firebase';
import '../styles/Orders.css';

function OrderItem(props) {
  return (
    <div className="order-item">
      <p>{props.name}</p>
      <p>Precio: ${props.price}</p>
      <p>Cantidad: {props.quantity}</p>
      <p>Fecha: {props.createdAt.toDate().toLocaleString()}</p>
    </div>
  );
}

function Orders() {
    const currentUser = auth.currentUser;
    const [orders, loading, error] = useCollectionData(
      db.collection("ordenes").where("buyerId", "==", currentUser?.uid || "")
    );

  if (loading) {
    return <p>Cargando órdenes...</p>;
  }

  if (error) {
    return <p>Error al cargar órdenes: {error.message}</p>;
  }

  return (
    <div className="orders-container">
      <h1>Mis órdenes</h1>
      <div className="order-list-container">
        {orders.map((order) => (
          <OrderItem
            key={order.productId}
            name={order.name}
            price={order.price}
            quantity={order.quantity}
            createdAt={order.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;