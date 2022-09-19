export default class AppUserInfoModel {
    constructor(user_info_id, user_id, phone_number, state,city) {
      this.user_info_id = user_info_id === undefined ? '' : user_info_id;
      this.user_id = user_id === undefined ? '' : user_id;
      this.phone_number = phone_number === undefined ? '' : phone_number;
      this.state = state === undefined ? '' : state;
      this.city = city === undefined ? '' : city;
    }
  }