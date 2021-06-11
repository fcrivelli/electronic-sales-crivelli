import React, { useState } from 'react';
import Contador from './Contador';

const ProductItem = props => {
  const { product } = props;
  const [cantidad, setCantidad] = useState(1);

  const sumar = () => {
      setCantidad(() => cantidad + 1)
  };
  const restar = () => {
      setCantidad(() => cantidad - 1)
  };
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
              <small className="has-text-danger">Fuera de Stock</small>
            )}
            <div className="is-clearfix">
              <button className="button is-small is-outlined is-primary   is-pulled-right"
                onClick={() =>
                  <Contador
                      sumar={sumar}
                      restar={restar}
                      cantidad={cantidad}
                      producto={product}
                      props={props}
                  />
                }
              >
                Agregar Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;