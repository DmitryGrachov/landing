import cors from "cors";
import express from "express";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/notFound";
import { leadRouter } from "./modules/lead/lead.routes";

export const app = express();

app.use(cors({ origin: env.corsOrigins }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/leads", leadRouter);

app.use(notFoundHandler);
app.use(errorHandler);
