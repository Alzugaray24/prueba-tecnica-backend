import { Router } from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import config from "../../config/config.js";
import { getCookie } from "../../middlewars/getCookie.js";
import multer from "multer";

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.upload = multer({ dest: "uploads/" });
    this.init();
  }

  getRouter() {
    return this.router;
  }
  init() {
    this.router.use(cookieParser());
    this.router.use(getCookie);
  }

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      getCookie,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      getCookie,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      getCookie,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      getCookie,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  handlePolicies = (policies) => async (req, res, next) => {
    try {
      if (policies[0] === "PUBLIC") return next();

      const token = req.token;

      if (!token) {
        req.logger.info(
          `[${new Date().toLocaleString()}] [handlePolicies] ${
            req.originalUrl
          } Usuario no autenticado o token inexistente`
        );
        return res
          .status(401)
          .send("Usuario no autenticado o token inexistente");
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

  generateCustomResponses = (req, res, next) => {
    res.sendSuccess = (payload) =>
      res.status(200).send({ status: "Success", payload });
    res.sendInternalServerError = (error) =>
      res.status(500).send({ status: "Error", error });
    res.sendClientError = (error) =>
      res
        .status(400)
        .send({ status: "Client Error, Bad request from client.", error });
    res.sendUnauthorizedError = (error) =>
      res
        .status(401)
        .send({ error: "User not authenticated or missing token." });
    res.sendForbiddenError = (error) =>
      res.status(403).send({
        error:
          "Token invalid or user with no access, Unauthorized please check your roles!",
      });
    next();
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
