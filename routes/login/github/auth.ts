import { buildGithubUrl, tokenEncrypt } from "../../../logics/github.ts";

export async function handler(): Promise<Response> {
  try {
    const oauthUrl = buildGithubUrl();
    const githubRedirect = new Response(null, {
      status: 302,
      headers: {
        location: oauthUrl,
        "set-cookie": `state=${await tokenEncrypt(
          new URL(oauthUrl).searchParams.get("state") || "",
        )};HttpOnly;SameSite=Lax;Path=/;`,
      },
    });

    return githubRedirect;
  } catch (e) {
    console.error(e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
