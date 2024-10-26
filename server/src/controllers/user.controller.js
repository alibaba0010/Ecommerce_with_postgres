import { StatusCodes } from "http-status-codes";
import UserModel from "../model/user.model";
import BadRequestError from "../errors/badRequest";
import NotFoundError from "../errors/notFound";
import ProductModel from "../model/product.model.js";

class UserController extends UserModel {
  constructor() {}
  static async createUser(req, res) {
    const { username, email, password, confirmPassword } = req.body;
    UserModel.requiredFields(username, email, password, confirmPassword);
    UserModel.validatePassword(password, confirmPassword);
    UserModel.checkPassword(password);
    UserModel.validateEmail(email);
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
    UserModel.checkPassword(password);
    UserModel.validateEmail(email);
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
    res.status(StatusCodes.OK).json({ user: { username, email, isAdmin } });
  }
  static async updateUser(req, res) {
    const { userId } = req.user;
    const { username } = req.body;
    if (!username) throw new BadRequestError("Please provide a username");
    const user = await UserModel.getUserById(userId);
    if (!user.length) throw new NotFoundError("User not found");

    // TODO: update user in db
    const newUser = await UserModel.updateUser(user[0].username, username);
    // TODO: return updated user
    res.status(StatusCodes.OK).json({ message: "User updated successfully" });
  }
  static async deleteUser(req, res) {
    const { userId } = req.user;
    const user = await UserModel.getUserById(userId);
    if (!user.length) throw new NotFoundError("User not found");
    // TODO: check if user is admin
    console.log(user[0]);
    const { isAdmin } = user[0];
    console.log("isAdmin: " + isAdmin);
    if (isAdmin === true) {
      // TODO: check if user has any products
      const checkProduct = await ProductModel.checkProduct(user[0].id);
      // TODO: check if user has any orders
      // TODO: check if user has any reviews
      // TODO: check if user has any transactions
      // TODO: check if user has any wishlists
      // TODO: check if user has any favorites
    }
    // TODO: check if user exist
    // TODO: get user from db
    // TODO: delete user from db
    // TODO: return user deleted successfully
    res.status(StatusCodes.OK).json({ message: "User deleted successfully" });
  }
}

export default UserController;
