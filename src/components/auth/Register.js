import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import { isEmail, isMalaysianNumber } from "../../shared/validator";
import Form from "react-bootstrap/Form";
import RegisterModel from "../../model/RegisterModel";
import { checkUser, register, login } from "../../service/authservice";
import ApiResponse from "../../model/ApiResponseModel";
import { StatusCodes } from "http-status-codes";

const email = "email";
const phone_number = "phone_number";
const full_name = "full_name";
const username = "username";
const password = "password";
const state = "state";
const city = "city";
const unselected = "unselected";

function Register(props) {
  const [registerModel, setRegisterModel] = useState(new RegisterModel());
  const [emailError, setEmailError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const [allowSubmit, setAllowSubmit] = useState({
    fullname: false,
    email: false,
    username: false,
    password: false,
    phonenumber: false,
    state: false,
    city: false,
  });

  function inputChangeHandler(inputField, param) {
    switch (param) {
      case email:
        console.log("Email");
        if (inputField.length !== 0) {
          setEmailError(!isEmail(inputField));
          setRegisterModel({
            ...registerModel,
            email: inputField,
          });
          setAllowSubmit({
            ...allowSubmit,
            email: true,
          });
        } else {
          setEmailError(false);
          setRegisterModel({
            ...registerModel,
            email: "",
          });
          setAllowSubmit({
            ...allowSubmit,
            email: false,
          });
        }
        break;
      case phone_number:
        if (inputField.length !== 0) {
          setPhoneNumberError(!isMalaysianNumber(inputField));
          setRegisterModel({
            ...registerModel,
            phoneNumber: inputField,
          });
          setAllowSubmit({
            ...allowSubmit,
            phonenumber: true,
          });
        } else {
          setPhoneNumberError(false);
          setRegisterModel({
            ...registerModel,
            phoneNumber: "",
          });
          setAllowSubmit({
            ...allowSubmit,
            phonenumber: false,
          });
        }
        break;
      case full_name:
        if (inputField.length !== 0) {
          setRegisterModel({
            ...registerModel,
            fullName: inputField,
          });
          setAllowSubmit({
            ...allowSubmit,
            fullname: true,
          });
        } else {
          setRegisterModel({
            ...registerModel,
            fullName: "",
          });
          setAllowSubmit({
            ...allowSubmit,
            fullname: false,
          });
        }
        break;
      case username:
        if (inputField.length !== 0) {
          setRegisterModel({
            ...registerModel,
            username: inputField,
          });
          setAllowSubmit({
            ...allowSubmit,
            username: true,
          });
        } else {
          setRegisterModel({
            ...registerModel,
            username: "",
          });
          setAllowSubmit({
            ...allowSubmit,
            username: false,
          });
        }
        break;
      case password:
        if (inputField.length !== 0) {
          setRegisterModel({
            ...registerModel,
            password: inputField,
          });
          setAllowSubmit({
            ...allowSubmit,
            password: true,
          });
        } else {
          setRegisterModel({
            ...registerModel,
            password: "",
          });
          setAllowSubmit({
            ...allowSubmit,
            password: false,
          });
        }
        break;
      case state:
        if (inputField !== unselected) {
          setRegisterModel({
            ...registerModel,
            state: inputField,
          });
          setAllowSubmit({
            ...allowSubmit,
            state: true,
          });
        } else {
          setRegisterModel({
            ...registerModel,
            state: "",
          });
          setAllowSubmit({
            ...allowSubmit,
            state: false,
          });
        }
        break;
      case city:
        if (inputField !== unselected) {
          setRegisterModel({
            ...registerModel,
            city: inputField,
          });
          setAllowSubmit({
            ...allowSubmit,
            city: true,
          });
        } else {
          setRegisterModel({
            ...registerModel,
            city: "",
          });
          setAllowSubmit({
            ...allowSubmit,
            city: false,
          });
        }
        break;
      default:
    }
  }

  function isButtonDisabled() {
    return (
      allowSubmit.fullname &&
      allowSubmit.email &&
      allowSubmit.username &&
      allowSubmit.password &&
      allowSubmit.phonenumber &&
      allowSubmit.state &&
      allowSubmit.city
    );
  }

  const handleSubmit = async event => {
    event.preventDefault();
    let apiResponse = new ApiResponse();
    apiResponse = await checkUser(registerModel);
    console.log('RegisterUser Function: ',apiResponse);
  }

  async function registerMe(){
    let apiResponse = new ApiResponse();
    apiResponse = await checkUser(registerModel);
    console.log('RegisterUser Function: ',apiResponse);
  }

  async function registerUser() {
    let apiResponse = new ApiResponse();
    apiResponse = await checkUser(registerModel);
    console.log('RegisterUser function: ',JSON.stringify(apiResponse));

    if (apiResponse.status === StatusCodes.OK && !apiResponse.data.userexists) {
      // server response is ok and user does not exists --> register user
      apiResponse = await register(registerModel);
      console.log(apiResponse);
      if (apiResponse.status === StatusCodes.CREATED) {
        apiResponse = await login(registerModel);
        console.log(apiResponse);
        if (apiResponse.status === StatusCodes.OK) {
          // user login api call was successfull
          // change the context state
          console.log("RESULT: User has been logged in");
        } else {
          // user login api call failed
          console.log("RESULT: User failed to log in");
        }
      } else {
        // user registration failed
        console.log("RESULT: User registration failed!");
        alert("Failed to register");
      }
    } else {
      console.log("Check user failed");
    }
  }



  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary">
              <Link to="/login">Sign In</Link>
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              onChange={(e) => inputChangeHandler(e.target.value, full_name)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              onChange={(e) => inputChangeHandler(e.target.value, username)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Email Address"
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
              placeholder="Password"
              onChange={(e) => inputChangeHandler(e.target.value, password)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Phone Number</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g 0141234567"
              onChange={(e) => inputChangeHandler(e.target.value, phone_number)}
            />
            {phoneNumberError ? (
              <span className="error-text">
                Please enter a valid phone number
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="form-group mt-3">
            <label>State</label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => inputChangeHandler(e.target.value, state)}
            >
              <option value="unselected">Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
          <div className="form-group mt-3">
            <label>City</label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => inputChangeHandler(e.target.value, city)}
            >
              <option value="unselected">Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              disabled={!isButtonDisabled()}
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot password?
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
