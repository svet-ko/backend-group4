import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import passport from "passport"
import cors from "cors"
import morgan from "morgan"

import { apiErrorHandler } from "./middlewares/error"
import { routeNotFound } from "./middlewares/routeNotFound"
import { loginWithGoogle } from "./middlewares/loginWithGoogle"
import authRoute from "./routes/authRoute"
import categoriesRoute from "./routes/categoriesRoute"
import productsRoute from "./routes/productsRoute"
import usersRoute from "./routes/usersRoute"
import ordersRoute from "./routes/ordersRoute"
import { connectDb } from "../utils/connectDb"
import server from "../utils/server"
import paymentsRoute from "./routes/paymentsRoute"

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
