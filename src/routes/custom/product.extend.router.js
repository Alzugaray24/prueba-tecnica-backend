import CustomRouter from "./custom.router.js";
import {
  getProductController,
  postProductController,
  putProductController,
  deleteProductController,
  postProductsUploadController,
} from "../../controllers/product.controller.js";

export default class ProductExtendRouter extends CustomRouter {
  constructor() {
    super();
  }

  init() {
    this.get("/", ["USER"], getProductController);
    this.post("/", ["USER"], postProductController);
    this.post(
      "/upload",
      ["USER"],
      this.upload.single("file"),
      postProductsUploadController
    );
    this.put("/:id", ["USER"], putProductController);
    this.delete("/:id", ["USER"], deleteProductController);
  }
}
