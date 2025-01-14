import { UserModel } from "./user.schema.js";

export default class UserRepository {
  async register(userName, email, password) {
    try {
      const newUser = UserModel({
        userName,
        email,
        password
      });
      const result = newUser.save();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      console.log(err);
    }
  }
  async login(emailId, password) {
    try {
      return await UserModel.findOne({ emailId, password });
    } catch (err) {
      console.log(err);
    }
  }
}
