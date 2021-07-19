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
  const [accessLevel, setAccessLevel] = useState(false);

  const updateCart = (carts) => {
    setCart(carts);
  }

  const updateProducts = (products) =>{
    setProducts(products);
  }

  const updateUsername = (username) =>{
    setUsername(username);
  }

  const updateAccessLevel = (accessLevel) => {
    setAccessLevel(accessLevel);
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
    if(user.data == null && username !== ''){
      updateUsername('');
    }
  }, [user]);

  return (
    <Context.Provider value={{
      carts: cart,
      username: username,
      products: products,
      accessLevel: accessLevel,
      firebase: firebase,
      updateCart: updateCart,
      updateProducts: updateProducts,
      updateAccessLevel: updateAccessLevel,
    }}>
    <div className="App">
        <Navbar/>
        <Root/>
    </div>
    </Context.Provider>
  )
}