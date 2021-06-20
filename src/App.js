import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Context from "./Context"
import Navbar from './components/Navbar';
//import firebase from './firebase.js';

import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyChadbxxPtMGXu_UFVsqO6bdllmwcL3qRw",
    authDomain: "electronicsales-coderhouse.firebaseapp.com",
    databaseURL: "https://electronicsales-coderhouse-default-rtdb.firebaseio.com",
    projectId: "electronicsales-coderhouse",
    storageBucket: "electronicsales-coderhouse.appspot.com",
    messagingSenderId: "105470955682",
    appId: "1:105470955682:web:57ae08ac58141dac4bc7fb"
}
firebase.initializeApp(config);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      products: [],
      limit: 10
    };
    this.routerRef = React.createRef();
  }

  async componentDidMount() {
    let cart = localStorage.getItem("cart");
    let user = "";
    const products = [];
    this.getProductData();
    cart = cart? JSON.parse(cart) : {};
    this.setState({ user,  products: products.data, cart });
  }; 

  login = async (email, password) => {
  };
  
  logout = e => {
  };
  
  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products }, () => callback && callback());
  };
  
  writeProductData = () => {
    firebase.database().ref('products').set(this.state.products);
    console.log('DATA SAVED');
  }
  
  getProductData = () => {
    const products = [];
    var ref = firebase.database().ref().child('products');
    ref.on('value', snapshot => {
        products.push(snapshot);
    });
    /*function(data) {
      if(data != null){
        for (const value of data){
          products.push(value);
        }
      }
    });*/
    console.log('DATA RETRIEVED');
    return products;
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
