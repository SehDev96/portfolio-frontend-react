import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiResponse from "../../model/ApiResponseModel";
import LoginModel from "../../model/LoginModel";
import { isEmail } from "../../shared/validator";
import { login } from "../../service/authservice";

import "./Auth.css";
import { StatusCodes } from "http-status-codes";

//const email = "email";
const password = "password";
const username = "username";

function Login(props) {
  const navigate = useNavigate();
  const [loginModel, setLoginModel] = useState(new LoginModel());
  const [emailError, setEmailError] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState({
    email: false,
    password: false,
  });
  const [credentialValid, setCredentialValid] = useState(false);

  function inputChangeHandler(inputField, param) {
    switch (param) {
      case username:
        if (inputField.length !== 0) {
          setEmailError(!isEmail(inputField));
          setLoginModel({
            ...loginModel,
            username: inputField,
          });
          if (isEmail(inputField)) {
            setAllowSubmit({
              ...allowSubmit,
              email: true,
            });
          } else {
            setAllowSubmit({
              ...allowSubmit,
              email: false,
            });
          }
        } else {
          setEmailError(false);
          setLoginModel({
            ...loginModel,
            username: "",
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    let apiResponse = new ApiResponse();
    console.log("LoginModel: ", loginModel);
    apiResponse = await login(loginModel);
    if (apiResponse.status === StatusCodes.OK) {
      console.log(apiResponse.data.access_token);
      localStorage.setItem("access_token", apiResponse.data.access_token);
      localStorage.setItem("refresh_token", apiResponse.data.refresh_token);
      navigate("/home");
      setCredentialValid(false);
    } else if (apiResponse.status === StatusCodes.UNAUTHORIZED) {
      setCredentialValid(true);
      alert("Login Failed: ", apiResponse.message);
    } else {
      console.log("Failed to login user");
      alert("Server Error");
    }
  };

  function isButtonDisabled() {
    return allowSubmit.email && allowSubmit.password;
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
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => inputChangeHandler(e.target.value, username)}
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
            {credentialValid ? (
              <span className="error-text">Invalid email or password</span>
            ) : (
              ""
            )}
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isButtonDisabled()}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
              <Link to="/forgotpassword" >Forgot Password?</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
