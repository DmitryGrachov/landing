import type { Request, Response } from "express";
import { HttpError } from "../../utils/HttpError";
import { leadService } from "./lead.service";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RU_PHONE_RE = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

async function createLead(req: Request, res: Response) {
  const { name, email, phone, source } = req.body as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) {
    throw new HttpError(400, 'Missing required field: "name"');
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    throw new HttpError(400, 'Missing or invalid field: "email"');
  }
  if (typeof phone !== "string" || !RU_PHONE_RE.test(phone.trim())) {
    throw new HttpError(400, 'Missing or invalid field: "phone"');
  }

  await leadService.createLead({
    name: name.trim().slice(0, 200),
    email: email.trim().slice(0, 200),
    phone: phone.trim(),
    source: typeof source === "string" && source.trim() ? source.trim().slice(0, 200) : undefined,
  });

  res.status(201).json({ ok: true });
}

export const leadController = { createLead };
