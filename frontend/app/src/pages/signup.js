import React, { useState, useContext } from "react";
import "../signin.css";
import { AuthContext } from "../contexts/authContext";

function Signup() {
  const { signup } = useContext(AuthContext);
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    console.log(name); // Optional for debugging
  };

  return (
    <div className="container">
      <div className="left-panel">
        <div className="logo">🌴</div>
        <h1 className="logo-text">Platform for Personal Carbon Credits.</h1>
      </div>
      <div className="right-panel">
        <div className="form">
          <h2>Sign Up</h2>

          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            value={inputs.email || ""}
            onChange={handleChange}
          />

          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            value={inputs.username || ""}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />

          <button
            className="submit-button"
            onClick={() => signup(inputs.email, inputs.username, inputs.password)}
          >
            Sign Up
          </button>

          <p>Already a user? <a href="#">Sign In!</a></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
