import React, { useEffect, useState }  from "react";
import ProductItem from "./ProductItem";
import { useFirebaseApp } from "reactfire";
import 'firebase/database';


export default function ProductList () {
  const firebase = useFirebaseApp();
  const [ products, setProducts ] = useState([]);

  useEffect(() => {
    firebase.database().ref('products').on('value', (snapshot) =>{
      let arrayProducts = [];
      let map = new Map(Object.entries(snapshot.val()));
      for (var [id, value] of map){
        if(value !== null){
           arrayProducts.push(value);
        }
      } 
      setProducts(arrayProducts);
    }); 
  }, [setProducts]);

  return (
    <>
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
                  No hay productos
                </span>
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};