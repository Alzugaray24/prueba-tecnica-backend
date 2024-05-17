import UserService from "./dao/user.dao.js";
import UserRepository from "./repository/user.repository.js";
import AuthRepository from "./repository/auth.repository.js";
import AuthService from "./dao/auth.dao.js";
import ProductRepository from "./repository/product.repository.js";
import ProductService from "./dao/product.dao.js";

const userDao = new UserService();
const authDao = new AuthService();
const prodDao = new ProductService();

export const userService = new UserRepository(userDao);
export const authService = new AuthRepository(authDao);
export const prodService = new ProductRepository(prodDao);
