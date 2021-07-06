import React, { useState } from "react";
import { Link } from "react-router-dom";
import withContext from '../withContext';

function Navbar (props) {
    const [showMenu, setShowMenu ] = useState(false);
    const { user, carts } = props.context;

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
                { user.data ? (
                  <Link to="/add-product" className="navbar-item">
                    Add Product
                  </Link>
                ):(
                  <Link to="/contact" className="navbar-item">
                    Contact
                  </Link>
                )}
                <Link to="/cart" className="navbar-item">Cart
                <span className="tag is-primary" style={{ marginLeft: "5px" }}> { Object.keys(carts || {}).length }</span>
                </Link>
                {!user.data ? (
                    <Link to="/login" className="navbar-item">Login</Link>
                ) : (
                    <Link to="/login" className="navbar-item">Logout</Link>
                )}
            </div>
        </nav>
    </>
    );
}
export default withContext(Navbar);