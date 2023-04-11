import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth, storage } from '../utils/firebase';
import '../styles/AddProductForm.css';

function AddProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);

  const [user] = useAuthState(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Subir las imágenes seleccionadas a Firebase Storage
    const imageUrls = [];
    for (const image of images) {
      const imageRef = storage.ref(`images/${image.name}`);
      await imageRef.put(image);
      const imageUrl = await imageRef.getDownloadURL();
      imageUrls.push(imageUrl);
    }

    // Agregar un nuevo producto a Firestore
    db.collection('productos').add({
      name,
      description,
      price,
      imageUrls,
      uid: user.uid, // Agregar el UID del usuario autenticado como propietario del producto
    }).then(() => {
      console.log('Producto agregado');
      setName('');
      setDescription('');
      setPrice('');
      setImages([]);
    }).catch((error) => {
      console.error('Error al agregar el producto:', error);
    });
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
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
      <label>
        Imágenes:
        <input type="file" name="images" multiple onChange={handleImageChange} />
      </label>
      {images.map((image, index) => (
        <img key={index} src={URL.createObjectURL(image)} alt={`Imagen ${index + 1}`} />
      ))}
      <button type="submit">Agregar producto</button>
    </form>
  );
}

export default AddProductForm;