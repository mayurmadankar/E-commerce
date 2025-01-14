import UserController from "./user.controller.js";
import express from "express";

const userRouter = express.Router();

let userController = new UserController();

// signUp
userRouter.post("/register", (req, res) => {
  userController.register(req, res);
});
//gignIn
userRouter.post("/login", (req, res) => {
  userController.login(req, res);
});
export default userRouter;
