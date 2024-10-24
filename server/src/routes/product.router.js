import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import { authenticateUser, verifyUser } from "../services/auth";

const productRouter = Router();

productRouter
  .post("/users", ProductController)
  .post("/user", ProductController);

export default productRouter;
