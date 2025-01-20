import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectUsingMongoose } from "./src/config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./src/features/users/user.routes.js";
import session from "express-session";
import ProductRouter from "./src/features/admin/products.router.js";
import { errorHandlerMiddleware } from "./src/middleware/applicationError.middleware.js";

const server = express();
const port = process.env.PORT;

server.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "content-Type",
      "Authorization",
      "Cache-Control",
      "Expries",
      "pragma"
    ],
    credentials: true
  })
);
// Session middleware setup
server.use(
  session({
    secret: process.env.SESSION_SECRET || "mySecret", // Secret key for signing the session ID
    resave: false, // Don't save session if not modified
    saveUninitialized: true, // Save uninitialized sessions
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 60000 // Session expiry time (1 minute)
    }
  })
);

server.use(cookieParser());
server.use(express.json());

//userRouter
server.use("/api/user", userRouter);

//productRouter
server.use("/api/admin/products", ProductRouter);

server.use(errorHandlerMiddleware);

server.get("/", (req, res) => {
  res.send("Welcome to the ecommerce application");
});

server.listen(port, () => {
  console.log(`server is listening at port number ${port}`);
  connectUsingMongoose();
});
