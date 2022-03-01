import { deleteCookie } from "https://deno.land/std@0.107.0/http/cookie.ts";
import { cookie } from "../../../deps.ts";
import {
  githubClientId,
  githubClientSecret,
  tokenDecrypt,
  tokenEncrypt,
} from "../../../logics/github.ts";
import { HandlerContext } from "../../../server_deps.ts";

export async function handler({req}: HandlerContext): Promise<Response> {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (!code) {
      return Response.redirect(`${url.origin}/?error=missing_code`);
    }

    const cookieState = await tokenDecrypt(cookie.getCookies(req.headers)["state"]);
    if (cookieState !== state) {
      return Response.redirect(`${url.origin}/?error=invalid_state`);
    }

    const apiRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: githubClientId(),
        client_secret: githubClientSecret(),
        code: code,
      }),
    });

    if (apiRes.status !== 200) {
      return Response.redirect(`${url.origin}/?error=failed_to_get_token`);
    }

    const resJson = await apiRes.json();
    if (resJson["error"]) {
      return Response.redirect(`${url.origin}/?error=failed_to_get_token`);
    }

    const successRes = new Response(null, {
      status: 302,
      headers: {
        location: `${url.origin}/mypage/github`,
        "set-cookie": `oauth_token=${await tokenEncrypt(
          resJson["access_token"],
        )};HttpOnly;SameSite=Lax;Path=/;`,
      },
    });
    deleteCookie(successRes.headers, "state", {path: "/"});

    return successRes;
}
