import sql from "../db";
import BadRequestError from "../errors/badRequest";

class ProductModel {
  constructor() {}
  static requiredFields(title, description, price, quantity, category) {
    if (!title || !description || !price || !quantity || !category) {
      throw new BadRequestError("Please fill all required fields");
    }
  }
  static async createProduct(
    title,
    description,
    price,
    quantity,
    category,
    userId
  ) {
    // TODO: Implement logic to create a product in the database
    const result =
      await sql`INSERT INTO product (title, description, price, quantity, category, "userId") VALUES (${title}, ${description}, ${price}, ${quantity}, ${category}, ${userId} ) `;
    return result[0];
  }
  static async getProductsByAdmin(userId) {
    // TODO: Implement logic to get products by admin from the database
    const products =
      await sql`SELECT * FROM product WHERE "userId" = ${userId}`;
    console.log("Products", products);
    return products;
  }
  static async getAllProducts() {
    // TODO: Implement logic to get all products from the database
    const products = await sql`SELECT * FROM product`;
    return products;
  }
  static async getProductById(id) {
    const product = await sql`SELECT * FROM product WHERE id = ${id}`;
    return product;
  }
}
export default ProductModel;
