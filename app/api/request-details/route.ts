import { NextResponse } from "next/server";

const webhookUrl = process.env.ZAPIER_REQUEST_DETAILS_WEBHOOK_URL;

export async function POST(request: Request) {
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Zapier webhook is not configured." },
      { status: 500 },
    );
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
    leadType: "request_details",
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
