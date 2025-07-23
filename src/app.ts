import { errorHandling } from "./middlewares/error-handling";
import uploadsConfig from "@/configs/upload";
import { routes } from "./routes";
import "express-async-errors";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(uploadsConfig.UPLOADS_FOLDER));

app.use(routes);
app.use(errorHandling);

export { app };
