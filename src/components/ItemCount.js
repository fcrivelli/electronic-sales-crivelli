import React from "react";

export default function ItemCount (props) {
    return( 
      <div className="buttons">
        <button className="button is-small is-outlined is-primary   is-pulled-right" onClick={props.decrementCount} >{"-"}</button>
        <button className="button is-small is-outlined is-primary   is-pulled-right" onClick={props.incrementCount} >{"+"}</button>
      </div>
  );
}