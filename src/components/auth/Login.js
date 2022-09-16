import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModel from "../../model/LoginModel"
import { isEmail } from "../../shared/validator";

import "./Auth.css";

const email = "email";
const password = "password";

function Login(props) {
  const [loginModel, setLoginModel] = useState(new LoginModel());
  const [emailError, setEmailError] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState({
    email: false,
    password: false,
  });

  function inputChangeHandler(inputField, param) {
    switch (param) {
      case email:
        if (inputField.length !== 0 && isEmail(inputField)) {
          setEmailError(!isEmail(inputField));
          setLoginModel({
            ...loginModel,
            email: inputField,
          });
          setAllowSubmit({
            ...allowSubmit,
            email: true,
          });
        } else {
          setEmailError(false);
          setLoginModel({
            ...loginModel,
            email: "",
          });
          setAllowSubmit({
            ...allowSubmit,
            email: false,
          });
        }
        break;
      case password:
        if (inputField.length !== 0) {
          setLoginModel({
            ...loginModel,
            password: inputField,
          });
          setAllowSubmit({
            ...allowSubmit,
            password: true,
          });
        } else {
          setLoginModel({
            ...loginModel,
            password: "",
          });
          setAllowSubmit({
            ...allowSubmit,
            password: false,
          });
        }
        break;
      default:
    }
  }

  function isButtonDisabled() {
    return (
      allowSubmit.email &&
      allowSubmit.password
    );
  }
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span className="link-primary">
              <Link to="/register">Sign Up</Link>
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email address LOGIN</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => inputChangeHandler(e.target.value, email)}
            />
            {emailError ? (
              <span className="error-text">Please enter a valid email</span>
            ) : (
              ""
            )}
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => inputChangeHandler(e.target.value, password)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button 
            type="submit" className="btn btn-primary"
            disabled={!isButtonDisabled()}
            >
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;