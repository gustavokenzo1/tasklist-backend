import { Router } from "express";
import listRoutes from "./listRoutes";
import taskRoutes from "./taskRoutes";
import userRoutes from "./userRoutes";

const routes = Router();

routes.use("/list", listRoutes);
routes.use("/task", taskRoutes);
routes.use("/user", userRoutes);

export default routes;
