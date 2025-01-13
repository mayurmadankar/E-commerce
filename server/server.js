import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectUsingMongoose } from "./config/db.js";
import cookieParser from "cookieParser";
import cors from "cors";

const server = express();
const port = process.env.PORT;

server.use(
  cors({
    origin: "http://localhost:5173/",
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
server.use(cookieParser());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Welcome to the ecommerce application");
});

server.listen(port, () => {
  console.log(`server is listening at port number ${port}`);
  connectUsingMongoose();
});
