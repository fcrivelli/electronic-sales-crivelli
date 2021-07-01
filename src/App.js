import React, { useState } from 'react';
import { useFirebaseApp, useUser } from 'reactfire';
import './App.css';
import Root from './components/Root';
import Navbar from './components/Navbar';
import Context from './Context';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

export default function App (){
  const [cart, setCart] = useState();
  const user = useUser();
  const firebase = useFirebaseApp();

  const updateCart = (carts) => {
    setCart(carts);
  }

  return (
    <Context.Provider value={{
      carts: cart,
      user: user,
      firebase: firebase,
      updateCart: updateCart
    }}>
    <div className="App">
        <Navbar/>
        <Root/>
    </div>
    </Context.Provider>
  )
}