import { StatusCodes } from "http-status-codes";
import ProductModel from "../model/product.model.js";
import BadRequestError from "../errors/badRequest";
import NotFoundError from "../errors/notFound";
import UserModel from "../model/user.model.js";

class ProductController extends ProductModel {
  constructor() {}
  static async createProduct(req, res) {
    const { userId } = req.user;
    const { title, description, price, quantity, category } = req.body;
    ProductModel.requiredFields(
      title,
      description,
      price,
      quantity,
      category,
      userId
    );
    const product = await ProductModel.createProduct(
      title,
      description,
      price,
      quantity,
      category,
      userId
    );
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Product created successfully" });
  }
  static async getProductsByAdmin(req, res) {
    const { userId } = req.user;
    const products = await ProductModel.getProductsByAdmin(userId);
    if (!products.length) throw new NotFoundError("No products found");
    res.status(StatusCodes.OK).json({ products });
  }
  static async getProducts(req, res) {
    // TODO Add pagination
    const products = await ProductModel.getAllProducts();
    res.json(products);
  }
  static async getProductById(req, res) {
    const { id } = req.params;
    const product = await ProductModel.getProductById(id);
    if (!product.length) throw new NotFoundError("Product not found");
    const { created_at, userId, ...others } = product[0];

    res.status(StatusCodes.OK).json(others);
  }
}

export default ProductController;
