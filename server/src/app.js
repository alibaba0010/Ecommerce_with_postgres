import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import userRouter from "./routes/user.router";
import productRouter from "./routes/product.router.js";
import { errorHandler } from "./errors/error";
import { routeError } from "./errors/route.error";
dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const app = express();
app
  .use(cors())
  .use(json())
  .use(limiter)
  .use(
    cookieSession({
      httpOnly: true,
      signed: false,
      secure: false, //process.env.NODE_ENV !== "test"
      maxAge: 24 * 60 * 60 * 1000,
    })
  )
  .use("/api/v1", userRouter)
  // .use("/v1", orderRouter)
  .use("/api/v1/products", productRouter)
  // .use("/v1", cartRouter)
  // .use("/", express.static("public"))

  .use(routeError)
  .use(errorHandler);

export default app;

//   cors({
//     origin: ["http://localhost:3000", "https://pinvent-app.vercel.app"],
//     credentials: true,
//   })
