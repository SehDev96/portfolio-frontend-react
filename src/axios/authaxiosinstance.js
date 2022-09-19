import axios from "axios";
import { StatusCodes } from "http-status-codes";

const authAxiosInstance = axios.create();

authAxiosInstance.interceptors.request.use(
  async (config) => {
    let access_token = await localStorage.getItem("access_token");
    console.log("Access Token: ", access_token);
    config.headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return config;
  },
  (error) => {
    console.log("INTERCEPTOR ERROR");
    Promise.reject({ error });
  }
);

authAxiosInstance.interceptors.response.use(
  (response) => {
    console.log("Intereceptor Response: " + JSON.stringify(response.data));
    return response;
  },
  async function (error) {
    console.log("INTERCEPTOR RESPONSE ERROR: " + error);
    const orginalRequest = error.config;
    if (
      error.response.status === StatusCodes.FORBIDDEN &&
      !orginalRequest._retry
    ) {
      orginalRequest._retry = true;
      // refresh token here
      // const test = await renewAccessToken();
      const access_token = "null";
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return authAxiosInstance(orginalRequest);
    }
    return Promise.reject(error);
  }
);

export default {
  get: authAxiosInstance.get,
  post: authAxiosInstance.post,
  put: authAxiosInstance.put,
  delete: authAxiosInstance.delete,
  patch: authAxiosInstance.patch,
};
