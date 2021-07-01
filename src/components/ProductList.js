import React, { useEffect, useState }  from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";

function ProductList (props) {
  const { firebase } = props.context;
  const [ products, setProducts ] = useState([]);

  const getProducts = () => {
    firebase.firestore().collection('product').get().then((snapshot) =>{
      let arrayProducts = [];
      let map = new Map(Object.entries(snapshot.docs.map(doc => doc.data())));
      for (var [id, value] of map){
        if(value != null){
          value.products.forEach(function(i){
            arrayProducts.push(i);
          });
        }
      } 
      setProducts(arrayProducts);
    });
  };  

  useEffect( () => {
    getProducts();
  }, []);

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