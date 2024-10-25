import sql from "../db";
import BadRequestError from "../errors/badRequest";
import NotFoundError from "../errors/notFound";

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
  static async deleteProductById(id, userId) {
    // TODO: Implement logic to delete a product by admin from the database
    const user =
      await sql`SELECT FROM product WHERE id = ${id} AND "userId" = ${userId}`;
    if (!user.length) throw new NotFoundError("Product not found");
    const result =
      await sql`DELETE FROM product WHERE id = ${id} AND "userId" = ${userId}`;
    return result;
  }
}
export default ProductModel;
