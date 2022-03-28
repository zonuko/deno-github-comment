import { getCookies } from "https://deno.land/std@0.107.0/http/cookie.ts";
import { buildPagenation, tokenDecrypt } from "../../../../../logics/github.ts";
import { buildRequestPage } from "../../../../../logics/pagenation.ts";
import { HandlerContext } from "../../../../../server_deps.ts";

export async function handler(
  req: Request,
  ctx: HandlerContext,
): Promise<Response> {
  const name = decodeURIComponent(ctx.params["repo_name"]);
  const cookieValue = getCookies(req.headers)["oauth_token"];
  const reqPage = buildRequestPage(req, "100");

  const res = await fetch(
    `https://api.github.com/repos/${name}/pulls/comments?page=${reqPage.page}&per_page=${reqPage.perPage}`,
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
    reviewComments: resJson,
  }));
}
