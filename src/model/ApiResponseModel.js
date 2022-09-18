export default class ApiResponse {
    constructor(status, message, data) {
      this.status = status === undefined ? '' : status;
      this.message = message === undefined ? '' : message;
      this.data = data === undefined ? '' : data;
    }
  }