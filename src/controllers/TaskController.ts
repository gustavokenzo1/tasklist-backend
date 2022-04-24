import { Request, Response } from "express";
import List from "../models/List";
import Task from "../models/Task";

export default class TaskController {
  createTask = async (req: Request, res: Response) => {
    const { description } = req.body;
    const list_id = req.params.id;

    if (!list_id || !description) {
      return res.status(400).json({
        error: "Missing Credentials",
      });
    }

    const listExists = await List.findById(list_id);

    if (!listExists) {
      return res.status(400).json({
        error: "List does not exist",
      });
    }

    try {
      const task = await Task.create({
        user: req.user_id,
        list: list_id,
        description,
      });

      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({
        error: "Failed to create task",
      });
    }
  };

  getOneTask = async (req: Request, res: Response) => {
    const task_id = req.params.id;

    try {
      const task = await Task.findById(task_id);

      if (!task) {
        return res.status(404).json({
          error: "Task not found",
        });
      }

      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({
        error: "Failed to get task",
      });
    }
  };

  getAllUserTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ user: req.user_id });

      if (!tasks) {
        return res.status(404).json({
          error: "Tasks not found",
        });
      }

      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(400).json({
        error: "Failed to get tasks",
      });
    }
  };

  updateTask = async (req: Request, res: Response) => {
    const { description, completed } = req.body;
    const task_id = req.params.id;

    if (!task_id || (!description && !completed)) {
      return res.status(400).json({
        error: "Missing Credentials",
      });
    }

    const taskExists = await Task.findById(task_id);

    if (!taskExists) {
      return res.status(400).json({
        error: "Task does not exist",
      });
    }

    try {
      const task = await Task.findByIdAndUpdate(
        task_id,
        {
          description,
          completed,
        },
        { new: true }
      );

      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({
        error: "Failed to update task",
      });
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    const task_id = req.params.id;

    const taskExists = await Task.findById(task_id);

    if (!taskExists) {
      return res.status(400).json({
        error: "Task does not exist",
      });
    }

    try {
      await Task.findByIdAndDelete(task_id);

      return res.status(200).json({
        message: "Task deleted",
      });
    } catch (error) {
      return res.status(400).json({
        error: "Failed to delete task",
      });
    }
  };
}
