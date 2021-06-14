import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";

import Context from "./Context"
import Navbar from './components/Navbar';
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
          <Navbar/>
        </div>
      </Router>
    </Context.Provider>
    );
  }
}
