export default class RegisterModel {
    constructor (fullName, email, password, phoneNumber,state, city) {
        this.fullName = fullName === undefined ? '' : fullName;
        this.email = email === undefined ? '' : email;
        this.password = password === undefined ? '' : password;
        this.phoneNumber = phoneNumber === undefined ? '' : phoneNumber;
        this.state = state === undefined ? '' : state;
        this.city = city === undefined ? '' : city;
    }
}