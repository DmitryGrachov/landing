import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { leadController } from "./lead.controller";

export const leadRouter = Router();

// POST /api/leads { name, email, source? } -> notifies the Telegram bot
leadRouter.post("/", asyncHandler(leadController.createLead));
