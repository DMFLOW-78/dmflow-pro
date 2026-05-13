import { NextResponse } from "next/server";

export async function POST() {
  try {
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Token Mercado Pago não configurado" },
        { status: 500 }
      );
    }

    const body = {
      items: [
        {
          title: "67Flow PRO",
          quantity: 1,
          currency_id: "BRL",
          unit_price: 47,
        },
      ],

      back_urls: {
        success: "https://dmflow-pro.vercel.app/dashboard",
        failure: "https://dmflow-pro.vercel.app/dashboard",
        pending: "https://dmflow-pro.vercel.app/dashboard",
      },

      auto_return: "approved",
    };

    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return NextResponse.json({
      init_point: data.init_point,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao criar checkout" },
      { status: 500 }
    );
  }
}