import React from "react";
import { RiCloseLine, RiDeleteBin6Line } from "react-icons/ri";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db, auth } from "../../utils/firebase.js";
import { orderBy } from "firebase/firestore";
/* import { Card } from "./Card"; */
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("guillermo18zgordon@gmail.com");
      setPassword("123456");
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

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

const Card_car = (props) => {
  /*  let listaPersonas = new Personas(personas); */
  const { showOrder, setShowOrder } = props;
  const resultado2 = Login;

  const currentUser = auth.currentUser;

  const [orders, loading, error] = useCollectionData(
    db
      .collection("order")
      .where("buyerId", "==", "6J2J5ElYbFURXDW5cYroZ10iE8m1" || "")
  );

  if (loading) {
    return <p>Cargando órdenes...</p>;
  }

  if (error) {
    return <p>Error al cargar órdenes: {error.message}</p>;
  }

  return (
    <div
      className={`lg:col-span-2 fixed top-0 bg-[#1F1D2B] w-full lg:w-96 lg:right-0 h-full transition-all z-50 ${
        showOrder ? "right-0" : "-right-full"
      }`}
    >
      {/* Orders */}
      <div className="relative p-8 pt-16 h-full text-gray-300 lg:pt-8">
        <RiCloseLine
          onClick={() => setShowOrder(false)}
          className="lg:hidden absolute left-4 top-4 p-3 box-content text-gray-300 bg-[#262837] rounded-full text-xl"
        />
        <h1 className="my-4 text-2xl">Orders #151416</h1>
        {/* Pills */}
        <div className="flex flex-wrap gap-4 items-center mb-8">
          <button className="bg-[#ec7c6a] text-white py-2 px-4 rounded-xl">
            Dine In
          </button>
          <button className="text-[#ec7c6a] py-2 px-4 rounded-xl border border-gray-500">
            To Go
          </button>
          <button className="text-[#ec7c6a] py-2 px-4 rounded-xl border border-gray-500">
            Delivery
          </button>
        </div>
        {/* Car */}
        <div>
          <div className="grid grid-cols-6 p-4 mb-4">
            <h5 className="col-span-4">Item</h5>
            <h5>Qty</h5>
            <h5>Price</h5>
          </div>
          //
          {/* Products */}
          <div className="overflow-scroll h-[400px] md:h-[700px] lg:h-[540px]">
            {/* Product */}
            {orders.map((order) => (
              <OrderItem
                key={order.productId}
                name={order.name}
                price={order.price}
                quantity={order.quantity}
                createdAt={order.createdAt}
              />
            ))}
            {orders.map((order) => (
              <div className="bg-[#262837] p-4 rounded-xl mb-4">
                <div className="grid grid-cols-6 mb-4">
                  {/* Product description */}
                  <div className="flex col-span-4 gap-3 items-center">
                    <img src="comida.png" className="object-cover w-10 h-10" />
                    <div>
                      <h5 className="text-sm"> {order.name}</h5>
                      <p className="text-xs text-gray-500"></p>
                    </div>
                  </div>
                  {/* Qty */}
                  <div>
                    <span>2</span>
                  </div>
                  {/* Price */}
                  <div>
                    <span>$4.58</span>
                  </div>
                </div>
                {/* Note */}
                <div className="grid grid-cols-6 items-center">
                  <form className="col-span-5">
                    <input
                      type="text"
                      className="bg-[#1F1D2B] py-2 px-4 rounded-lg outline-none"
                      placeholder="Order note..."
                    />
                  </form>
                  <div>
                    <button className="p-2 rounded-lg border border-red-500">
                      <RiDeleteBin6Line className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Submit payment */}
        <div className="bg-[#262837] absolute w-full bottom-0 left-0 p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400">Discount</span>
            <span>$0</span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-400">Subtotal</span>
            <span id="precio_total"></span>
          </div>
          <div>
            <button className="bg-[#ec7c6a] w-full py-2 px-4 rounded-lg">
              Continue to payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card_car;
