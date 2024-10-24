import { Router } from "express";
import UserController from "../controllers/user.controller";
import { authenticateUser, verifyUser } from "../services/auth";

const userRouter = Router();

userRouter
  .post("/users", UserController.createUser)
  .post("/users/admin", UserController.createAdmin)
  .post("/user", UserController.loginUser);

export default userRouter;
