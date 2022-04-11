import listRoutes from "./listRoutes";
import taskRoutes from "./taskRoutes";

const routes = require("express").Router();

routes.use("/list", listRoutes);
routes.use("/task", taskRoutes);

export default routes;
