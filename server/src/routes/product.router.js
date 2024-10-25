import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import { authenticateUser, verifyUser, verifyAdmin } from "../services/auth";

const productRouter = Router();

productRouter
  .post("/users", authenticateUser, verifyAdmin, ProductController)
  .post("/user", ProductController);

export default productRouter;
