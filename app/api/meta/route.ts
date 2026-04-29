import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || "dmflow_token";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
  return new NextResponse(challenge, {
    status: 200,
  });
}

  return new NextResponse("Webhook Meta ativo", {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Webhook recebido:", JSON.stringify(body, null, 2));

    return NextResponse.json(
      { received: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro webhook:", error);

    return NextResponse.json(
      { error: "Erro no webhook" },
      { status: 500 }
    );
  }
}