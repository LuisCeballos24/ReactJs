import { useState } from "react";
import { auth,db } from "../utils/firebase";

function SingUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await db.collection("users").doc(user.uid).set({
        userName,
        email,
      });

      setUserName("");
      setEmail("");
      setPassword("");
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">Nombre de usuario:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
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
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default SingUp;