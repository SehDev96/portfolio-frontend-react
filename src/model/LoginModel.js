export default class LoginModel {
    constructor(username, password) {
      this.username = username === undefined ? '' : username;
      this.password = password === undefined ? '' : password;
    }
  }