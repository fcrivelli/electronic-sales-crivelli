import React, { Component } from "react";
import withContext from "../withContext";

//Limpiar la carga del producto o inicializarla
const initState = {
  name: "",
  price: "",
  stock: "",
  description: "",
  image: ""
};

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  save = () => {
    const { name, price, stock, image, description } = this.state; // Tomo valores de el state 
    this.props.context.addProduct(
      {
        name,
        price,
        description,
        image,
        stock: stock || 0
      }, 
      () => this.setState(initState)
    );
    //armar el save 
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  render() {
    const { name, price, stock, image, description } = this.state;

    return (
      <>
        <form onSubmit={this.save}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Nombre Producto: </label>
                <input className="input" type="text" name="name" value={name} onChange={this.handleChange} required/>
              </div>
              <div className="field">
                <label className="label">Precio: </label>
                <input className="input" type="number" name="price" value={price} onChange={this.handleChange} required/>
              </div>
              <div className="field">
                <label className="label">Stock Disponible: </label>
                <input className="input" type="number" name="stock" value={stock} onChange={this.handleChange} required/>
              </div>
              <div className="field">
                <label className="label">Link image: </label>
                <input className="input" type="text" name="image" value={image} onChange={this.handleChange} required/>
              </div>
              <div className="field">
                <label className="label">Descripcion: </label>
                <input className="input" type="text" name="description" value={description} onChange={this.handleChange}/>
              </div>
              <div className="field is-clearfix">
                <button className="button is-primary is-outlined is-pulled-right" type="submit" onClick={this.save}>Enviar</button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default withContext(AddProduct);
