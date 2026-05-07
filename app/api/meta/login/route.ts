import { NextResponse } from "next/server";

export async function GET() {
  const appId = process.env.META_APP_ID!;
  const redirectUri = process.env.META_REDIRECT_URI!;

  const scopes = [
  "pages_show_list",
  "pages_read_engagement",
  "pages_manage_metadata",
  "instagram_basic",
  "instagram_manage_messages",
  "instagram_manage_comments",
].join(",");

  const url =
    `https://www.facebook.com/v20.0/dialog/oauth` +
    `?client_id=${appId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&response_type=code` +
    `&auth_type=rerequest`;

  return NextResponse.redirect(url);
}