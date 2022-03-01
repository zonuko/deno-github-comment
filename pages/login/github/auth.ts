import { buildGithubUrl, tokenEncrypt } from "../../../logics/github.ts";
import { HandlerContext } from "../../../server_deps.ts";

export async function handler(_ctx: HandlerContext): Promise<Response> {
  const oauthUrl = buildGithubUrl();
  const githubRedirect = new Response(null, {
    status: 302,
    headers: {
      location: oauthUrl,
      "set-cookie": `state=${await tokenEncrypt(
        new URL(oauthUrl).searchParams.get("state") || ""
      )};HttpOnly;SameSite=Lax;Path=/;`,
    },
  });

  return githubRedirect;
}
