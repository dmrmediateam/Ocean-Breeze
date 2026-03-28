import { NextResponse } from "next/server";

export type LeadType = "request_details" | "schedule_showing";

function getWebhookUrl(leadType: LeadType) {
  if (leadType === "schedule_showing") {
    return (
      process.env.ZAPIER_SCHEDULE_SHOWING_WEBHOOK_URL ??
      process.env.ZAPIER_REQUEST_DETAILS_WEBHOOK_URL ??
      null
    );
  }

  return process.env.ZAPIER_REQUEST_DETAILS_WEBHOOK_URL ?? null;
}

function getConfigError(leadType: LeadType) {
  if (leadType === "schedule_showing") {
    return "Zapier webhook is not configured. Set ZAPIER_SCHEDULE_SHOWING_WEBHOOK_URL or reuse ZAPIER_REQUEST_DETAILS_WEBHOOK_URL.";
  }

  return "Zapier webhook is not configured. Set ZAPIER_REQUEST_DETAILS_WEBHOOK_URL.";
}

export async function forwardLeadSubmission(
  request: Request,
  leadType: LeadType,
) {
  const webhookUrl = getWebhookUrl(leadType);

  if (!webhookUrl) {
    return NextResponse.json({ error: getConfigError(leadType) }, { status: 500 });
  }

  let payload: Record<string, FormDataEntryValue | null>;

  try {
    payload = (await request.json()) as Record<string, FormDataEntryValue | null>;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const fullName = String(payload.fullName ?? "").trim();
  const email = String(payload.email ?? "").trim();

  if (!fullName || !email) {
    return NextResponse.json(
      { error: "Full name and email are required." },
      { status: 400 },
    );
  }

  const forwardedPayload = {
    ...payload,
    leadType,
    submittedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") ?? "",
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(forwardedPayload),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Zapier rejected the submission." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
