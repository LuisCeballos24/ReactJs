import React from 'react';
import Navbar from './Navbar';
import AddProductForm from './AddProductForm'
import {
  useFirebaseApp
} from 'reactfire';

function App() {
  const firebase = useFirebaseApp();
  console.log(firebase);
  return (
    <div className="App">
      <Navbar />
      <h1>Bienvenidos a mi sitio web</h1>
      <AddProductForm />
      <p>...</p>
    </div>
  );
}

export default App;