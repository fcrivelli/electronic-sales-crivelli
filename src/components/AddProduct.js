import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../withContext";
import swal from 'sweetalert';

function AddProduct (props) {
  const [datos, setDatos] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image: ""
  })
  const { username, firebase, products } = props.context;

  const handleChange = (event) => {
    setDatos({
        ...datos,
        [event.target.name] : event.target.value
    })
  }

  const save = async (e) => {
    e.preventDefault();
    const { name, price, stock, image, description } = datos;
    if (name && price && stock) {
      const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
      const product = {
        id, 
        name, 
        price, 
        stock, 
        image, 
        description 
      }; // Tomo valores de el state
      await firebase.database().ref(`products/${product.id}/`).set(product)
      .then(function() {
        products.push(product);
        props.context.updateProducts(products);
        swal("Great!", "Product created successfully", "success");
        setDatos({ 
          name: "",
          price: "",
          stock: "",
          description: "",
          image: ""
        });
      }).catch(function(error) {
        swal("Ups!", "Error on product created", "error");
      });
    } else {
        swal("Help us!", "Please name and price are required", "warning");
        console.log();
    }
  };

  return username ? (
    <Fragment>
      <div className="hero is-primary ">
        <div className="hero-body container">
          <h4 className="title">Add Product</h4>
        </div>
      </div>
      <br />
      <br />
      <div className="container">
        <form onSubmit={save}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Nombre Producto: </label>
                <input className="input" type="text" name="name" placeholder="Add name" onChange={handleChange} required/>
              </div>
              <div className="field">
                <label className="label">Precio: </label>
                <input className="input" type="number" placeholder="Add price" name="price" onChange={handleChange} required/>
              </div>
              <div className="field">
                <label className="label">Stock Disponible: </label>
                <input className="input" type="number" placeholder="Add stock" name="stock" onChange={handleChange} required/>
              </div>
              <div className="field">
                <label className="label">Link image: </label>
                <input className="input" type="text" placeholder="Add link to image" name="image" onChange={handleChange} />
              </div>
              <div className="field">
                <label className="label">Descripcion: </label>
                <input className="input" type="text" placeholder="Add description" name="description" onChange={handleChange}/>
              </div>
              <div className="field is-clearfix">
                <button
                  className="button is-primary is-outlined is-pulled-right"
                  type="submit"
                  onClick={save}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  ) : (
    <Redirect to="/products" />
  );;
};
export default withContext(AddProduct)