import dotenv from "dotenv";
import program from "../process.js";

dotenv.config();

const mode = program.opts().mode;

let envFilePath;

switch (mode) {
  case "dev":
    envFilePath = "./src/config/.env.development";
    break;
  case "prod":
    envFilePath = "./src/config/.env.production";
    break;
  case "test":
    envFilePath = "./src/config/.env.testing";
    break;
  default:
    throw new Error("Invalid mode specified");
}

dotenv.config({ path: envFilePath });

export default {
  port: process.env.PORT,
  squliteUrl: process.env.SQLITE,
  environment: mode,
  cookiePassword: process.env.COOKIEPASSWORD,
  privateKey: process.env.PRIVATE_KEY,
};
