import db from "../../config/database.js";

export default class AuthService {
  constructor() {}

  save = (user) => {
    try {
      const { first_name, last_name, email, age, password } = user;

      const query =
        "INSERT INTO users (first_name, last_name, email, age, password) VALUES (?, ?, ?, ?, ?)";
      db.run(query, [first_name, last_name, email, age, password]);

      console.log("Usuario guardado con éxito");
    } catch (error) {
      console.error("Error al guardar usuario:", error.message);
      throw error;
    }
  };

  login = (email) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE email = ?";

      db.get(query, [email], (err, user) => {
        if (err) {
          console.error("Error al buscar usuario por email:", err.message);
          reject(err);
        } else if (!user) {
          console.log(
            "No se encontró ningún usuario con el correo electrónico proporcionado."
          );
          resolve(null);
        } else {
          resolve(user);
        }
      });
    });
  };
}
