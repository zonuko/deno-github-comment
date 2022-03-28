import { getCookies } from "https://deno.land/std@0.107.0/http/cookie.ts";
import { buildPagenation, tokenDecrypt } from "../../../logics/github.ts";
import { buildRequestPage } from "../../../logics/pagenation.ts";
import { HandlerContext } from "../../../server_deps.ts";

export async function handler(
  req: Request,
  _: HandlerContext,
): Promise<Response> {
  const cookieValue = getCookies(req.headers)["oauth_token"];
  const reqPage = buildRequestPage(req);
  const res = await fetch(
    `https://api.github.com/user/repos?page=${reqPage.page}&per_page=${reqPage.perPage}`,
    {
      headers: {
        Authorization: `token ${await tokenDecrypt(cookieValue)}`,
      },
    },
  );
  const resJson = await res.json();
  const pagenation = buildPagenation(res);
  return new Response(JSON.stringify({
    link: pagenation,
    repos: resJson,
  }));
}
