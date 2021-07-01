import React from "react";
import withContext from "../withContext";

 function Contact (props) {
     return(
        <>
        <div className="hero is-primary ">
        <div className="hero-body container">
          <h4 className="title">Contact us</h4>
        </div>
        </div>
        <br />
        <br />
        </>
     );
 }
 export default withContext(Contact);