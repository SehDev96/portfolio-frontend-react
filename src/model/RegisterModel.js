export default class RegisterModel {
    constructor (fullName,username, email, password, phone_number,state, city) {
        this.fullName = fullName === undefined ? '' : fullName;
        this.username = username === undefined ? '' : username;
        this.email = email === undefined ? '' : email;
        this.password = password === undefined ? '' : password;
        this.phone_number = phone_number === undefined ? '' : phone_number;
        this.state = state === undefined ? '' : state;
        this.city = city === undefined ? '' : city;
    }
}