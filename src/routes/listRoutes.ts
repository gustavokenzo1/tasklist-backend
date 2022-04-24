import ListController from "../controllers/ListController";
import { Request, Response } from "express";
import ensureAuthenticated from "../middleware/auth";

const listRoutes = require("express").Router();

const listController = new ListController();

listRoutes.post("/", ensureAuthenticated, (req: Request, res: Response) => {
  listController.createList(req, res);
});

listRoutes.patch("/:id", ensureAuthenticated, (req: Request, res: Response) => {
  listController.updateList(req, res);
});

listRoutes.patch("/", ensureAuthenticated, (req: Request, res: Response) => {
  return res.send({ error: "Missing list id" });
});

listRoutes.delete(
  "/:id",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    listController.deleteList(req, res);
  }
);

listRoutes.get("/all", ensureAuthenticated, (req: Request, res: Response) => {
  listController.getAllUserLists(req, res);
});

listRoutes.get("/:id", ensureAuthenticated, (req: Request, res: Response) => {
  listController.getOneList(req, res);
});

export default listRoutes;
