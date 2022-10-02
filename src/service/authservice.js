import axios from "axios";
import ApiResponse from "../model/ApiResponseModel";
import * as endpoint from "../constants/endpoints";

export async function register(data) {
  console.log("FUNCTION: Register User Api Call");
  let apiResponse = new ApiResponse();
  try {
    let res = await axios.post(endpoint.REGISTER_USER, data);
    console.log("Register Api Call: " + res.status);

    apiResponse.data = res.data;
    apiResponse.status = res.status;
    return apiResponse;
  } catch (e) {
    console.log(e);
    return e.response;
    // throw handler(e);
  }
}

export async function checkUser(user) {
  console.log("FUNCTION: Check User Api Call");
  let apiResponse = new ApiResponse();
  try {
    let res = await axios.get(endpoint.CHECK_USER, {
      params: { username: user.username, email: user.email },
    });
    console.log("CheckUser Response: ",res);

    apiResponse.data = res.data;
    apiResponse.status = res.status;
    return apiResponse;
  } catch (e) {
    return e.response;
    //throw handler(e);
  }
}

export async function forgotPassword(email) {
  console.log("FUNCTION: Forgot Password Api Call");
  let apiResponse = new ApiResponse();
  try {
    await console.log(email);
    let res = await axios.post(endpoint.FORGOT_PASSWORD, email);
    console.log("ForgotPassword Response: ",res);

    apiResponse.data = res.data;
    apiResponse.status = res.status;
    return apiResponse;
  } catch (e) {
    return e.response;
    //throw handler(e);
  }
}

export async function resetTokenAuthentication(token){
  console.log("FUNCTION: Reset Token Authn Api Call");
  let apiResponse = new ApiResponse();
  try {
    let res = await axios.get(endpoint.RESET_TOKEN_AUTHENTICATION, {
      params: {
        token: token
      }
    });
    console.log("ResetToken Response: ",res);

    apiResponse.data = res.data;
    apiResponse.status = res.status;
    return apiResponse;
  } catch (e) {
    return e.response;
    //throw handler(e);
  }
}

export async function resetPassword(apiModel) {
  console.log("FUNCTION: Forgot Password Api Call");
  let apiResponse = new ApiResponse();
  try {
    let res = await axios.post(endpoint.RESET_PASSWORD, {
      token: apiModel.token, 
      key: apiModel.key,
    });
    console.log("Reset Response: ",res);

    apiResponse.data = res.data;
    apiResponse.status = res.status;
    return apiResponse;
  } catch (e) {
    return e.response;
    //throw handler(e);
  }
}

export async function login(user) {
    let apiResponse = new ApiResponse();
    console.log('FUNCTION: Login Api Call');
    console.log("Endpoint: ",endpoint.LOGIN);
    try {
      let res = await axios.post(endpoint.LOGIN, {
        username: user.username,
        password: user.password,
      });
      apiResponse.status = res.status;
      apiResponse.data = res.data;
      console.log(apiResponse.data.has_tokens);
    } catch (e) {
      await console.log('TEST');
      console.log(e);
      apiResponse.status = e.response.status;
      apiResponse.data = e.response.data;
      apiResponse.message = e.response.message;
    }
  
    console.log('APIRESPONSE: '+apiResponse);
  
    return apiResponse;
  }
