import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";
import swal from 'sweetalert';

 function Cart (props) {
  const { username, carts, firebase, products } = props.context;

  const calculatePriceTotal = (carts) => {
    let priceTotal = 0;
    if(carts != null){
      let map = new Map(Object.entries(carts));
      for (var [id, value] of map){
        if(value !== null){
          priceTotal = priceTotal + (value.product.price)*value.amount;
        }
      }
    }
    return priceTotal;
  };

  useEffect( () =>{
    if(!username){
      swal("Ups!", `Please login with us`, "warning");
    }
  }, []);

  const removeFromCart = async cartItemId => {
    const cartList = Object.values(carts).filter((item) => item.id !== cartItemId);
    props.context.updateCart(cartList);
    await firebase.database().ref(`user/${username.replaceAll('.', '')}/carts/${cartItemId}/`).remove()
    .then(function() {
      swal("Great!", `${cartItemId} was removed`, "success");
    }).catch(function(error) {
      swal("Ups!", `${cartItemId} was a problem on remove it`, "error");
   });
  };
  
  const clearCart = async (fromCheckOut) => {
    let cart = {};
    await firebase.database().ref(`user/${username.replaceAll('.', '')}/carts`).remove()
    .then(function() {   
        if(!fromCheckOut){
          swal("Great!", `List of Carts was removed`, "success");
        }
        props.context.updateCart(cart);
    }).catch(function() {
        swal("Ups!", `List of Carts was not removed`, "error");
    });
  };

  const checkout = async () => {
    let cart = carts;
    const productsList = products.map(p => {
      if (cart[p.name]) {
        p.stock = p.stock - cart[p.name].amount;
      }
      return p;
    });
    await firebase.database().ref(`products`).set(productsList)
    .then(function() {
      swal("Thank you!", `The products will arrive your home soon`, "success");
      props.context.updateProducts(productsList);
      clearCart(true);
    }).catch(function(error) {
      swal("Ups!", `Please try again or later`, "error");
    });
  }
  

  return username ? (
    <>
      <div className="hero is-primary ">
        <div className="hero-body container">
          <h4 className="title">Cart</h4>
        </div>
      </div>
      <br />
      <br />
      <div className="container">
        {carts != null && Object.keys(carts || {}).length ? (
          <div className="column columns is-multiline">
            {Object.keys(carts).map(key => (
              <CartItem
                cartKey={key}
                key={key}
                cartItem={carts[key]}
                removeFromCart={removeFromCart}
              />
            ))}
            <div className="column is-12 is-clearfix">
              <br />
              <div className="is-pulled-right">
                <b style={{ textTransform: "capitalize" }}>
                  Total price:{" "}
                  <span className="tag is-primary">${calculatePriceTotal(carts)}</span>
                </b>
                <button onClick={() => clearCart(false)} className="button is-warning ">Clear cart</button>
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
