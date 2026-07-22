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

async function notifyEmail(input: CreateLeadInput): Promise<void> {
  const subject = input.source ? `Новая заявка: ${input.source}` : "Новая заявка с сайта";
  const html = [
    "<h2>Новая заявка с сайта</h2>",
    `<p><b>Имя:</b> ${escapeHtml(input.name)}</p>`,
    `<p><b>Email:</b> ${escapeHtml(input.email)}</p>`,
    input.source ? `<p><b>Источник:</b> ${escapeHtml(input.source)}</p>` : "",
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.resendFromEmail,
      to: [env.leadNotifyEmail],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new HttpError(502, `Resend API error (${res.status}): ${body}`);
  }
}

async function createLead(input: CreateLeadInput): Promise<void> {
  const results = await Promise.allSettled([notifyTelegram(input), notifyEmail(input)]);
  const failures = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");

  // Only fail the request if every notification channel failed — one
  // channel being down (e.g. Resend rate limit) shouldn't drop a lead
  // that Telegram already delivered.
  if (failures.length === results.length) {
    const reason = failures[0]?.reason;
    throw reason instanceof HttpError ? reason : new HttpError(502, "Failed to notify about the new lead");
  }

  for (const failure of failures) {
    console.error("Lead notification channel failed:", failure.reason);
  }
}

export const leadService = { createLead };
