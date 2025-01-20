import imageUploadUtil from "../../helpers/cloudinary.js";
import ProductRepository from "./products.repository.js";

export default class ProductController {
  constructor() {
    this.repository = new ProductRepository();
  }
  async handleImageUpload(req, res, next) {
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const url = "data:" + req.file.mimetype + ";base64," + b64;
      const result = await imageUploadUtil(url);

      res.json({
        success: true,
        result
      });
    } catch (error) {
      next(error);
    }
  }
  async addProducts(req, res, next) {
    try {
      const {
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        averageReview
      } = req.body;

      console.log(averageReview, "averageReview");

      const result = await this.repository.addProduct(
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        averageReview
      );
      if (result) {
        res.status(201).json({
          success: true,
          message: "Product is Created",
          data: result
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Product is not Created"
        });
      }
    } catch (error) {
      next(error);
    }
  }
  //fetch all products
  async fetchAllProducts(req, res) {
    try {
      const listOfProducts = await this.repository.fetchAllProducts();

      if (listOfProducts) {
        res.status(200).json({
          success: true,
          message: "Products is Fetched",
          data: listOfProducts
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Products is not Fetch"
        });
      }
    } catch (error) {
      next(error);
    }
  }
  //edit and product
  async editProduct(req, res) {
    try {
      const { id } = req.params;
      const {
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        averageReview
      } = req.body;

      const edited = await this.repository.editProduct(
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
      );
      if (edited) {
        res.status(200).json({
          success: true,
          message: "Product is Edited",
          data: edited
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Product is not Edited"
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  // delete a specific product using product id
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      const deleted = await this.repository.deleteProduct(id);
      if (deleted) {
        res.status(200).json({
          success: true,
          message: "Product is Deleted successfully"
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Product is not Deleted"
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
