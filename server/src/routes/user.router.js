import { Router } from "express";
// import UsersController from "../controllers/user.controller";
import { authenticateUser, verifyUser } from "../services/auth";

const userRouter = Router();

userRouter.post("/api/users");

export default userRouter;
