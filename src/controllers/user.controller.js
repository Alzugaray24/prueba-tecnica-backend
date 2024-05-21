import { userService } from "../services/services.js";
import { getUserIdFromToken } from "../dirname.js";

export const getAllUsersController = async (req, res) => {
  try {
    const users = await userService.getAll();

    if (!users) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [GET] ${
          req.originalUrl
        } - error al obtener todos los usuarios`
      );
      return res
        .status(400)
        .json({ error: "error al obtener todos los usuarios" });
    }

    res.status(200).send({
      status: "success",
      usuarios: users,
    });
  } catch (error) {
    req.logger.error(
      `[${new Date().toLocaleString()}] [GET] ${
        req.originalUrl
      } - Error al obtener los usuarios:`,
      error
    );
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

export const getUserController = async (req, res) => {
  const token = req.token;

  if (!token) {
    req.logger.error(
      `[${new Date().toLocaleString()}] [GET] ${
        req.originalUrl
      } - token inexistente`
    );
    return res.status(401).json({ error: "token inexistente" });
  }

  const userId = getUserIdFromToken(token);

  const user = await userService.findUserById(userId);

  res.status(200).send({
    status: "success",
    usuario: user,
  });
};
