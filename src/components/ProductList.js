import React from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";

function ProductList (props) {
  const { products } = props.context;

  return (
    <>
      <div className="hero is-primary ">
        <div className="hero-body container">
          <h4 className="title">Our Products</h4>
        </div>
      </div>
      <br />
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          { 
            products && products.length ? (
              products.map((product, index) => 
                <ProductItem product={product} key={index} />
              )
            ) : (
              <div className="column">
                <span className="title has-text-grey-light">
                  No products
                </span>
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};
export default withContext(ProductList);