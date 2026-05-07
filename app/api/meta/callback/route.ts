import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function safePage(page: any) {
  return {
    id: page.id,
    name: page.name,
    hasAccessToken: !!page.access_token,
    instagram_business_account: page.instagram_business_account ?? null,
    connected_instagram_account: page.connected_instagram_account ?? null,
  }
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code")

  if (!code) {
    return NextResponse.json({ error: "Código Meta não recebido" }, { status: 400 })
  }

  const appId = process.env.META_APP_ID
  const appSecret = process.env.META_APP_SECRET
  const redirectUri = process.env.META_REDIRECT_URI

  if (!appId || !appSecret || !redirectUri) {
    return NextResponse.json(
      {
        error: "Variáveis Meta não configuradas",
        hasAppId: !!appId,
        hasAppSecret: !!appSecret,
        hasRedirectUri: !!redirectUri,
      },
      { status: 500 }
    )
  }

  const shortTokenRes = await fetch(
    `https://graph.facebook.com/v20.0/oauth/access_token?client_id=${appId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&client_secret=${appSecret}&code=${code}`
  )

  const shortTokenData = await shortTokenRes.json()

  if (!shortTokenData.access_token) {
    return NextResponse.json(
      { error: "Erro ao gerar token curto", details: shortTokenData },
      { status: 400 }
    )
  }

  const longTokenRes = await fetch(
    `https://graph.facebook.com/v20.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortTokenData.access_token}`
  )

  const longTokenData = await longTokenRes.json()
  const userToken = longTokenData.access_token

  if (!userToken) {
    return NextResponse.json(
      { error: "Erro ao gerar token longo", details: longTokenData },
      { status: 400 }
    )
  }

  const pagesRes = await fetch(
    `https://graph.facebook.com/v20.0/me/accounts?fields=id,name,access_token&access_token=${userToken}`
  )

  const pagesData = await pagesRes.json()

  if (pagesData.error) {
    return NextResponse.json(
      { error: "Erro ao buscar páginas autorizadas", details: pagesData },
      { status: 400 }
    )
  }

  const pages = pagesData.data ?? []

  if (pages.length === 0) {
    return NextResponse.json(
      {
        error: "Nenhuma página foi autorizada pela Meta.",
        dica: "Na tela de conexão, clique em Editar configurações e marque a página correta.",
      },
      { status: 400 }
    )
  }

  const checkedPages: any[] = []

  for (const page of pages) {
    if (!page.access_token) continue

    const pageDetailsRes = await fetch(
      `https://graph.facebook.com/v20.0/${page.id}?fields=id,name,instagram_business_account{id,username},connected_instagram_account{id,username}&access_token=${page.access_token}`
    )

    const pageDetails = await pageDetailsRes.json()
    checkedPages.push(safePage(pageDetails))

    const instagram =
      pageDetails.instagram_business_account ||
      pageDetails.connected_instagram_account

    if (instagram?.id) {
      const { error: supabaseError } = await supabase
        .from("instagram_accounts")
        .upsert(
          {
            page_id: pageDetails.id,
            page_name: pageDetails.name,
            instagram_id: instagram.id,
            instagram_username: instagram.username ?? null,
            page_access_token: page.access_token,
          },
          { onConflict: "page_id" }
        )

      if (supabaseError) {
        return NextResponse.json(
          {
            error: "Erro ao salvar no Supabase.",
            details: supabaseError.message,
          },
          { status: 500 }
        )
      }

      return NextResponse.redirect(
        "https://dmflow-pro.vercel.app/dashboard/integrations?connected=instagram"
      )
    }
  }

  return NextResponse.json(
    {
      error: "Páginas encontradas, mas nenhuma retornou Instagram conectado.",
      dica: "A página precisa estar vinculada a uma conta Instagram profissional.",
      checkedPages,
    },
    { status: 400 }
  )
}