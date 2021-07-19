import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../withContext";
import  '../componentsCss/Login.css';
import swal from 'sweetalert';

function Login (props) {
  const { username, firebase } = props.context;
  const [redirectToRegister, setRedirectToRegister] = useState(false);
  let accessLevel = false;
  const [datos, setDatos] = useState({
    email: "",
    password: ""
  }); 
 
  const handleChange = (event) => {
    setDatos({
        ...datos,
        [event.target.name] : event.target.value
    })
  }

  const handleCheckBox = () => {
     accessLevel = !accessLevel;
     if(accessLevel){
       swal("Keep in mind!", "You will have accessLevel Admin and Add Products", "warning");
     } 
  }

  const login = async () => {
    firebase.auth().signInWithEmailAndPassword(datos.email, datos.password)
    .then(function (){
      swal("Welcome!", `${datos.email}`, "success");
      props.context.updateAccessLevel(accessLevel);
    }).catch((res) => {
      swal("Ups!", "Unauthorized or fields are not complete", "error");
    })
  }
  
  const logout = async e => {
    e.preventDefault();
    await firebase.auth().signOut()
    .then(function (){
      swal("Good Bye!", `${username}`, "success");
      props.context.updateCart({});
    }).catch((res) => {
      swal("Ups!", "Please try again", "error");
    });
  };

  const handleChangeToRegister = () =>{
    setRedirectToRegister(true);
  }

  return(
    <Fragment>
      <div className="hero is-primary ">
        <div className="hero-body container">
          { !username && <h4 className="title">Sign In</h4> }
          { username && <h4 className="title">Log Out</h4> }
        </div>
      </div>
      <br />
      <br />
      { !redirectToRegister? (
        !username ? (
            <div className="wrapper fadeInDown">
              <div className="formContent">
                <div className="fadeIn first">
                  <img src="https://image.flaticon.com/icons/png/512/911/911412.png" id="icon" alt="User Icon" />
                </div>
                <div>
                  <input type="email" className="fadeIn second" name="email" placeholder="email" onChange={handleChange} required></input>
                  <input type="text" className="fadeIn third" name="password" placeholder="password" onChange={handleChange} required></input>
                  <div><label className="label-checkbox"><input type="checkbox" value="Add accessLevel" onChange={handleCheckBox}/>Add admin access</label></div>
                  <input type="submit" className="fadeIn fourth"  onClick={login} value="Log In"></input>  
                </div>
                <div className="formFooter">
                    <button className="enlace" role="link" onClick={handleChangeToRegister}>register now!</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="wrapper fadeInDown">
              <div className="formContent">
                <h2 className="active"> User : {username} </h2>
                <div className="fadeIn first">
                  <img src="https://image.flaticon.com/icons/png/512/911/911259.png" id="icon" alt="User Icon" />
                </div>
                <div className="fadeIn second">
                  <input type="submit" className="fadeIn fourth"  onClick={logout} value="Log Out"></input> 
                </div>
              </div>
            </div>
          )
        ) : (
          <Redirect to="/register" />
        )
      }
    </Fragment>
  )
};
export default withContext(Login);