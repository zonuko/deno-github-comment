import { getCookies } from "https://deno.land/std@0.107.0/http/cookie.ts";
import { tokenDecrypt } from "../../../../logics/github.ts";
import { HandlerContext } from "../../../../server_deps.ts";

export async function handler(
  req: Request,
  ctx: HandlerContext,
): Promise<Response> {
  const name = decodeURIComponent(ctx.params["repo_name"]);
  const cookieValue = getCookies(req.headers)["oauth_token"];
  const res = await fetch(`https://api.github.com/repos/${name}/pulls`, {
    headers: {
      Authorization: `token ${await tokenDecrypt(cookieValue)}`,
    },
  });
  const resJson = await res.json();
  return new Response(JSON.stringify({ pulls: resJson }));
}
