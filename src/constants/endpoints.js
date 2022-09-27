

//let API_PREFIX = 'http://app:5000/app';

let API_PREFIX = process.env.REACT_APP_API_BASE_URL;

//let API_PREFIX = 'http://localhost:8080';

export const REGISTER_USER = API_PREFIX + "/app/register";
export const GET_USER_INFO = API_PREFIX + "/app/user/getinfo";
export const CHECK_USER = API_PREFIX + "/app/finduser";
export const LOGIN = API_PREFIX + "/app/login"
