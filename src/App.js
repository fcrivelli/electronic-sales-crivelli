import React, { useState, useEffect } from 'react';
import { useFirebaseApp, useUser } from 'reactfire';
import './App.css';
import Root from './components/Root';
import Navbar from './components/Navbar';
import Context from './Context';
import 'firebase/database';
import 'firebase/auth';

export default function App (){
  const [cart, setCart] = useState();
  const [products, setProducts] = useState([]);
  const firebase = useFirebaseApp();
  const user = useUser();
  const [username, setUsername] = useState("");

  const updateCart = (carts) => {
    setCart(carts);
  }

  const updateProducts = (products) =>{
    setProducts(products);
  }

  const updateUsername = (username) =>{
    setUsername(username);
  }

  const getCarts = () => {
    let username = user.data.email;
    username = username.replaceAll('.', '');
    firebase.database().ref(`user/${username}/carts`).on('value', (snapshot) =>{
      updateCart(snapshot.val());
    });
  };

  const getProducts = () => {
    firebase.database().ref('products').on('value', (snapshot) =>{
      let arrayProducts = [];
      let map = new Map(Object.entries(snapshot.val()));
      for (var [id, value] of map){
        if(value != null){
          arrayProducts.push(value);
        };
      }
      updateProducts(arrayProducts);
    });
  };

  useEffect( () =>{
    if(products.length == 0){
      getProducts();
    }
    if(user.data && user.data.email !== username){
      updateUsername(user.data.email);
      getCarts();
    }
  }, [user]);

  return (
    <Context.Provider value={{
      carts: cart,
      user: user,
      products: products,
      firebase: firebase,
      updateCart: updateCart,
      updateProducts: updateProducts
    }}>
    <div className="App">
        <Navbar/>
        <Root/>
    </div>
    </Context.Provider>
  )
}