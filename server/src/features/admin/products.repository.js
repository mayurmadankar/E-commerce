import ApplicationError from "../../middleware/applicationError.middleware.js";
import { ProductModel } from "./products.schema.js";

export default class ProductRepository {
  async addProduct(
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    averageReview
  ) {
    try {
      const newProduct = ProductModel({
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        averageReview
      });
      const result = await newProduct.save();
      return result;
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
  async fetchAllProducts() {
    try {
      const result = await ProductModel.find({});
      return result;
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
  async editProduct(
    id,
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    averageReview
  ) {
    try {
      const findProduct = await ProductModel.findById(id);
      if (!findProduct) {
        throw new Error("Product not Found");
      }
      findProduct.title = title || findProduct.title;
      findProduct.description = description || findProduct.description;
      findProduct.category = category || findProduct.category;
      findProduct.brand = brand || findProduct.brand;
      findProduct.price = price === "" ? 0 : price || findProduct.price;
      findProduct.salePrice =
        salePrice === "" ? 0 : salePrice || findProduct.salePrice;
      findProduct.totalStock = totalStock || findProduct.totalStock;
      findProduct.image = image || findProduct.image;
      findProduct.averageReview = averageReview || findProduct.averageReview;

      return await findProduct.save();
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
  async deleteProduct(id) {
    try {
      const deleted = await ProductModel.findByIdAndDelete(id);
      if (!deleted) {
        throw new Error("Product not Found");
      }
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
}
