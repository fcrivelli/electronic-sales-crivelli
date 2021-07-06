import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";
import swal from 'sweetalert';

 function Cart (props) {
  const { user, carts, firebase, products } = props.context;
  const [cartKeys, setCartKeys] = useState(Object.keys(carts || {}));
  const [ priceTot, setPriceTot ] = useState();

  const calculatePriceTotal = (carts) => {
    let priceTotal = 0;
    if(carts != null){
      let map = new Map(Object.entries(carts));
      for (var [id, value] of map){
        if(value !== null){
          priceTotal = priceTotal + (value.product.price)*value.amount;
        }
      }
      setPriceTot(priceTotal);
    } 
  };

  useEffect( () =>{
    calculatePriceTotal(carts);
  }, []);

  const removeFromCart = async cartItemId => {
    const cartList = Object.values(carts).filter((item) => item.id !== cartItemId);
    props.context.updateCart(cartList);
    setCartKeys(Object.keys(cartList || {}));
    let username = user.data.email;
    username = username.replaceAll('.', '');
    await firebase.database().ref(`user/${username}/carts/${cartItemId}/`).remove()
    .then(function() {
      swal("Great!", `${cartItemId} was removed`, "success");
      calculatePriceTotal(cartList);
    }).catch(function(error) {
      swal("Ups!", `${cartItemId} was a problem on remove it`, "error");
   });
  };
  
  const clearCart = async () => {
    let cart = {};
    let username = user.data.email;
    username = username.replaceAll('.', '');
    await firebase.database().ref(`user/${username}/carts`).remove()
    .then(function() {
        swal("Great!", `List of Carts was removed`, "success");
        calculatePriceTotal();
    }).catch(function() {
        swal("Ups!", `List of Carts was not removed`, "error");
    });
    props.context.updateCart(cart);
    setCartKeys(Object.keys(cart || {}));
  };

  const checkout = async () => {
    let cart = carts;
    const productsList = products.map(p => {
      if (cart[p.name]) {
        p.stock = p.stock - cart[p.name].amount;
        firebase.database().ref(`products/${p.id}/`).update(p)
        .then(function() {
          swal("Great!", `Product id ${p.id} was updated`, "success");
        }).catch(function(error) {
          swal("Great!", `Product id ${p.id} was not updated`, "error");
        });
      }
      return p;
    }).then(function() {
      props.context.updateProducts(productsList);
      clearCart();
    }).catch(function(error) {
    });
  }
  

  return user.data ? (
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
                <b style={{ textTransform: "capitalize" }}>
                  Total price:{" "}
                  <span className="tag is-primary">${priceTot}</span>
                </b>
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
  ) :(
    <Redirect to="/login"/>
  );
};
export default withContext(Cart);
