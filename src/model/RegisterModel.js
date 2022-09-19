export default class RegisterModel {
    constructor (name,username, email, password, phone_number,state, city) {
        this.name = name === undefined ? '' : name;
        this.username = username === undefined ? '' : username;
        this.email = email === undefined ? '' : email;
        this.password = password === undefined ? '' : password;
        this.phone_number = phone_number === undefined ? '' : phone_number;
        this.state = state === undefined ? '' : state;
        this.city = city === undefined ? '' : city;
    }
}