import React  from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";

const ProductList = props => {
  const { products } = props.context;
  const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("ok");
      }, 2000);
      setTimeout(() => {
        reject("fail");
      }, 4000);
  });; 

  return (
    <>
      <div className="container">
        <div className="column columns is-multiline">
          {products && products.length ? ( //miro si hay productos
            products.map((product, index) => {
              promise.then((response) =>{
                <ProductItem
                product={product}
                key={index}
                addToCart={props.context.addToCart}
              />
              }).catch((error) =>{
              });
            })
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