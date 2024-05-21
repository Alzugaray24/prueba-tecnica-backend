import {
  getProductController,
  postProductController,
  putProductController,
  deleteProductController,
} from "../../controllers/product.controller.js";
import CustomRouter from "./custom.router.js";

export default class ProductExtendRouter extends CustomRouter {
  init() {
    this.get("/", ["USER"], getProductController);
    this.post("/", ["PUBLIC"], postProductController);
    this.put("/:id", ["PUBLIC"], putProductController);
    this.delete("/:id", ["PUBLIC"], deleteProductController);
  }
}
