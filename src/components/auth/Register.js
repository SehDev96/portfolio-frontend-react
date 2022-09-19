import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import { isEmail, isMalaysianNumber } from "../../shared/validator";
import Form from "react-bootstrap/Form";
import RegisterModel from "../../model/RegisterModel";
import { checkUser, register, login } from "../../service/authservice";
import ApiResponse from "../../model/ApiResponseModel";
import { StatusCodes } from "http-status-codes";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getStates, getCities } from "malaysia-postcodes";

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
  const [selectedState, setSelectedState] = useState("");
  const [userExistsMessage, setUserExistsMessage] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            phone_number: inputField,
          });
          if (isMalaysianNumber(inputField)) {
            console.log("Malaysian Number!");
            setAllowSubmit({
              ...allowSubmit,
              phonenumber: true,
            });
          } else {
            console.log("Not Malaysian Number!");
            setAllowSubmit({
              ...allowSubmit,
              phonenumber: false,
            });
          }
        } else {
          setPhoneNumberError(false);
          setRegisterModel({
            ...registerModel,
            phone_number: "",
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
          setSelectedState(inputField);
          setAllowSubmit({
            ...allowSubmit,
            state: true,
          });
        } else {
          setRegisterModel({
            ...registerModel,
            state: "",
          });
          setSelectedState("");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    let apiResponse = new ApiResponse();
    apiResponse = await checkUser(registerModel);
    console.log("RegisterUser function: ", JSON.stringify(apiResponse));
    console.log("Object: ", apiResponse);

    if(apiResponse.status === StatusCodes.OK){
      if(!apiResponse.data.userexists){
        // user does not exists --> register user
        apiResponse = await register(registerModel);
        if (apiResponse.status === StatusCodes.CREATED) {
          handleShow();
          console.log("Successfully created!");
        } else {
          // user registration failed
          console.log("RESULT: User registration failed!");
          alert("Failed to register");
        }
      } else {
        // user exists --> handle display of message
        setUserExistsMessage(apiResponse.data.field);

      }
    } else {
      console.log("Failed to check user");
      alert("Server Error: Failed to call api");
    }
  };

  return (
    <div className="Auth-form-container">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Registration Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Registration Successful! <br />
          Please login to continue.
        </Modal.Body>
        <Modal.Footer>
          <Link to="/login">
            <Button variant="primary">Sign In</Button>
          </Link>
        </Modal.Footer>
      </Modal>
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
            {userExistsMessage===username ? (
              <span className="error-text">
                Username has been taken.
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e) => inputChangeHandler(e.target.value, email)}
            />
            {userExistsMessage===email ? (
              <span className="error-text">
                This email has been registered.
              </span>
            ) : (
              ""
            )}
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
              {getStates().map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </Form.Select>
          </div>
          <div className="form-group mt-3">
            <label>City</label>
            <Form.Select
              aria-label="Default select example"
              disabled={selectedState === "" ? true : false}
              onChange={(e) => inputChangeHandler(e.target.value, city)}
            >
            <option key={unselected} value={unselected}>Choose city...</option>
              {getCities(selectedState).map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
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
          <p className="text-center mt-2">Forgot password?</p>
        </div>
      </form>
    </div>
  );
}

export default Register;
