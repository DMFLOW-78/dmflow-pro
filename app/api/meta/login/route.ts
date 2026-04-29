import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Código Meta não recebido" },
      { status: 400 }
    );
  }

  const appId = process.env.META_APP_ID!;
  const appSecret = process.env.META_APP_SECRET!;
  const redirectUri = process.env.META_REDIRECT_URI!;

  try {
    // TOKEN CURTO
    const shortTokenRes = await fetch(
      `https://graph.facebook.com/v20.0/oauth/access_token?client_id=${appId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&client_secret=${appSecret}&code=${code}`
    );

    const shortTokenData = await shortTokenRes.json();

    if (!shortTokenData.access_token) {
      return NextResponse.json(shortTokenData, { status: 400 });
    }

    // TOKEN LONGO
    const longTokenRes = await fetch(
      `https://graph.facebook.com/v20.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortTokenData.access_token}`
    );

    const longTokenData = await longTokenRes.json();

    const userToken = longTokenData.access_token;

    // PÁGINAS
    const pagesRes = await fetch(
      `https://graph.facebook.com/v20.0/me/accounts?fields=id,name,access_token,instagram_business_account&access_token=${userToken}`
    );

    const pagesData = await pagesRes.json();

    if (!pagesData.data || pagesData.data.length === 0) {
      return NextResponse.json(
        {
          error: "Nenhuma página encontrada.",
          pagesData,
        },
        { status: 400 }
      );
    }

    // PRIMEIRA PÁGINA COM INSTAGRAM
    const page = pagesData.data.find(
      (p: any) => p.instagram_business_account
    );

    if (!page) {
      return NextResponse.json(
        {
          error: "Nenhuma página com Instagram conectado foi encontrada.",
          pagesData,
        },
        { status: 400 }
      );
    }

    const instagramId = page.instagram_business_account.id;

    // DADOS INSTAGRAM
    const igRes = await fetch(
      `https://graph.facebook.com/v20.0/${instagramId}?fields=username&access_token=${page.access_token}`
    );

    const igData = await igRes.json();

    // SALVAR
    await supabase.from("instagram_accounts").insert({
      page_id: page.id,
      page_name: page.name,
      instagram_id: instagramId,
      instagram_username: igData.username,
      page_access_token: page.access_token,
    });

    // REDIRECIONAR
    return NextResponse.redirect(
      "https://dmflow-pro.vercel.app/dashboard/integrations?connected=instagram"
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Erro no callback Meta",
        details: error.message,
      },
      { status: 500 }
    );
  }
}