import { Request, Response } from "express";
import List from "../models/List";
import Task from "../models/Task";

export default class ListController {
  createList = async (req: Request, res: Response) => {
    const { user } = req.headers;
    const { description } = req.body;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!description) {
      return res.status(400).json({ message: "Missing description" });
    }

    try {
      const list = await List.create({
        user,
        description,
      });

      return res.status(200).json(list);
    } catch (error) {
      return res.status(400).json({ message: "Failed to create list" });
    }
  };

  getUserLists = async (req: Request, res: Response) => {
    const { user } = req.headers;

    if (!user) {
      return res.status(400).json({ message: "Missing User" });
    }

    try {
      const lists = await List.find({ user });

      if (!lists) {
        return res
          .status(404)
          .json({ message: "There are no lists registered to this user" });
      }

      return res.status(200).json(lists);
    } catch (error) {
      return res.status(400).json({ message: "Failed to get user's lists" });
    }
  };

  deleteListAndItsTasks = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "List id is required" });
    }

    try {
      const list = await List.findByIdAndDelete(id);
      await Task.deleteMany({ list: id });

      if (!list) {
        return res.status(404).json({ message: "This list doesn't exist" });
      }

      return res
        .status(200)
        .json({ message: "List deleted, as well as all it's tasks" });
    } catch (error) {
      return res.status(400).json({ message: "Failed to delete list" });
    }
  };

  updateList = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { description, tasks } = req.body;

    if (!id || !req.body) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    try {
      const list = await List.findByIdAndUpdate(
        id,
        { description, tasks },
        { new: true }
      );

      if (!list) {
        return res.status(404).json({ message: "This list doesn't exist" });
      }

      return res.status(200).json(list);
    } catch (error) {
      return res.status(400).json({ message: "Failed to update list", error });
    }
  };
}
