import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../withContext";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  login() {
    //armar login y validaciones
  };

  render() {
    return(
      <>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Login</h4>
          </div>
        </div>
        <br />
        <form onSubmit={this.login}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Email: </label>
                <input className="input" type="email" name="username"/>
              </div>
              <div className="field">
                <label className="label">Password: </label>
                <input className="input" type="password" name="password"/>
              </div>
              <div className="field is-clearfix">
                <button className="button is-primary is-outlined is-pulled-right">Submit</button>
              </div>
            </div>
          </div>
        </form>
      </>
    )
  }
}

export default withContext(Login);