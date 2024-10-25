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
import dotenv from "dotenv";
dotenv.config();

const exp = process.env.JWT_LIFETIME;

class UserModel {
  constructor() {}
  static async checkEmailExists(email) {
    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    return result;
  }
  static async getUserById(id) {
    const result = await sql`SELECT * FROM users WHERE id = ${id}`;
    return result;
  }

  static checkIfExists = async (email, username) => {
    const checkEmailExist =
      await sql`SELECT * FROM users WHERE email = ${email}`;
    const checkUsernameExist =
      await sql`SELECT * FROM users WHERE username = ${username}`;
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
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);
    return hasedPassword;
  };
  static async createUser(username, email, password) {
    const result =
      await sql`INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password})`;
    return result.insertId;
  }
  static async createAdmin(username, email, password) {
    const result =
      await sql`INSERT INTO users (username, email, password, "isAdmin") VALUES (${username}, ${email}, ${password}, true)`;
    return result.insertId;
  }
  static comparePassword = async (userPassword, password) => {
    const match = await bcrypt.compare(password, userPassword);
    if (!match) throw new BadRequestError("Invalid password");
    return;
  };
  static createJWT = async (id, email, isAdmin) => {
    const token = jwt.sign(
      { userId: id, email, isAdmin },
      process.env.JWT_SEC,
      {
        expiresIn: exp,
      }
    );

    return token;
  };
}

export default UserModel;
