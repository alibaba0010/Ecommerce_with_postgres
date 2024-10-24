import { Router } from "express";
import UsersController from "../controllers/user.controller";
import { authenticateUser, verifyUser } from "../services/auth";

const userRouter = Router();

productRouter
  .post("/users", UsersController.createUser)
  .post("/user", UsersController.loginUser);

export default productRouter;
