import { StatusCodes } from "http-status-codes";
import ProductModel from "../model/product.model.js";
import BadRequestError from "../errors/badRequest";
import NotFoundError from "../errors/notFound";

class ProductController extends ProductModel {
  constructor() {}
  static async createProduct(req, res) {
    const { title, description, price, quantity, category } = req.body;
    ProductModel.requiredFields(title, description, price, quantity, category);
    const product = await ProductModel.createProduct(
      title,
      description,
      price,
      quantity,
      category
    );
    res.status(StatusCodes.CREATED).json(product);
  }
}

export default ProductController;
