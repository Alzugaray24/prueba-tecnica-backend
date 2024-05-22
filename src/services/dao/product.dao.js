import db from "../../config/database.js";
import { parseDescription } from "../../dirname.js";

export default class ProductService {
  constructor() {}

  getAll = () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM products";
      db.all(query, (err, rows) => {
        if (err) {
          console.error("Error al obtener los productos:", err.message);
          reject(err);
        } else {
          const products = rows.map((row) => ({
            ...row,
            characteristics: parseDescription(row.description),
          }));
          resolve(products);
        }
      });
    });
  };

  save = (product) => {
    return new Promise((resolve, reject) => {
      const {
        handle,
        title,
        description,
        sku,
        grams,
        stock,
        price,
        compare_price,
        barcode,
      } = product;
      const descriptionString = JSON.stringify(description); // Convertir objeto JSON a string

      const query = `
        INSERT INTO products (handle, title, description, sku, grams, stock, price, compare_price, barcode)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.run(
        query,
        [
          handle,
          title,
          descriptionString,
          sku,
          grams,
          stock,
          price,
          compare_price,
          barcode,
        ],
        function (err) {
          if (err) {
            console.error("Error al crear el producto:", err.message);
            reject(err);
          } else {
            resolve({ id: this.lastID, ...product });
          }
        }
      );
    });
  };

  update = (id, product) => {
    return new Promise((resolve, reject) => {
      const {
        handle,
        title,
        description,
        sku,
        grams,
        stock,
        price,
        compare_price,
        barcode,
      } = product;
      const descriptionString = JSON.stringify(description); // Convertir objeto JSON a string

      const query = `
        UPDATE products
        SET handle = ?, title = ?, description = ?, sku = ?, grams = ?, stock = ?, price = ?, compare_price = ?, barcode = ?
        WHERE id = ?
      `;

      db.run(
        query,
        [
          handle,
          title,
          descriptionString,
          sku,
          grams,
          stock,
          price,
          compare_price,
          barcode,
          id,
        ],
        function (err) {
          if (err) {
            console.error("Error al actualizar el producto:", err.message);
            reject(err);
          } else {
            resolve({ id, ...product });
          }
        }
      );
    });
  };

  delete = (id) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM products WHERE id = ?";

      db.run(query, [id], function (err) {
        if (err) {
          console.error("Error al eliminar el producto:", err.message);
          reject(err);
        } else {
          resolve({ id });
        }
      });
    });
  };
}
