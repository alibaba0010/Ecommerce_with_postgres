import { StatusCodes } from "http-status-codes";
import UserModel from "../model/user.model";
import BadRequestError from "../errors/badRequest";
import NotFoundError from "../errors/notFound";

class UserController extends UserModel {
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
    const { username, email, password, confirmPassword } = req.body;
    UserModel.requiredFields(username, email, password, confirmPassword);
    UserModel.validatePassword(password, confirmPassword);
    await UserModel.checkIfExists(email, username);
    const hashedPassword = await UserModel.hashPassword(password);
    await UserModel.createAdmin(username, email, hashedPassword);

    res
      .status(StatusCodes.CREATED)
      .json({ message: "User added successfully" });
  }
  static async loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password)
      throw new BadRequestError("Fill all required fields");
    const user = await UserModel.checkEmailExists(email);
    if (user.length < 0) throw new NotFoundError("User not found");
    await UserModel.comparePassword(user[0].password, password);
    const token = await UserModel.createJWT(
      user[0].id,
      user[0].email,
      user[0].isAdmin
    );
    req.session = {
      jwt: token,
    };
    res
      .status(StatusCodes.OK)
      .json({ message: "Logged in successfully", user: user });
  }
  static async getUser(req, res) {
    const { userId } = req.user;
    const user = await UserModel.getUserById(userId);
    const { username, email, isAdmin } = user[0];
    res.status(StatusCodes.OK).json({ username, email, isAdmin });
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

export default UserController;
