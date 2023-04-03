import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../utils/firebase';
import '../styles/AddProductForm.css';

function AddProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const [user] = useAuthState(auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Agregar un nuevo producto a Firestore
    db.collection('productos').add({
      name,
      description,
      price,
      uid: user.uid, // Agregar el UID del usuario autenticado como propietario del producto
    }).then(() => {
      console.log('Producto agregado');
      setName('');
      setDescription('');
      setPrice('');
    }).catch((error) => {
      console.error('Error al agregar el producto:', error);
    });
  };

  if (!user) {
    return <p>Debe iniciar sesión para agregar productos.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Descripción:
        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Precio:
        <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <button type="submit">Agregar producto</button>
    </form>
  );
}

export default AddProductForm;