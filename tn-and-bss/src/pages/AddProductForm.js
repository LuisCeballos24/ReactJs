 import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth, storage } from '../utils/firebase';
import '../styles/AddProductForm.css';

function AddProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  const [user, loading] = useAuthState(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Agregar el producto a Firestore
      const productRef = await db.collection('productos').add({
        name,
        description,
        price,
        uid: user.uid, // Agregar el UID del usuario autenticado como propietario del producto
      });

      // Subir las imágenes al Storage
      const urls = await Promise.all(
        imageUrls.map(async (imageUrl) => {
          const imageFile = await fetch(imageUrl).then((res) => res.blob());
          const uploadTask = storage.ref(`images/${productRef.id}/${imageFile.name}`).put(imageFile);
          const snapshot = await uploadTask;
          const url = await snapshot.ref.getDownloadURL();
          return url;
        })
      );

      // Actualizar el producto con las URLs de las imágenes
      await productRef.update({ images: urls });

      // Reiniciar el formulario
      setName('');
      setDescription('');
      setPrice('');
      setImageUrls([]);
      alert('Producto agregado');
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImageUrls(urls);
  };

  if (loading) {
    return <p>Cargando...</p>;
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
        <input type="file" name="images" accept="image/*" multiple onChange={handleImageChange} />
      </label>
      <div className="image-preview">
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Imagen ${index
}`} />
))}
</div>
<button type="submit">Agregar producto</button>
</form>
);
}

export default AddProductForm;