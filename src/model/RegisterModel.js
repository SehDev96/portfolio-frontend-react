export default class RegisterModel {
    constructor (fullName,username, email, password, phoneNumber,state, city) {
        this.fullName = fullName === undefined ? '' : fullName;
        this.username = username == undefined ? '' : username;
        this.email = email === undefined ? '' : email;
        this.password = password === undefined ? '' : password;
        this.phoneNumber = phoneNumber === undefined ? '' : phoneNumber;
        this.state = state === undefined ? '' : state;
        this.city = city === undefined ? '' : city;
    }
}