import { StatusCodes } from "http-status-codes";
import UserModel, { getUsersOver } from "../model/user.model";
import BadRequestError from "../errors/badRequest";

class UsersController extends UserModel {
  constructor() {}
  static async createUser(req, res) {
    const { username, email, password, confirmPassword } = req.body;
    UserModel.requiredFields(username, email, password, confirmPassword);
    UserModel.validatePassword(password, confirmPassword);
    await UserModel.checkIfExists(email, username);
    const hashedPassword = await UserModel.hashPassword(password);
    await UserModel.createUser(username, email, hashedPassword);
    res
      .status(StatusCodes.CREATED)
      .json({ message: "User added successfully" });
  }
  static async createAdmin(req, res) {
    // TODO: check if user exist
    // TODO: make user admin in db
    // TODO: return updated user
  }
  static async loginUser(req, res) {
    const { email, password } = req.body;
    // TODO: check if user exist
    const user = await UserModel.checkEmailExists(email);
    // TODO: get user from db
    // TODO: compare password with hashed password in db
    // TODO: generate jwt token
    // TODO: return jwt token to user
  }
  static async loginAdmin(req, res) {}
  static async getUsers(req, res) {
    // TODO: check if user exist
    // TODO: get user from db
    // const users = await UserModel.getAllUsersQuery();
  }
  static async updateUser(req, res) {
    // TODO: check if user exist
    // TODO: get user from db
    // TODO: update user in db
    // TODO: return updated user
  }
  static async deleteUser(req, res) {
    // TODO: check if user exist
    // TODO: get user from db
    // TODO: delete user from db
    // TODO: return user deleted successfully
  }
}

export default UsersController;
