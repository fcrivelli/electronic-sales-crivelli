import React, { useState } from 'react';
import ItemCount from "./ItemCount";
import "../componentsCss/Amount.css";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import withContext from '../withContext';
import swal from 'sweetalert';

function ProductItem (props) {
  const [amount, setAmount] = useState(1);
  const { product } = props;
  const { username, firebase, carts } = props.context;

  const incrementCount = () => {
    setAmount(amount + 1);
  };

  const decrementCount = () => {
    setAmount(amount > 1? amount - 1 : amount);
  };

  const addToCart = async cartItem => {
    let update = false;
    let cart = carts;
    if(username){
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
      update ? (
        await firebase.database().ref(`user/${username.replaceAll('.', '')}/carts/${cartItem.id}/`).update(cart[cartItem.id])
        .then(function (){
          swal("Great!", "Product is on your Cart", "success");
        }).catch((error) => {
          swal("Ups!", "Error on add to Cart", "error");
        })
      ) : (
        await firebase.database().ref(`user/${username.replaceAll('.', '')}/carts/${cartItem.id}/`).set(cartItem)
        .then(function (){
            swal("Great!", "The product was added to cart", "success");
        }).catch((error) => {
            swal("Ups!", "Error on add product to cart", "error");
        })
      )
    } else {
        swal("Join Us!", "Please login first", "warning");
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