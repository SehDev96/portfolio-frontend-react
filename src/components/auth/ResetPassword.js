import React, { useState, useEffect } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import ApiResponse from "../../model/ApiResponseModel";
import { resetTokenAuthentication,resetPassword } from "../../service/authservice";
import { StatusCodes } from "http-status-codes";
import "./Auth.css";

function ResetPassword(props) {
    const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [searchParam] = useSearchParams();
  const [formInput, setFormInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const validateFormInput = (event) => {
    event.preventDefault();
    console.log(formInput);
    let inputError = {
      password: "",
      confirmPassword: "",
    };

    if (formInput.confirmPassword !== formInput.password) {
      setFormError({
        ...inputError,
        confirmPassword: "Password and confirm password should be same",
      });
      return;
    }

    if (!formInput.password) {
      setFormError({
        ...inputError,
        password: "Password should not be empty",
      });
      return;
    }

    setFormError(inputError);
    submitPassword();
  };

  useEffect(() => {
    const validateToken = async () => {
      let apiResponse = new ApiResponse();
      apiResponse = await resetTokenAuthentication(searchParam.get("token"));
      if (apiResponse.status === StatusCodes.OK) {
        console.log("Success");
        setIsTokenValid(true);
      } else if (apiResponse.status === StatusCodes.BAD_REQUEST) {
        setIsTokenValid(false);
        alert(" Error: ", apiResponse.message);
      } else {
        console.log("Error");
        setIsTokenValid(false);
        alert("Server Error");
      }
    };
    //do  something
    validateToken();
  }, []);

  async function submitPassword() {
    let apiResponse = new ApiResponse();
    let apiModel = {
        token: searchParam.get("token"),
        key: formInput.password
    };
    apiResponse = await resetPassword(apiModel);
    if (apiResponse.status === StatusCodes.OK) {
      console.log("Success");
      alert("Successfully reset your password");
      navigate("/");
    } else if (apiResponse.status === StatusCodes.INTERNAL_SERVER_ERROR) {
      alert("Failed: ", apiResponse.message);
    } else {
      console.log("Failed to login user");
      alert("Server Error");
    }
  }

  return (
    <div className="Auth-form-container">
      {isTokenValid ? (
        <div>
          <form onSubmit={validateFormInput} className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Password Reset</h3>
              <div className="text-center">Please enter your new password.</div>

              <div className="form-group mt-3">
                <input
                  name="password"
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  onChange={(e) =>
                    handleUserInput(e.target.name, e.target.value)
                  }
                />
                <p className="error-text">{formError.password}</p>
              </div>
              <div className="form-group mt-3">
                <input
                  name="confirmPassword"
                  type="password"
                  className="form-control mt-1"
                  placeholder="Re-type password to confirm"
                  onChange={(e) =>
                    handleUserInput(e.target.name, e.target.value)
                  }
                />
                <p className="error-text">{formError.confirmPassword}</p>
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  value="Submite"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default ResetPassword;
