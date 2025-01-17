import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async register(req, res) {
    try {
      const { userName, email, password } = req.body;

      const hashPassword = await bcrypt.hash(password, 12);
      // Check if the user is already registered
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        return res.status(400).send("User already registered.");
      }

      const userCreated = await this.userRepository.register(
        userName,
        email,
        hashPassword
      );
      if (userCreated) {
        res.status(201).send({
          success: true,
          message: "Registration Successfull ",
          data: userCreated
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Registration Failed"
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return res
          .status(400)
          .send({ success: false, message: "Email does not exist!" });
      }

      // Compare password with hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .send({ success: false, message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, role: user.role, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "6h" }
      );
      res
        .status(201)
        .cookie("jwtToken", token, { maxAge: 900000, httpOnly: false })
        .json({
          success: true,
          message: "Login Successfully",
          user: {
            email: user.email,
            role: user.role,
            userId: user._id
          }
        });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
}
