import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "./config/config.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

export const generateJWToken = (user) => {
  return jwt.sign({ user }, config.privateKey, { expiresIn: "1h" });
};

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .send({ error: "User not authenticated or missing token." });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, config.privateKey, (error, credentials) => {
    if (error)
      return res.status(403).send({ error: "Token invalid, Unauthorized!" });
    req.user = credentials.user;
    next();
  });
};

export const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user)
      return res.status(401).send("Unauthorized: User not found in JWT");

    if (req.user.role !== role) {
      return res
        .status(403)
        .send("Forbidden: User does not have permissions with this role.");
    }
    next();
  };
};

export const getUserIdFromToken = (token) => {
  try {
    if (!token) {
      throw new Error("Token de autenticación no proporcionado.");
    }

    const decodedToken = jwt.verify(token, config.privateKey);

    if (!decodedToken) {
      throw new Error("Token de autenticación inválido.");
    }

    const userId = decodedToken.user.id;

    return userId;
  } catch (error) {
    throw new Error("Error al obtener el ID de usuario del token.");
  }
};

export const parseDescription = (description) => {
  try {
    const descriptionObj = JSON.parse(description);
    return descriptionObj.characteristics;
  } catch (error) {
    return null;
  }
};

export default __dirname;
