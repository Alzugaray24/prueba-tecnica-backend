import { Router } from "express";
import jwt from "jsonwebtoken";
import config from "../../config/config.js";

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }
  init() {
    this.router.use();
  }

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  handlePolicies = (policies) => async (req, res, next) => {
    try {
      if (policies[0] === "PUBLIC") return next();

      const token = req.cookies.token;

      if (!token) {
        req.logger.info(
          `[${new Date().toLocaleString()}] [handlePolicies] ${
            req.originalUrl
          } Usuario no autenticado o token inexistente`
        );
        throw new Error("Usuario no autenticado o token inexistente");
      }

      jwt.verify(token, config.privateKey, (error, credential) => {
        if (error) {
          req.logger.info(
            `[${new Date().toLocaleString()}] [handlePolicies] ${
              req.originalUrl
            } El usuario no tiene privilegios, revisa tus roles!`
          );
          throw new Error("Token invalido, no tiene autorizacion");
        }

        const user = credential.user;

        if (!policies.includes(user.role.toUpperCase())) {
          req.logger.info(
            `[${new Date().toLocaleString()}] [handlePolicies] ${
              req.originalUrl
            } El usuario no tiene privilegios, revisa tus roles!`
          );
          throw new Error("El usuario no tiene privilegios, revisa tus roles!");
        }

        req.user = user;

        next();
      });
    } catch (error) {
      res.status(403).render("error", {
        error: error.message,
        cssFileName: "error.css",
      });
    }
  };

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...item) => {
      try {
        await callback.apply(this, item);
      } catch (error) {
        console.error(error);
        item[1].status(500).send(error);
      }
    });
  }
}
