import { getCookies } from "https://deno.land/std@0.107.0/http/cookie.ts";
import { buildPagenation, tokenDecrypt } from "../../../logics/github.ts";
import { HandlerContext } from "../../../server_deps.ts";

export async function handler(
  req: Request,
  ctx: HandlerContext,
): Promise<Response> {
  const cookieValue = getCookies(req.headers)["oauth_token"];
  const url = new URL(req.url);
  const page = url.searchParams.get("page") || "1";
  const perPage = url.searchParams.get("per_page") || "30";
  const res = await fetch(
    `https://api.github.com/user/repos?page=${page}&per_page=${perPage}`,
    {
      headers: {
        Authorization: `token ${await tokenDecrypt(cookieValue)}`,
      },
    },
  );
  const resJson = await res.json();
  const link = res.headers.get("link") || "";
  const pagenation = buildPagenation(link);
  return new Response(JSON.stringify({
    link: pagenation,
    repos: resJson,
  }));
}
