import CustomRouter from "./custom.router.js";
import { getAllUsersController } from "../../controllers/user.controller.js";

export default class UsersExtendRouter extends CustomRouter {
  init() {
    this.get("/", ["PUBLIC"], getAllUsersController);
  }
}
