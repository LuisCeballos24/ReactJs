import React, { useState } from 'react';
import { db } from './firebase';


function AddProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Agregar un nuevo producto a Firestore
    db.collection('productos').add({
      name,
      description,
    }).then(() => {
      console.log('Producto agregado');
      setName('');
      setDescription('');
    }).catch((error) => {
      console.error('Error al agregar el producto:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Agregar producto</button>
    </form>
  );
}

export default AddProductForm;