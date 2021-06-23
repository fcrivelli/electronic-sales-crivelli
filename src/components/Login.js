import React, { useState } from "react";

const initState = {
  username: "",
  password: ""
};

export default function Login () {
  const [stateForm, setStateForm] = useState(initState); 
  const { username, password } = {stateForm};
 
  const handleChange = e => setStateForm({ [e.target.name]: e.target.value, error: "" });

  const login = () => {
    //armar login y validaciones
  };

  return(
    <>
      <div className="hero is-primary ">
        <div className="hero-body container">
          <h4 className="title">Login</h4>
        </div>
      </div>
      <br />
      <form onSubmit={login}>
        <div className="columns is-mobile is-centered">
          <div className="column is-one-third">
            <div className="field">
              <label className="label">Email: </label>
              <input className="input" type="email" name="username" value={username} onChange={handleChange} required/>
            </div>
            <div className="field">
              <label className="label">Password: </label>
              <input className="input" type="password" name="password" value={password} onChange={handleChange} required/>
            </div>
            <div className="field is-clearfix">
              <button className="button is-primary is-outlined is-pulled-right">Submit</button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
};