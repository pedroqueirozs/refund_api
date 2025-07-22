import { Router } from "express";

import { userRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { refundsRoutes } from "./refunds-routes";
import { ensureAuthenticated } from "@/middlewares/esure-authenticated";

const routes = Router();

//Rotas públicas
routes.use("/users", userRoutes);
routes.use("/sessions", sessionsRoutes);

//Rotas privadas
routes.use(ensureAuthenticated);
routes.use("/refunds", refundsRoutes);

export { routes };
