import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiResponse from "../../model/ApiResponseModel";
import { isEmail } from "../../shared/validator";
import { forgotPassword } from "../../service/authservice";

import "./Auth.css";
import { StatusCodes } from "http-status-codes";

function ForgotPassword(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(true);
  const [emailSent, setEmailSent] = useState(false);

  function inputChangeHandler(inputField) {
    if (inputField.length !== 0) {
      if (isEmail(inputField)) {
        setEmail(inputField);
        setEmailError(false);
        setAllowSubmit(false);
      } else {
        setEmail("");
        setEmailError(true);
        setAllowSubmit(true);
      }
    } else {
      setAllowSubmit(true);
      setEmailError(false);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let apiResponse = new ApiResponse();
    apiResponse = await forgotPassword(email);
    console.log(apiResponse);
    if (apiResponse.status === StatusCodes.OK) {
      console.log("Success");
      setEmailSent(true);
    } else if (apiResponse.status === StatusCodes.UNAUTHORIZED) {
      alert("Failed: ", apiResponse.message);
    } else {
      console.log("Failed ");
      alert("Server Error");
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Password Reset</h3>
          {emailSent ? (
            <div className="text-center">
              We have sent instructions to reset your password to your email.
              Please check your email.
            </div>
          ) : (
            <div>
              <div className="text-center">
                Please enter your email. A link will be sent to your email to
                reset your password.
              </div>

              <div className="form-group mt-3">
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  onChange={(e) => inputChangeHandler(e.target.value)}
                />
                {emailError ? (
                  <span className="error-text">Please enter a valid email</span>
                ) : (
                  ""
                )}
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={allowSubmit}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
