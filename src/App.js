import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";

import Context from "./Context"
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Login from './components/Login';
import ProductList from './components/ProductList';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default class App extends Component {
  //Armo un constructor con el state que va a contener Usuario , cart y productos
  //Todos datos que voy a ir actualizando en el uso de la pagina.
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      products: []
    };
    this.routerRef = React.createRef();
  }

  login = async (email, password) => {
    //hacer el login
  };
  
  logout = e => {
    //Hacer el logout
  };

  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products }, () => callback && callback());
    //adherir un producto a la lista
  };

  async componentDidMount() {
    let cart = localStorage.getItem("cart");
    let user = "";
    const products = await axios.get('http://localhost:3000/products');
    cart = cart? JSON.parse(cart) : {};

    this.setState({ user,  products: products.data, cart });
  }

  addToCart = cartItem => {
    let cart = this.state.cart;
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
    //adherir un Cart
  };

  removeFromCart = cartItemId => {
    //remover un item
  };
  
  clearCart = () => {
    //remover el Cart
  };

  checkout = () => {
    //Hacer el logout
  };
  
   /*
    Route : defino rutas de la app
    Context: me ayuda a armar props globales y que yo no las tenga que estar pasando de un padre a un hijo
    Con Context Provider logro mostrar valores globales.
    Las props siempre van de arriba hacia abajo.
    Switch :
  */
  render() {
    return (
      <Context.Provider
        value={{
        ...this.state,
        removeFromCart: this.removeFromCart,
        addToCart: this.addToCart,
        login: this.login,
        addProduct: this.addProduct,
        clearCart: this.clearCart,
        checkout: this.checkout
      }}
    >
      <Router ref={this.routerRef}>
        <div className="App">
          <nav className="navbar container" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <b className="navbar-item is-size-4 ">Electronic-Sales</b>
              <label role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ showMenu: !this.state.showMenu });
                }}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </label>
            </div>
            <div className={`navbar-menu ${
                this.state.showMenu ? "is-active" : ""
              }`}>
              <Link to="/products" className="navbar-item">Products</Link>
              <Link to="/add-product" className="navbar-item">Add Product</Link>
              <Link to="/cart" className="navbar-item">Cart
                <span className="tag is-primary" style={{ marginLeft: "5px" }}> { Object.keys(this.state.cart).length }</span>
              </Link>
              {!this.state.user ? (<Link to="/login" className="navbar-item">Login</Link>) : (
                <Link to="/" onClick={this.logout} className="navbar-item">Logout</Link>
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
        </div>
      </Router>
    </Context.Provider>
    );
  }
}
