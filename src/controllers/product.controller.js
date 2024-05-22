import { prodService } from "../services/services.js";
import fs from "fs";
import db from "../config/database.js";

export const getProductController = async (req, res) => {
  const products = await prodService.getAll();
  if (!products) {
    req.logger.error(
      `[${new Date().toLocaleString()}] [POST] ${
        req.originalUrl
      } - No existen productos en la base de datos`
    );
    return res
      .status(400)
      .json({ error: "No existen productos en la base de datos" });
  }

  res.status(200).send({
    status: "success",
    products,
  });
};

export const postProductController = async (req, res) => {
  try {
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
    } = req.body;
    const productData = {
      handle,
      title,
      description,
      sku,
      grams,
      stock,
      price,
      compare_price,
      barcode,
    };

    const product = await prodService.save(productData);

    if (!product) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [POST] ${
          req.originalUrl
        } - No existe el producto`
      );
      return res.status(400).json({ error: "No existe el producto" });
    }

    req.logger.info(
      `[${new Date().toLocaleString()}] [POST] ${
        req.originalUrl
      } - Producto creado con éxito`
    );
    return res.status(200).json({ status: "success", payload: product });
  } catch (error) {
    req.logger.error(
      `[${new Date().toLocaleString()}] [POST] ${
        req.originalUrl
      } - Error al crear el producto:`,
      error
    );
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

export const postProductsUploadController = async (req, res) => {
  const filePath = req.file.path;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo JSON:", err.message);
      return res.status(500).send("Error al leer el archivo JSON");
    }

    try {
      const jsonData = JSON.parse(data);

      db.serialize(() => {
        const stmt = db.prepare(`
          INSERT INTO products (handle, title, description, sku, grams, stock, price, compare_price, barcode) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        jsonData.forEach((row) => {
          stmt.run(
            row.Handle,
            row.Title,
            row.Description,
            row.SKU,
            row.Grams,
            row.Stock,
            row.Price,
            row["Compare Price"],
            row.Barcode
          );
        });

        stmt.finalize((err) => {
          if (err) {
            console.error("Error al insertar datos:", err.message);
            return res.status(500).send("Error al insertar datos");
          }
          res.send("Archivo cargado e datos importados exitosamente");
        });
      });
    } catch (error) {
      console.error("Error al analizar el archivo JSON:", error.message);
      res.status(400).send("Error al analizar el archivo JSON");
    } finally {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error al eliminar el archivo:", err.message);
        }
      });
    }
  });
};

export const putProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const newProduct = req.body;

    const updatedProduct = await prodService.update(id, newProduct);

    if (!updatedProduct) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [PUT] ${
          req.originalUrl
        } - Producto no encontrado para actualizar`
      );
      return res
        .status(404)
        .json({ error: "Producto no encontrado para actualizar" });
    }

    req.logger.info(
      `[${new Date().toLocaleString()}] [PUT] ${
        req.originalUrl
      } - Producto actualizado con éxito`
    );

    return res.status(200).json({ status: "success", updatedProduct });
  } catch (error) {
    req.logger.error(
      `[${new Date().toLocaleString()}] [PUT] ${
        req.originalUrl
      } - Error al actualizar el producto:`,
      error
    );
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProd = await prodService.delete(id);

    if (!deletedProd) {
      req.logger.error(
        `[${new Date().toLocaleString()}] [DELETE] ${
          req.originalUrl
        } - No se pudo eliminar el producto`
      );
      return res.status(404).json({ error: "No se pudo eliminar el producto" });
    }

    return res.status(200).send({
      status: "success",
      msg: `Producto con id ${id} eliminado con exito`,
    });
  } catch (error) {
    req.logger.error(
      `[${new Date().toLocaleString()}] [PUT] ${
        req.originalUrl
      } - Error al actualizar el producto:`,
      error
    );
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};
