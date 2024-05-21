import express from "express";
import __dirname from "./dirname.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import { addLogger } from "./config/logger_custom.js";
import config from "./config/config.js";

import UsersExtendRouter from "./routes/custom/users.extend.router.js";
import ProductExtendRouter from "./routes/custom/product.extend.router.js";
import AuthExtendRouter from "./routes/custom/auth.extend.router.js";

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || config.cookiePassword,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
    },
  })
);

app.use(addLogger);

const usersExtendRouter = new UsersExtendRouter();
const productExtendRouter = new ProductExtendRouter();
const authExtendRouter = new AuthExtendRouter();

app.use("/api/extend/users", usersExtendRouter.getRouter());
app.use("/api/extend/products", productExtendRouter.getRouter());
app.use("/api/extend/auth", authExtendRouter.getRouter());

const port = process.env.PORT || config.port;

app.listen(port, "0.0.0.0", console.log(`Server running on port ${port}`));
