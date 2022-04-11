import { Request, Response } from "express";
import List from "../models/List";
import Task from "../models/Task";

export default class ListController {
  createList = async (req: Request, res: Response) => {
    const { user } = req.headers;
    const { description } = req.body;

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

    try {
      const lists = await List.find({ user });

      return res.status(200).json(lists);
    } catch (error) {
      return res.status(400).json({ message: "Failed to get user's lists" });
    }
  };

  deleteListAndItsTasks = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await List.findByIdAndDelete(id);
      await Task.deleteMany({ list: id });

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

    try {
      const list = await List.findByIdAndUpdate(
        id,
        { description, tasks },
        { new: true }
      );

      return res.status(200).json(list);
    } catch (error) {
      return res.status(400).json({ message: "Failed to update list", error });
    }
  };
}
