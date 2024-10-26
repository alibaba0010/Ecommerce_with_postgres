import { Router } from "express";
import UserController from "../controllers/user.controller";
import { authenticateUser, verifyUser } from "../services/auth";

const userRouter = Router();

userRouter
  .post("/users", UserController.createUser)
  .post("/users/admin", UserController.createAdmin)
  .post("/user", UserController.loginUser)
  .get("/user", authenticateUser, verifyUser, UserController.getUser)
  .patch("/user", authenticateUser, verifyUser, UserController.updateUser)
  .delete("/user", authenticateUser, verifyUser, UserController.deleteUser);

export default userRouter;
