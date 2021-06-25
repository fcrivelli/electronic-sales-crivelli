import React, { useState } from 'react';
import { useUser } from 'reactfire';
import './App.css';
import Root from './components/Root';
import Navbar from './components/Navbar';
import Context from './Context';

export default function App (){
  const [cart, setCart] = useState();
  const user = useUser();

  const updateCart = (carts) => {
    setCart(carts);
  }

  return (
    <Context.Provider value={{
      carts: cart,
      user: user,
      updateCart: updateCart
    }}>
    <div className="App">
        <Navbar/>
        <Root/>
    </div>
    </Context.Provider>
  )
}