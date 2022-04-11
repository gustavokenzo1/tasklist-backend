import TaskController from "../controllers/TaskController";
import { Request, Response } from "express";

const { Router } = require("express");

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.post("/:list", (req: Request, res: Response) => {
  taskController.createTask(req, res);
});

taskRoutes.get("/:id", (req: Request, res: Response) => {
  taskController.getTask(req, res);
});

taskRoutes.put("/:id", (req: Request, res: Response) => {
  taskController.updateTask(req, res);
});

taskRoutes.delete("/:id", (req: Request, res: Response) => {
  taskController.deleteTask(req, res);
});

export default taskRoutes;