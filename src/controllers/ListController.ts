import { Request, Response } from "express";
import List from "../models/List";
import Task from "../models/Task";

export default class ListController {
  createList = async (req: Request, res: Response) => {
    const { description, name } = req.body;

    if (!description || !name) {
      return res.status(400).json({
        error: "Missing Credentials",
      });
    }

    try {
      const list = await List.create({
        description,
        name,
        user: req.user_id,
      });

      return res.status(200).json(list);
    } catch (error) {
      return res.status(400).json({
        error: "Failed to create list",
      });
    }
  };

  updateList = async (req: Request, res: Response) => {
    const { description, name } = req.body;
    const list_id = req.params.id;

    if (!description && !name) {
      return res.status(400).json({
        error: "Missing Credentials",
      });
    }

    try {
      const list = await List.findByIdAndUpdate(
        list_id,
        {
          description,
          name,
        },
        { new: true }
      );

      return res.status(200).json(list);
    } catch (error) {
      return res.status(400).json({
        error: "Failed to update list",
      });
    }
  };

  deleteList = async (req: Request, res: Response) => {
    const list_id = req.params.id;

    try {
      const list = await List.findByIdAndDelete(list_id);
      await Task.deleteMany({ list: list_id });

      return res.status(200).json({ message: "Successfully deleted list" });
    } catch (error) {
      return res.status(400).json({
        error: "Failed to delete list",
      });
    }
  };

  getAllUserLists = async (req: Request, res: Response) => {
    try {
      const lists = await List.find({ user: req.user_id });

      const listWithTasks: any[] = [];

      for (const list of lists) {
        const tasks = await Task.find({ list: list._id });

        listWithTasks.push({
          ...list.toJSON(),
          tasks: tasks.map((task: any) => task.toJSON()),
        });
      }

      return res.status(200).json(listWithTasks);
    } catch (error) {
      return res.status(400).json({
        error: "Failed to get lists",
      });
    }
  };

  getOneList = async (req: Request, res: Response) => {
    const list_id = req.params.id;

    try {
      const list = await List.findById(list_id);
      const tasks = await Task.find({ list: list_id });

      return res.status(200).json({ list, tasks });
    } catch (error) {
      return res.status(400).json({
        error: "Failed to get list",
      });
    }
  };
}
