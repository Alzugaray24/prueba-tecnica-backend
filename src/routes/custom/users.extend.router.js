import CustomRouter from "./custom.router.js";
import {
  getAllUsersController,
  getUserController,
} from "../../controllers/user.controller.js";

export default class UsersExtendRouter extends CustomRouter {
  init() {
    this.get("/", ["PUBLIC"], getAllUsersController);
    this.get("/profile", ["PUBLIC"], getUserController);
  }
}
