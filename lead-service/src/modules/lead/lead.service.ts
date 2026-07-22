import { env } from "../../config/env";
import { HttpError } from "../../utils/HttpError";
import type { CreateLeadInput } from "./lead.types";

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function notifyTelegram(input: CreateLeadInput): Promise<void> {
  const lines = [
    "<b>Новая заявка с сайта</b>",
    `Имя: ${escapeHtml(input.name)}`,
    `Email: ${escapeHtml(input.email)}`,
  ];
  if (input.source) lines.push(`Источник: ${escapeHtml(input.source)}`);

  const res = await fetch(`https://api.telegram.org/bot${env.telegramBotToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: env.telegramChatId,
      text: lines.join("\n"),
      parse_mode: "HTML",
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new HttpError(502, `Telegram API error (${res.status}): ${body}`);
  }
}

async function createLead(input: CreateLeadInput): Promise<void> {
  await notifyTelegram(input);
}

export const leadService = { createLead };
