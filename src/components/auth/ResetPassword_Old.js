import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ApiResponse from "../../model/ApiResponseModel";
import { StatusCodes } from "http-status-codes";
import {
  resetPassword,
  resetTokenAuthentication,
} from "../../service/authservice";

const input1 = "input1";
const input2 = "input2";

function ResetPassword_Old(props) {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordSet, setPasswordSet] = useState({
    password_1:'',
    password_2:'',
  })
  const [apiModel, setApiModel] = useState({
    token: searchParam.get("token"),
    key: password,
  });
  const [allowSubmit, setAllowSubmit] = useState({
    input_1: false,
    input_2: false,
  });
  const [isTokenValid, setIsTokenValid] = useState(false);

  const passwordInput1 = useRef('');
  const passwordInput2 = useRef('');

  function isButtonDisabled() {
    return allowSubmit.input_1 && allowSubmit.input_2;
  }

  useEffect(() => {
    passwordInput1.current = '';
    passwordInput2.current = '';
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    let apiResponse = new ApiResponse();
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
  };

  async function inputChangeHandler(inputField, param) {
    switch (param) {
      case input1:
        if (inputField.length !== 0) {
          await setPassword(inputField);
          setAllowSubmit({
            ...allowSubmit,
            input_1: true,
          });
        } else {
          await setPassword(inputField);
          setAllowSubmit({
            ...allowSubmit,
            input_1: false,
          });
        }
        break;
      case input2:
        if (inputField.length !== 0) {
          await setPassword2(inputField);
          if (password === password2) {
            setAllowSubmit({
              ...allowSubmit,
              input_2: true,
            });
          }
          console.log(password === password2);
        } else {
          await setPasswordMatch(true);
          setPassword2(inputField);
          setAllowSubmit({
            ...allowSubmit,
            input_2: false,
          });
        }
        break;
      default:
    }
  }

  async function password1Handler(input) {
    if (input.length !== 0) {
     // passwordInput1.current.value = input;
     //passwordInput1.current = input;
      await setPasswordSet({
        ...passwordSet,
        password_1:input,
      })
      setAllowSubmit({
        ...allowSubmit,
        input_1: true,
      });
    } else {
      //passwordInput1.value = input;
     // passwordInput1.current.value = input;
     await setPasswordSet({
      ...passwordSet,
      password_1:input,
    })
      setAllowSubmit({
        ...allowSubmit,
        input_1: false,
      });
    }

     console.log(passwordSet);
  }

  async function password2Handler(input) {
    if (input.length !== 0) {
      //passwordInput2.current.value = input;
      await setPasswordSet({
        ...passwordSet,
        password_2:input,
      })
     // if (passwordInput2.current.value === passwordInput1.current.value) {
      if (passwordSet.password_2 === passwordSet.password_1) {
        setAllowSubmit({
          ...allowSubmit,
          input_2: true,
        });
      } else {
        //passwordInput2.current.value = input;
        await setPasswordSet({
          ...passwordSet,
          password_2:input,
        })
        setAllowSubmit({
          ...allowSubmit,
          input_2: false,
        });
      }
    } else {
      //passwordInput2.current.value = input;
      await setPasswordSet({
        ...passwordSet,
        password_2:input,
      })
      setAllowSubmit({
        ...allowSubmit,
        input_2: false,
      });
    }

    console.log(passwordSet);
  }

  function tokenError() {
    alert("Invalid Token or Token has expired");
    // navigate("/");
  }

const [timer, setTimer] = useState(null);

function changeDelay(change,type) {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        if(type === input1){
          password1Handler(change);
        } else if (type === input2){
          password2Handler(change);
        }
        console.log(change);
      }, 10)
    );
}

  return (
    <div className="Auth-form-container">
      {isTokenValid ? (
        <div>
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Password Reset</h3>
              <div className="text-center">Please enter your new password.</div>

              <div className="form-group mt-3">
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  onChange={(e) => changeDelay(e.target.value,input1)}
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Re-type password to confirm"
                  onChange={(e) => changeDelay(e.target.value,input2)}
                />
                {!passwordMatch ? (
                  <span className="error-text">Password does not match</span>
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
            </div>
          </form>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

