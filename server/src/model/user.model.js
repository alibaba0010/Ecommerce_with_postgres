import sql from "./../db";
import BadRequestError from "../errors/badRequest";
import {
  checkEmailExists,
  getUserById,
  addUsers,
  getAllUsersQuery,
} from "../services/Query";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserModel {
  constructor() {}
  static async checkUserExist(userId) {
    const user = await sql.query(getUserById, [userId]);
    return user.length > 0;
  }

  static async checkEmailExists(email) {
    const result = await sql`SELECT * FROM users WHERE email = ${email}`;

    console.log("Email: ", result);
    return result.length > 0;
  }

  static checkIfExists = async (email, username) => {
    const checkEmailExist =
      await sql`SELECT * FROM users WHERE email = ${email}`;
    const checkUsernameExist =
      await sql`SELECT * FROM users WHERE username = ${username}`;
    console.log(checkEmailExist);
    console.log(checkUsernameExist);
    if (checkEmailExist.length > 0 || checkUsernameExist > 0)
      throw new BadRequestError("Email or username already exists");
  };
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
  static hashPassword = async (password) => {
    // TODO: Add password hashing logic
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);
    return hasedPassword;
  };
  static async createUser(username, email, password) {
    const result =
      await sql`INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password})`;
    console.log("Result: " + result.insertId);
    return result.insertId;
  }
}

export default UserModel;
