import { Request, Response } from "express";
import List from "../models/List";
import Task from "../models/Task";

export default class TaskController {
  createTask = async (req: Request, res: Response) => {
    const { list } = req.params;
    const { description } = req.body;

    if (!list) {
      return res.status(400).json({ message: "List id is required" });
    }

    if (!description) {
      return res.status(400).json({ message: "Missing description" });
    }

    try {
      const checkList = await List.findById(list);

      if (!checkList) {
        return res.status(404).json({
          message: "List not found",
        });
      }

      const task = await Task.create({
        list,
        description,
      });

      await List.findByIdAndUpdate(
        list,
        { $addToSet: { tasks: task._id } },
        { new: true }
      );

      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({ message: "Failed to create task" });
    }
  };

  getTask = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Task id is required" });
    }

    try {
      const task = await Task.findById(id);

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({ message: "Failed to get task" });
    }
  };

  updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Task id is required" });
    }

    try {
      const task = await Task.findByIdAndUpdate(id, req.body, { new: true });

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({ message: "Failed to update task" });
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Task id is required" });
    }

    try {
      const deleteTask = await Task.findByIdAndDelete(id);

      if (!deleteTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(200).json({ message: "Task deleted" });
    } catch (error) {
      return res.status(400).json({ message: "Failed to delete task" });
    }
  };
}
