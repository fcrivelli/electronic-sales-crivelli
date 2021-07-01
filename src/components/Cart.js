import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";

 function Cart (props) {
  const [products, setProducts] = useState([]);
  const [cartKeys, setCartKeys] = useState(Object.keys({}));
  const { user, carts, firebase } = props.context;
  const [ priceTot, setPriceTot ] = useState();

  const calculatePriceTotal = () => {
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

  const getCarts = () => {
    let username = user.data.email;
    username = username.replace(/./g, '');
    firebase.database().ref(`user/${username}/carts`).on('value', (snapshot) =>{
      props.context.updateCart(snapshot.val());
      setCartKeys(Object.keys(snapshot.val() || {}));
      calculatePriceTotal();
    });
  };

  const getProducts = () => {
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
  };

  useEffect( () =>{
    if(user.data){
      getCarts();
    }
    getProducts();
  }, []);

  const removeFromCart = async cartItemId => {
    const cartList = Object.values(carts).filter((item) => item.id !== cartItemId);
    props.context.updateCart(cartList);
    setCartKeys(Object.keys(cartList || {}));
    let username = user.data.email;
    username = username.replace(/./g, '');
    await firebase.database().ref(`user/${username}/carts/${cartItemId}/`).remove()
    .then(function() {
        console.log(`${cartItemId} was removed`);
        calculatePriceTotal();
    }).catch(function(error) {
        console.log( `${cartItemId} was a problem on remove it`);
   });
  };
  
  const clearCart = async () => {
    let cart = {};
    let username = user.data.email;
    username = username.replace(/./g, '');
    await firebase.database().ref(`user/${username}/carts`).remove()
    .then(function() {
        console.log(`List of Carts was removed`);
        calculatePriceTotal();
    }).catch(function() {
        console.log(`List of Carts was not removed`);
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
          console.log(`Product id ${p.id} was updated`);
        }).catch(function(error) {
          console.log(`Product id ${p.id} was not updated`);
        });
      }
      return p;
    }).then(function() {
      setProducts({ productsList });
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
