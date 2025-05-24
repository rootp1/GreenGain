import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../signin.css";
import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";

function Signin() {
  const { isAuthenticated,user,signup,login,logout } = useContext(AuthContext);
  console.log("the user is",user);
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    {
      console.log(name);
    }
  };
  return (
    <div className="container">
      <div className="left-panel">
        <div className="anim">
        <div className="logo lhead">🌴Carbon Credit for all</div>
        </div>
        <div >
        <h1 className="logo-text">Platform for Personal Carbon Credits.</h1>
        </div>
        
      </div>
      <div className="right-panel">
        <div className="form">
          <h2>sign in</h2>
          <div htmlFor="username">Name</div>
          <input
            name="username"
            type="text"
            value={inputs.username || ""}
            onChange={handleChange}
          />
          <div htmlFor="password">Password</div>
          <input
            name="password"
            type="password"
            value={inputs.password || ""}
            onChange={handleChange}
          ></input>
          <button  className="submit-button" onClick={()=>{login(inputs.username,inputs.password)}}>
            Sign In
          </button>
          <p> Don't have an account? <a >Sign Up!</a></p>
        </div>
        <p>{}</p>
      </div>
    </div>
  );
}

export default Signin;
