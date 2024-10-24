import { StatusCodes } from "http-status-codes";
import ProductModel from "../model/product.model.js";
import BadRequestError from "../errors/badRequest";
import NotFoundError from "../errors/notFound";

class ProductController extends ProductModel {}

export default ProductController;
