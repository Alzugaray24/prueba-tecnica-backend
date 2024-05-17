import db from "../../config/database.js";

export default class UserService {
  constructor() {}

  getAll = () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users";
      db.all(query, (err, rows) => {
        if (err) {
          console.error("Error getting items:", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };

  findByEmail = (email) => {
    console.log("Correo electrónico buscado:", email);
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE email = ?";
      db.get(query, [email], (err, row) => {
        if (err) {
          console.error("Error al buscar usuario por email:", err.message);
          reject(err);
        } else {
          if (row) {
            console.log("Usuario encontrado:", row);
          } else {
            console.log(
              "No se encontró ningún usuario con el correo electrónico proporcionado."
            );
          }
          resolve(row);
        }
      });
    });
  };
}