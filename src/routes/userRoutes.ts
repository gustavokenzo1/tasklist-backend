import UserController from "../controllers/UserController";
import { Request, Response } from "express";
import ensureAuthenticated from "../middleware/auth";

const userRoutes = require("express").Router();

const userController = new UserController();

userRoutes.post("/", (req: Request, res: Response) => {
  userController.createUser(req, res);
});

userRoutes.post("/login", (req: Request, res: Response) => {
  userController.loginUser(req, res);
});

userRoutes.delete("/", ensureAuthenticated, (req: Request, res: Response) => {
  userController.deleteUser(req, res);
});

userRoutes.get("/", ensureAuthenticated, (req: Request, res: Response) => {
  userController.getUser(req, res);
});

userRoutes.patch("/", ensureAuthenticated, (req: Request, res: Response) => {
  userController.updateUser(req, res);
});

export default userRoutes;
