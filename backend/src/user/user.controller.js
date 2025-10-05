import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";

class UserController {
  constructor() {
    this.repo = new UserRepository();
  }

  async register(req, res) {
    let { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await this.repo.register({ username, email, password: hash });
    if (!user) return res.send("User already exists");
    res.status(201).json({ message: "Registered successfully", user });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await this.repo.findByEmail(email);
    if (!user) return res.send("Invalid user");
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.send("Wrong password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.cookie("token", token).json({ message: "Login successful" });
  }

  logout(req, res) {
    res.clearCookie("token").json({ message: "Logged out" });
  }
}

export default UserController;
