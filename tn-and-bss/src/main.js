import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyProductCatalog from './pages/MyProductCatalog';
import AddProductForm from './pages/AddProductForm';
import SignIn from './pages/Login';
import SignUp from './pages/SingUp';
import Orders from './pages/Orders';

function Main() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/my-product-catalog" component={MyProductCatalog} />
      <Route path="/add-product" component={AddProductForm} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/orders" component={Orders} />
    </Switch>
  );
}

export default Main