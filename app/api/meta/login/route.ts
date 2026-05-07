import { NextResponse } from "next/server"

export async function GET() {
  const appId = process.env.META_APP_ID
  const redirectUri = process.env.META_REDIRECT_URI

  if (!appId) {
    return NextResponse.json(
      { error: "META_APP_ID não configurado" },
      { status: 500 }
    )
  }

  if (!redirectUri) {
    return NextResponse.json(
      { error: "META_REDIRECT_URI não configurado" },
      { status: 500 }
    )
  }

  const scopes = [
  "pages_show_list",
  "pages_manage_metadata",
  "pages_read_engagement",
  "pages_manage_posts",
  "instagram_basic",
  "instagram_manage_messages",
].join(",")

  const url = new URL("https://www.facebook.com/v20.0/dialog/oauth")

  url.searchParams.set("client_id", appId)
  url.searchParams.set("redirect_uri", redirectUri)
  url.searchParams.set("scope", scopes)
  url.searchParams.set("response_type", "code")
  url.searchParams.set("auth_type", "rerequest")

  return NextResponse.redirect(url.toString())
}