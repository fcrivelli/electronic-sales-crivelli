import React, { useEffect, useState } from 'react';
import Button from "./Button";
import "../componentsCss/Amount.css";
import { useFirebaseApp } from 'reactfire';
import 'firebase/database';

export default function ProductItem (props) {
  const firebase = useFirebaseApp();
  const [amount, setAmount] = useState(1);
  const { product } = props;
  let cart = [];

  useEffect(() =>{
    firebase.database().ref('carts').on('value', (snapshot) =>{
      cart = snapshot.val();
    });
  }, []);

  const incrementCount = () => {
    setAmount(amount + 1);
  };

  const decrementCount = () => {
    setAmount(amount > 1? amount - 1 : amount);
  };

  const addToCart = cartItem => {
    let update = false;
    if(cart != null){
      if (cart[cartItem.id]) {
        cart[cartItem.id].amount += cartItem.amount;
        update = true;
      } else {
        cart[cartItem.id] = cartItem;
      }
      if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
        cart[cartItem.id].amount = cart[cartItem.id].product.stock;
      }
    }    
    update ? firebase.database().ref(`carts/${cartItem.id}/`).update(cartItem.id) : 
    firebase.database().ref(`carts/${cartItem.id}/`).set(cartItem); 
  }
    
  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src={product.image}
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {product.name}{" "}
              <span className="tag is-primary">${product.price}</span>
            </b>
            <div>{product.description}</div>
            {product.stock > 0 ? (
              <small>{product.stock + " Available"}</small>
            ) : (
              <small className="has-text-danger">Out Stock</small>
            )}
            <div className="is-clearfix">
              <button className="button is-small is-outlined is-primary   is-pulled-right"
                onClick={() => 
                  addToCart({
                    id: product.name,
                    product,
                    amount: amount 
                  }) 
                }
              >
                Add to Cart
              </button>
              <div>
                <div className="buttons">
                    <Button title={"-"} action={decrementCount} />
                    <h1 className="amount">{amount}</h1>
                    <Button title={"+"} action={incrementCount} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};