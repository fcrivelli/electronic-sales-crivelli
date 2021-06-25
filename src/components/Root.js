import React from "react";
import { Switch, Route } from "react-router-dom";
import AddProduct from './AddProduct';
import Cart from './Cart';
import Login from './Login';
import ProductList from './ProductList';
import Contact from './Contact';
import Register from './Register';

export default function Root () {
    return (
    <>
        <Switch>
            <Route exact={true} path="/" component={ProductList} />
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/cart" component={Cart} />
            <Route exact={true} path="/add-product" component={AddProduct} />
            <Route exact={true} path="/contact" component={Contact} />
            <Route exact={true} path="/register" component={Register} />
            <Route exact={true} path="/products" component={ProductList} />
        </Switch>
    </>
    );
}