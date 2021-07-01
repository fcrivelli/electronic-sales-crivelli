import React, { useEffect, useState } from 'react';
import ItemCount from "./ItemCount";
import "../componentsCss/Amount.css";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import withContext from '../withContext';

function ProductItem (props) {
  const [amount, setAmount] = useState(1);
  const { product } = props;
  const { user, firebase, carts } = props.context;

  const getCarts = () => {
    let username = user.data.email;
      username = username.replace(/./g, '');
      firebase.database().ref(`carts/${username}`).on('value', (snapshot) =>{
          props.context.updateCart(snapshot.val());
    });
  };


  useEffect( () =>{
    if(user.data){
      getCarts();
    }
  }, []);


  const incrementCount = () => {
    setAmount(amount + 1);
  };

  const decrementCount = () => {
    setAmount(amount > 1? amount - 1 : amount);
  };

  const addToCart = async cartItem => {
    let update = false;
    let cart = carts;
    if(user.data){
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
      props.context.updateCart(cart);
      let username = user.data.email;
      username = username.replace(/./g, ''); 
      update ? (
        await firebase.database().ref(`user/${username}/carts/${cartItem.id}/`).update(cart[cartItem.id])
        .then(function (){
            console.log("Cart was updated");
        }).catch((error) => {
            console.log("Cart was not updated");
        })
      ) : (
        await firebase.database().ref(`user/${username}/carts/${cartItem.id}/`).set(cartItem)
        .then(function (){
          console.log("The product was added to cart");
        }).catch((error) => {
            console.log("Error on add product to cart");
        })
      )
    } else {
        console.log("Please login first");
    }
  }
    
  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src ={product.image}/>
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
              ><ShoppingCartIcon/>
              <span className="tag is-primary" style={{ margin: "5px" }}>{amount}</span>   
               Add to Cart
              </button>
              <div>
                <ItemCount
                  incrementCount={incrementCount}
                  decrementCount= {decrementCount} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 );
};
export default withContext(ProductItem);