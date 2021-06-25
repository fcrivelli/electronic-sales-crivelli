import React, { Fragment, useState } from "react";
import { useFirebaseApp } from "reactfire";
import { Redirect } from "react-router-dom";
import  '../componentsCss/Login.css'; 
import 'firebase/auth';

export default function Register () {
    const firebase = useFirebaseApp();
    const [redirectToLogIn, setRedirectToLogIn] = useState(false);
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
  
    const register = async () => {
      await firebase.auth().createUserWithEmailAndPassword(datos.email, datos.password).
      then(() => {
        console.log("User was added");
      }).catch(() =>{
        console.log("Error on create user");
      });
    }

    const handleChangeToLogIn = () =>{
        setRedirectToLogIn(true);
    }
  
    return(
      <Fragment>
        { !redirectToLogIn? (
            <div class="wrapper fadeInDown">
                <div id="formContent">
                <h2>Sign Up</h2>
                <div class="fadeIn first">
                    <img src="https://image.flaticon.com/icons/png/512/911/911412.png" id="icon" alt="User Icon" />
                </div>
                <form>
                    <input type="text" id="login" class="fadeIn second" name="email" placeholder="email" onChange={handleChange} required></input>
                    <input type="text" id="password" class="fadeIn third" name="password" placeholder="password" onChange={handleChange} required></input>
                    <input type="submit" class="fadeIn fourth"  onClick={register} value="Register"></input>   
                </form>
                <div id="formFooter">
                    <a class="underlineHover" href="#" onClick={handleChangeToLogIn}>Back to LogIn</a>
                </div>
                </div>
            </div>
            ) : (
            <Redirect to="/login" />
            )
        }   
      </Fragment>
    )
  };