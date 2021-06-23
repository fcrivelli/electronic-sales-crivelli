import React, { useEffect, useState } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import AddProduct from './AddProduct';
import Cart from './Cart';
import Login from './Login';
import ProductList from './ProductList';

export default function Navbar () {

    const [showMenu, setShowMenu ] = useState(false);
    const [cart, setCart] = useState({});
    const [user, setUser] = useState();

    useEffect(() =>{

    },[]);
    
    return (
    <>
        <nav className="navbar container" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <b className="navbar-item is-size-4 ">Electronic-Sales</b>
                <label role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
                onClick={e => {
                    e.preventDefault();
                    setShowMenu(!{showMenu});
                }}
                >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </label>
            </div>
            <div className={`navbar-menu ${
                {showMenu} ? "is-active" : ""
                }`}>
                <Link to="/products" className="navbar-item">Products</Link>
                <Link to="/add-product" className="navbar-item">Add Product</Link>
                <Link to="/cart" className="navbar-item">Cart
                <span className="tag is-primary" style={{ marginLeft: "5px" }}> { Object.keys({cart}).length }</span>
                </Link>
                {!{user} ? (<Link to="/login" className="navbar-item">Login</Link>) : (
                <Link to="/" className="navbar-item">Logout</Link>
                )}
            </div>
        </nav>
        <Switch>
            <Route exact path="/" component={ProductList} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/add-product" component={AddProduct} />
            <Route exact path="/products" component={ProductList} />
        </Switch>
    </>
    );
}