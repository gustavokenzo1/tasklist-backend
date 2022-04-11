import ListController from "../controllers/ListController";
import { Request, Response } from "express";

const { Router } = require("express");

const listRoutes = Router();
const listController = new ListController();

listRoutes.post("/", (req: Request, res: Response) => {
  listController.createList(req, res);
});

listRoutes.put("/:id", (req: Request, res: Response) => {
  listController.updateList(req, res);
});

listRoutes.delete("/:id", (req: Request, res: Response) => {
  listController.deleteListAndItsTasks(req, res);
});

listRoutes.get("/", (req: Request, res: Response) => {
  listController.getUserLists(req, res);
});

export default listRoutes;
