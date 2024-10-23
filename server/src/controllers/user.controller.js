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
    await UserModel.createUser(username, email, password);
    res
      .status(StatusCodes.CREATED)
      .json({ message: "User added successfully" });
  }
}

export default UsersController;
