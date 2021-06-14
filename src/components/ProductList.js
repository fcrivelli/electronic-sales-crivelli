import React from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";

const ProductList = props => {
  const {products} = props.context; 

  return (
    <>
      <div className="container">
        <div className="column columns is-multiline">
          {products && products.length ? ( //miro si hay productos
            products.map((product, index) => (
              <ProductItem
                product={product}
                key={index}
                addToCart={props.context.addToCart}
                amount={props.context.amount}
                increment={props.context.increment}
                decrement={props.context.decrement}
              />
            ))
          ) : (
            <div className="column">
              <span className="title has-text-grey-light">
                No hay productos
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withContext(ProductList);