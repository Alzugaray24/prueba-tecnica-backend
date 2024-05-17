import CustomRouter from "./custom.router.js";
import {
  registerUserController,
  loginUserController,
} from "../../controllers/auth.controller.js";

export default class AuthExtendRouter extends CustomRouter {
  init() {
    this.post("/register", ["PUBLIC"], registerUserController);
    this.post("/login", ["PUBLIC"], loginUserController);
  }
}
