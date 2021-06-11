import React  from 'react'
function Contador ({sumar, restar, cantidad, producto, props}) {
    return (
        <React.Fragment>
            <button onClick={restar}>-</button>
            <input
                className="text-center"
                type="number"
                value={cantidad}
            />
            <button onClick={sumar}>+</button>
            <button onClick={() =>
                  props.addToCart({
                    id: producto.name,
                    producto,
                    amount: {cantidad}
                  })
            }>Agregar</button>
        </React.Fragment>
    )
}

export default Contador