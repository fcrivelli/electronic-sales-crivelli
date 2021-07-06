import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import  '../componentsCss/Login.css'; 
import withContext from "../withContext";
import swal from 'sweetalert';
import 'firebase/auth';

function Register (props) {
    const { firebase } = props.context;
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
      await firebase.auth().createUserWithEmailAndPassword(datos.email, datos.password)
      .then(function() {
        swal("Great!", "User was added", "success");
      }).catch(() =>{
        swal("Ups!", "Error on create user", "error");
      });
    }

    const handleChangeToLogIn = () =>{
        setRedirectToLogIn(true);
    }
  
    return(
      <Fragment>
        <div className="hero is-primary ">
        <div className="hero-body container">
          <h4 className="title">Sign Up</h4>
        </div>
        </div>
        <br />
        <br />
        { !redirectToLogIn? (
          <div className="wrapper fadeInDown">
            <div className="formContent">
              <div className="fadeIn first">
                <img src="https://image.flaticon.com/icons/png/512/911/911412.png" id="icon" alt="User Icon" />
              </div>
              <form>
                <input type="email" className="fadeIn second" name="email" placeholder="email" onChange={handleChange} required></input>
                <input type="text" className="fadeIn third" name="password" placeholder="password" onChange={handleChange} required></input>
                <input type="submit" className="fadeIn fourth"  onClick={register} value="Sign Up"></input>  
              </form>
              <div className="formFooter">
                  <button className="enlace" role="link" onClick={handleChangeToLogIn}>back login!</button>
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
  export default withContext(Register);