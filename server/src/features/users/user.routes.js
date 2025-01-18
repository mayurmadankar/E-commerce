import jwtAuth from "../../middleware/jwt.middleware.js";
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
//logout
userRouter.post("/logout", (req, res) => {
  userController.logout(req, res);
});
//jwtAuth
userRouter.get("/check-auth", jwtAuth, (req, res) => {
  const user = req.userId;
  // console.log(user);
  res.status(200).json({
    success: true,
    message: "Authenticated user",
    user
  });
});
export default userRouter;
