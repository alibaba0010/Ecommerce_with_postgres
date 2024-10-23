import sql from "./../db";
import BadRequestError from "../errors/badRequest";
import { checkEmailExists, getUserById, addUsers } from "../services/Query";

class UserModel {
  constructor() {}
  static async checkUserExist(userId) {
    const user = await sql.query(getUserById, [userId]);
    return user.length > 0;
  }

  static async checkEmailExists(email) {
    const result = await sql.query(checkEmailExists, [email]);
    return result.length > 0;
  }

  static requiredFields(username, email, password, confirmPassword) {
    if (!username || !email || !password || !confirmPassword) {
      throw new BadRequestError("Please fill all required fields");
    }
  }

  static validatePassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new BadRequestError("Passwords do not match");
    }
  }

  static async createUser(username, email, password) {
    const result = await sql.query(addUsers, [username, email, password]);
    return result.insertId;
  }
}

export default UserModel;
