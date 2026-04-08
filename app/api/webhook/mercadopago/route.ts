import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createClient } from "@supabase/supabase-js";

const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function getPlanDurationDays(planKey: string) {
  switch (planKey) {
    case "mensal":
      return 30;
    case "trimestral":
      return 90;
    case "anual":
      return 365;
    default:
      return 30;
  }
}

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic") || url.searchParams.get("type");

    const body = await req.json().catch(() => null);

    let paymentId: string | null = null;

    if (topic === "payment") {
      paymentId = url.searchParams.get("id");
    }

    if (!paymentId && body?.data?.id) {
      paymentId = String(body.data.id);
    }

    if (!paymentId) {
      return NextResponse.json({ ok: true });
    }

    const paymentApi = new Payment(mpClient);
    const payment = await paymentApi.get({ id: paymentId });

    const paymentStatus = payment.status;
    const externalReference = payment.external_reference;

    if (!externalReference) {
      return NextResponse.json({ ok: true });
    }

    const { data: order, error: orderError } = await supabase
      .from("payment_orders")
      .select("*")
      .eq("external_reference", externalReference)
      .single();

    if (orderError || !order) {
      console.error("Pedido não encontrado:", orderError);
      return NextResponse.json({ ok: true });
    }

    if (paymentStatus === "approved") {
      const now = new Date();
      const expiresAt = addDays(now, getPlanDurationDays(order.plan_key));

      await supabase
        .from("payment_orders")
        .update({
          status: "approved",
          mp_payment_id: String(payment.id),
          paid_at: now.toISOString(),
          updated_at: now.toISOString(),
        })
        .eq("id", order.id);

      await supabase
        .from("subscriptions")
        .upsert({
          user_id: order.user_id,
          status: "active",
          plan_key: order.plan_key,
          started_at: now.toISOString(),
          expires_at: expiresAt.toISOString(),
          updated_at: now.toISOString(),
        }, { onConflict: "user_id" });
    }

    if (paymentStatus === "rejected" || paymentStatus === "cancelled") {
      await supabase
        .from("payment_orders")
        .update({
          status: paymentStatus,
          mp_payment_id: String(payment.id),
          updated_at: new Date().toISOString(),
        })
        .eq("id", order.id);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro no webhook Mercado Pago:", error);
    return NextResponse.json({ ok: true });
  }
}