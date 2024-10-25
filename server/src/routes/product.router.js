import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import { authenticateUser, verifyUser, verifyAdmin } from "../services/auth";

const productRouter = Router();

productRouter
  .post("/new", authenticateUser, verifyAdmin, ProductController.createProduct)
  .get("/", authenticateUser, verifyAdmin, ProductController.getProductsByAdmin)
  .get("/", authenticateUser, verifyUser, ProductController.getProducts)
  .get("/:id", authenticateUser, verifyUser, ProductController.getProductById)
  .delete(
    "/:id",
    authenticateUser,
    verifyAdmin,
    ProductController.deleteProductById
  );

export default productRouter;
