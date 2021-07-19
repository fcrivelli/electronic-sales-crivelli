import React, {useState} from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";

function ProductList (props) {
  const { products } = props.context;
  const [ filter, setFilter ] = useState([]);
  const [ query , setQuery ] = useState('');
  
  const  handleInputChange = event => {
    const newQuery = event.target.value;
    if(newQuery !== ""){
      setFilter( products.filter(element => {
            return element.name.toLowerCase().includes(newQuery.toLowerCase());
      }));
    } else {
      setFilter(products);
    }
    setQuery(newQuery);
  };

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
        <div className="dropdown-trigger">
          <div className="field">
              <p className="control is-expanded has-icons-right">
                  <input className="input" type="search" placeholder="Search for..." value={query} onChange={handleInputChange}/>
              </p>
          </div>
        </div>
        <div className="column columns is-multiline">
          {
            products && products.length ? (
              filter && filter.length? (
                filter.map((product, index) => 
                <ProductItem product={product} key={index} />
                )
              ) : (
                products.map((product, index) => 
                  <ProductItem product={product} key={index} />
                )
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