import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useFirebaseApp, useUser } from "reactfire";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";
import 'firebase/database';

 function Cart (props) {
  const [products, setProducts] = useState([]);
  const [cartKeys, setCartKeys] = useState(Object.keys({}));
  const firebase = useFirebaseApp();
  const user = props.context.user;

  useEffect( () =>{
    firebase.database().ref('carts').on('value', (snapshot) => {
      props.context.updateCart(snapshot.val());
      setCartKeys(Object.keys(snapshot.val() || {}));
    })
    firebase.database().ref('products').on('value', (snapshot) =>{
      let arrayProducts = [];
      let map = new Map(Object.entries(snapshot.val()));
      for (var [id, value] of map){
        if(value !== null){
           arrayProducts.push(value);
        }
      } 
      setProducts(arrayProducts);
    })
  }, []);

  const removeFromCart = async cartItemId => {
    const cartList = Object.values(props.context.carts).filter((item) => item.id !== cartItemId);
    props.context.updateCart(cartList);
    setCartKeys(Object.keys(cartList || {}));
    await firebase.database().ref(`carts/${cartItemId}/`).remove().then(function() {
      console.log(`${cartItemId} was removed`);
    }).catch(function(error) {
      console.log(`${cartItemId} was a problem on remove it`);
    }); 
  };
  
  const clearCart = async () => {
    let cart = {};
    await firebase.database().ref('carts').remove().then(function() {
      console.log(`List of Carts was removed`);
    }).catch(function(error) {
      console.log(`List of Carts was not removed`);
    });
    props.context.updateCart(cart);
    setCartKeys(Object.keys(cart || {}));
  };

  const checkout = async () => {
    let cart = props.context.carts;
    const productsList = products.map(p => {
      if (cart[p.name]) {
        p.stock = p.stock - cart[p.name].amount;
        firebase.database().ref(`products/${p.id}/`).update().then(function() {
          console.log(`Product id ${p.id} was updated`);
        }).catch(function(error) {
          console.log(`Product ${p.id} was not updated`);
        });
      }
      return p;
    }).then(function() {
      setProducts({ productsList });
      clearCart();
    }).catch(function(error) {
    });
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
                cartItem={props.context.carts[key]}
                removeFromCart={removeFromCart}
              />
            ))}
            <div className="column is-12 is-clearfix">
              <br />
              <div className="is-pulled-right">
                <button onClick={clearCart} className="button is-warning ">Clear cart</button>
                <button className="button is-success" onClick={
                  !user? (
                    checkout
                   ) :(
                     <Redirect to="/login"/>
                   )
                  }>Checkout</button>
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
export default withContext(Cart);
