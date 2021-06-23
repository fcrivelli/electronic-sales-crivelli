import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useFirebaseApp } from "reactfire";
import 'firebase/database';

export default function Cart () {
  const [cart, setCart] = useState({});
  const firebase = useFirebaseApp();
  const [cartKeys, setCartKeys] = useState(Object.keys({}));

  useEffect(() =>{
    firebase.database().ref('carts').on('value', (snapshot) => {
      let cartList = snapshot.val();
      setCart(cartList);
      setCartKeys(Object.keys(cartList || {}));
    })
  }, []);

  const removeFromCart = cartItemId => {
    let cartList = {cart};
    delete cartList[cartItemId];
    setCart(cartList);
  };
  
  const clearCart = () => {
    let cart = {};
    firebase.database().ref('cart').remove();
    setCart(cart);
  };

  const checkout = () => {
  /* if (!this.state.user) {
      this.routerRef.current.history.push("/login");
      return;
    }*/
  }
  

  return (
    <>
      <div className="container">
        {cartKeys.length ? (
          <div className="column columns is-multiline">
            {cartKeys.map(key => (
              <CartItem
                cartKey={key}
                key={key}
                cartItem={cart[key]}
                removeFromCart={removeFromCart}
              />
            ))}
            <div className="column is-12 is-clearfix">
              <br />
              <div className="is-pulled-right">
                <button onClick={clearCart} className="button is-warning ">Clear cart</button>
                <button className="button is-success" onClick={checkout}>Checkout</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="column">
            <div className="title has-text-grey-light">No Items Cart</div>
          </div>
        )}
      </div>
    </>
  );
};
