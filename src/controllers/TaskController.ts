import { Request, Response } from "express";
import List from "../models/List";
import Task from "../models/Task";

export default class TaskController {
  createTask = async (req: Request, res: Response) => {
    const { list } = req.params;
    const { description } = req.body;

    try {
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

    try {
      const task = await Task.findById(id);

      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({ message: "Failed to get task" });
    }
  };

  updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const task = await Task.findByIdAndUpdate(id, req.body, { new: true });

      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({ message: "Failed to update task" });
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await Task.findByIdAndDelete(id);
      
      /* TODO: When deleting a task, it won't update the list */
      await List.updateMany(
        {
          tasks: {
            $in: id,
          },
        },
        { $pull: { tasks: id } }
      );

      return res.status(200).json({ message: "Task deleted" });
    } catch (error) {
      return res.status(400).json({ message: "Failed to delete task" });
    }
  };
}
