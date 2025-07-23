import { UploadsController } from "@/controllers/uploads-controllers";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import uploadConfig from "@/configs/upload";
import { Router } from "express";
import multer from "multer";

const uploadsRoutes = Router();
const uploadsController = new UploadsController();

const upload = multer(uploadConfig.MULTER);

uploadsRoutes.use(verifyUserAuthorization(["employee"]));
uploadsRoutes.post("/", upload.single("file"), uploadsController.create);

export { uploadsRoutes };
