import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import { authenticateUser, verifyUser, verifyAdmin } from "../services/auth";

const productRouter = Router();

productRouter
  .post("/new", authenticateUser, verifyAdmin, ProductController.createProduct)
  .post("/user", ProductController);

export default productRouter;
