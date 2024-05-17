import sqlite3 from "sqlite3";
import config from "./config.js";

const dbName = config.squliteUrl;
const db = new sqlite3.Database(dbName, (err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err.message);
  } else {
    console.log("Conectado a la base de datos");
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        email TEXT UNIQUE,
        age INTEGER,
        password TEXT
      )`,
      (err) => {
        if (err) {
          console.error("Error al crear la tabla 'users':", err.message);
        } else {
          console.log("Tabla 'users' creada o ya existía");
        }
      }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        handle TEXT,
        title TEXT,
        description TEXT,
        sku TEXT,
        grams INTEGER,
        stock INTEGER,
        price REAL,
        compare_price REAL,
        barcode TEXT
      )`,
      (err) => {
        if (err) {
          console.error("Error al crear la tabla 'products':", err.message);
        } else {
          console.log("Tabla 'products' creada o ya existía");
        }
      }
    );
  }
});

export default db;
