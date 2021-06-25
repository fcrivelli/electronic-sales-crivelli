import React, { Fragment, useState } from "react";
import { useFirebaseApp, useUser } from "reactfire";
import { Redirect } from "react-router-dom";
import withContext from "../withContext";
import  '../componentsCss/Login.css'; 
import 'firebase/auth';

function Login (props) {
  const firebase = useFirebaseApp();
  const [redirectToRegister, setRedirectToRegister] = useState(false);
  const user = props.context.user;
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

  const login = async () => {
    await firebase.auth().signInWithEmailAndPassword(datos.email, datos.password)
    .then(()=>{
      console.log("Success log in");
    }).catch((res) => {
      console.log('Unauthorized');
    })
  }
  
  const logout = async e => {
    e.preventDefault();
    await firebase.auth().signOut();
  };

  const handleChangeToRegister = () =>{
    setRedirectToRegister(true);
  }

  return(
    <Fragment>
      { !redirectToRegister? (
       !user.data ? (
          <div class="wrapper fadeInDown">
            <div id="formContent">
              <h2>Sign In</h2>
              <div class="fadeIn first">
                <img src="https://image.flaticon.com/icons/png/512/911/911412.png" id="icon" alt="User Icon" />
              </div>
              <form>
                <input type="text" id="login" class="fadeIn second" name="email" placeholder="email" onChange={handleChange} required></input>
                <input type="text" id="password" class="fadeIn third" name="password" placeholder="password" onChange={handleChange} required></input>
                <input type="submit" class="fadeIn fourth"  onClick={login} value="Log In"></input>   
              </form>
              <div id="formFooter">
                  <a class="underlineHover" href="#" onClick={handleChangeToRegister}>register now!</a>
              </div>
            </div>
          </div>
        ) : (
          <div class="wrapper fadeInDown">
            <div id="formContent">
              <h2 class="active"> User : {user.email} </h2>
              <div class="fadeIn first">
                <img src="https://image.flaticon.com/icons/png/512/911/911259.png" id="icon" alt="User Icon" />
              </div>
              <div class="fadeIn second">
                <button className="button is-primary is-outlined is-pulled-center" onClick={logout}>LogOut</button>
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