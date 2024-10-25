import BadRequestError from "../errors/badRequest";

class ProductModel {
  constructor() {}
  static requiredFields(title, description, price, quantity, category) {
    if (!title || !description || !price || !quantity || !category) {
      throw new BadRequestError("Please fill all required fields");
    }
  }
}
export default ProductModel;
