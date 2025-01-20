import express from "express";
import ProductController from "./products.controller.js";
import { upload } from "../../helpers/cloudinary.js";

const ProductRouter = express.Router();

let productController = new ProductController();

ProductRouter.post(
  "/upload-image",
  upload.single("my_file"),
  (req, res, next) => {
    productController.handleImageUpload(req, res, next);
  }
);
ProductRouter.post("/add", (req, res, next) => {
  productController.addProducts(req, res, next);
});
ProductRouter.put("/edit/:id", (req, res, next) => {
  productController.editProduct(req, res, next);
});
ProductRouter.delete("/delete/:id", (req, res, next) => {
  productController.deleteProduct(req, res, next);
});
ProductRouter.get("/get", (req, res, next) => {
  productController.fetchAllProducts(req, res, next);
});

export default ProductRouter;
