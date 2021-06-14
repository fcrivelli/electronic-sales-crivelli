import React, { Component } from 'react';
import Button from "./Button";
import "../componentsCss/Amount.css";

export default class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1
    };
  }

  incrementCount = () => {
    this.setState({
      amount: this.state.amount + 1
    });
  };

  decrementCount = () => {
    this.setState({
      amount: this.state.amount > 1? this.state.amount - 1 : this.state.amount
    });
  };

  render() {
    const { product } = this.props;
    let { amount } = this.state;
    return (
      <div className=" column is-half">
        <div className="box">
          <div className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img
                //cargar la imagen correspondiente
                  src="https://bulma.io/images/placeholders/128x128.png"
                  alt={product.description}
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
                    this.props.addToCart({
                      id: product.name,
                      product,
                      amount: amount 
                    }) 
                  }
                >
                  Add to Cart
                </button>
                <div>
                  <div class="buttons">
                      <Button title={"-"} action={this.decrementCount} />
                      <h1 class="amount">{amount}</h1>
                      <Button title={"+"} action={this.incrementCount} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};
