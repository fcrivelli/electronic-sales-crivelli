import React from "react";

export default function Button (props) {
    return( 
      <button className="button is-small is-outlined is-primary   is-pulled-right" onClick={props.action}>{props.title}</button>
    );
}