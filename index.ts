import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import passport from "passport"

import { loggingMiddleware } from "./middlewares/logging.js"
import { apiErrorHandler } from "./middlewares/error.js"
import { routeNotFound } from "./middlewares/routeNotFound.js"
import { loginWithGoogle } from "./middlewares/loginWithGoogle"
import authRoute from "./routes/authRoute.js"
import categoriesRoute from "./routes/categoriesRoute.js"
import productsRoute from "./routes/productsRoute.js"
import usersRoute from "./routes/usersRoute.js"
import ordersRoute from "./routes/ordersRoute.js"

const PORT = 8080;
const app = express();

app.use(express.json());

app.use(passport.initialize())
passport.use(loginWithGoogle())

// TODO: Validate .env using Zod
const mongoURL = process.env.DB_URL as string;
mongoose.connect(mongoURL).then(() => console.log("Connected!"));

app.get("/hello", loggingMiddleware, (_, res) => {
  res.json({ msg: "hello, from Express.js!" });
});

app.use(loggingMiddleware);

app.use("/api/v1/categories", categoriesRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/orders", ordersRoute);

app.use(apiErrorHandler);
app.use(routeNotFound);

app.listen(PORT, () => {
  console.log(`👀 app is running at localhost:${PORT}`);
});
