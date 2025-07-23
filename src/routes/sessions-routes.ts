import { Router } from "express";
import { SessionsController } from "@/controllers/sessions-controller";

const sessionsRoutes = Router();
const sessionController = new SessionsController();

sessionsRoutes.post("/", sessionController.create);

export { sessionsRoutes };
