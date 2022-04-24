import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import User from "../models/User";

export default class UserController {
  createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Missing Credentials",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({
        name,
        email,
        password: cryptedPassword,
      });

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({
        error: "Failed to create user",
      });
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      /* No need to check if user exists, because the JWT handles it */
      const user = await User.findById(req.user_id);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({
        error: "Failed to get user",
      });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
      return res.status(400).json({
        error: "Missing Credentials",
      });
    }

    let cryptedPassword;
    if (password) {
      cryptedPassword = await bcrypt.hash(password, 10);
    }

    try {
      const user = await User.findByIdAndUpdate(
        req.user_id,
        {
          name,
          email,
          password: cryptedPassword,
        },
        { new: true }
      );

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({
        error: "Failed to update user",
      });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      /* No need to check if user exists, because the JWT handles it */
      await User.findByIdAndDelete(req.user_id);

      return res.status(200).json({
        message: "User deleted",
      });
    } catch (error) {
      return res.status(400).json({
        error: "Failed to delete user",
      });
    }
  };

  loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Missing Credentials",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        error:
          "Invalid credentials" /* Give same error message to avoid pentest attacks */,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  };
}
