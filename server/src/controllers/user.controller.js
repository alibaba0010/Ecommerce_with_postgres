import { StatusCodes } from "http-status-codes";
import UserModel, { getUsersOver } from "../model/user.model";
import BadRequestError from "../errors/badRequest";

class UsersController extends UserModel {
  constructor() {}
  static async createUser(req, res) {
    const { username, email, password, confirmPassword } = req.body;
    UserModel.requiredFields(username, email, password, confirmPassword);
    UserModel.validatePassword(password, confirmPassword);
    //  const checkUser = await UserModel.checkEmailExists(email);
    const checkUser = await getUsersOver(email);
    console.log("Checking user: " + checkUser);
    if (checkUser) {
      throw new BadRequestError(`Email ${email} already exists`);
    }
    res.status(StatusCodes.CREATED).json({ message: "User already exists" });
  }
}

export default UsersController;
