import type { Request, Response } from "express";
import { HttpError } from "../../utils/HttpError";
import { leadService } from "./lead.service";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function createLead(req: Request, res: Response) {
  const { name, email, source } = req.body as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) {
    throw new HttpError(400, 'Missing required field: "name"');
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    throw new HttpError(400, 'Missing or invalid field: "email"');
  }

  await leadService.createLead({
    name: name.trim().slice(0, 200),
    email: email.trim().slice(0, 200),
    source: typeof source === "string" && source.trim() ? source.trim().slice(0, 200) : undefined,
  });

  res.status(201).json({ ok: true });
}

export const leadController = { createLead };
