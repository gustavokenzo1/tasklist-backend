import { Request, Response } from "express";
import TaskController from "../controllers/TaskController";
import ensureAuthenticated from "../middleware/auth";

const taskRoutes = require("express").Router();

const taskController = new TaskController();

taskRoutes.post("/:id", ensureAuthenticated, (req: Request, res: Response) => {
  taskController.createTask(req, res);
});

taskRoutes.patch("/:id", ensureAuthenticated, (req: Request, res: Response) => {
  taskController.updateTask(req, res);
});

taskRoutes.get("/:id", ensureAuthenticated, (req: Request, res: Response) => {
  taskController.getOneTask(req, res);
});

taskRoutes.get("/", ensureAuthenticated, (req: Request, res: Response) => {
  taskController.getAllUserTasks(req, res);
});

taskRoutes.delete(
  "/:id",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    taskController.deleteTask(req, res);
  }
);

export default taskRoutes;
