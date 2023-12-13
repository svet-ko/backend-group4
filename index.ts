import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import passport from "passport"
import cors from "cors"
import morgan from "morgan"

import { apiErrorHandler } from "./src/middlewares/error"
import { routeNotFound } from "./src/middlewares/routeNotFound"
import { loginWithGoogle } from "./src/middlewares/loginWithGoogle"
import authRoute from "./src/routes/authRoute"
import categoriesRoute from "./src/routes/categoriesRoute"
import productsRoute from "./src/routes/productsRoute"
import usersRoute from "./src/routes/usersRoute"
import ordersRoute from "./src/routes/ordersRoute"
import { connectDb } from "./utils/connectDb"
import server from "./utils/server"
import paymentsRoute from "./src/routes/paymentsRoute"

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(cors());

connectDb();
app.use(passport.initialize())
passport.use(loginWithGoogle())

app.use(morgan('tiny'));
app.use("/api/v1/categories", categoriesRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/orders", ordersRoute);
app.use("/api/v1/payments", paymentsRoute);

app.use(apiErrorHandler);
app.use(routeNotFound);

app.listen(PORT, () => {
  console.log(`👀 app is running at localhost:${PORT}`);
});

export default app;
