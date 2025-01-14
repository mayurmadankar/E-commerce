import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async register(req, res) {
    try {
      const { userName, emailId, password } = req.body;

      const hashPassword = await bcrypt.hash(password, 12);
      // Check if the user is already registered
      const existingUser = await this.userRepository.findByEmail(emailId);
      if (existingUser) {
        return res.status(400).send("User already registered.");
      }

      const userCreated = await this.userRepository.register(
        userName,
        emailId,
        hashPassword
      );
      if (userCreated) {
        res.status(201).send({
          success: true,
          message: "user created successfully ",
          data: userCreated
        });
      } else {
        res.status(400).send({
          success: false,
          message: "user is not created"
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async login(req, res) {
    const { emailId, password } = req.body;

    try {
      // Check if user exists
      const user = await this.userRepository.findByEmail(emailId);
      if (!user) {
        return res.status(400).send({ success: false, message: "Email does not exist!" });
      }

      // Compare password with hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).send({ success: false, message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, emailId: user.emailId },
        process.env.JWT_SECRET,
        { expiresIn: "6h" }
      );

      return res.status(200).send({
        success: true,
        message: "User has been logged in!",
        data: { token }
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
