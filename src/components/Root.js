import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";

const AddProduct = lazy(() => import('./AddProduct'));
const Cart = lazy(() => import('./Cart'));
const Login = lazy(() => import('./Login'));
const ProductList = lazy(() => import('./ProductList'));
const Contact = lazy(() => import('./Contact'));
const Register = lazy(() => import('./Register'));

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