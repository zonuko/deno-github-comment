import { getCookies } from "https://deno.land/std@0.107.0/http/cookie.ts";
import { config } from "../client_deps.ts";
import { HandlerContext } from "../server_deps.ts";
import { buildRequestPage } from "./pagenation.ts";

const GITHUB_OAUTH_URL = "https://github.com/login/oauth/authorize";

export interface Pagenation {
  next?: number;
  prev?: number;
  last?: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export function githubClientId(): string {
  return getEnv("GITHUB_CLIENT_ID") || "";
}

export function githubClientSecret(): string {
  return getEnv("GITHUB_CLIENT_SECRET") || "";
}

export function buildGithubUrl(): string {
  const ret = new URL(GITHUB_OAUTH_URL);
  ret.searchParams.set("client_id", githubClientId());
  ret.searchParams.set("state", generateState());
  ret.searchParams.set("scope", "repo");

  return ret.toString();
}

export async function tokenEncrypt(val: string): Promise<string> {
  const ivBytes = iv();
  const c = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: ivBytes },
    await loadSecret(),
    new TextEncoder().encode(val),
  );

  return `${btoa(String.fromCharCode(...new Uint8Array(ivBytes)))}--${
    btoa(String.fromCharCode(...new Uint8Array(c)))
  }`;
}

export async function tokenDecrypt(val: string): Promise<string> {
  const [ivVal, token] = val.split("--");
  const encryptedBytes = atob(token);
  const ivBytes = atob(ivVal);

  const encryptedData = Uint8Array.from(
    encryptedBytes.split(""),
    (char) => char.charCodeAt(0),
  );

  const ivData = Uint8Array.from(
    ivBytes.split(""),
    (char) => char.charCodeAt(0),
  );

  const decryptedArrayBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivData },
    await loadSecret(),
    encryptedData,
  );
  return new TextDecoder().decode(new Uint8Array(decryptedArrayBuffer));
}

export function buildPagenation(res: Response): Pagenation {
  const linkHeader = res.headers.get("link") || "";
  let ret: Pagenation = {
    hasNext: false,
    hasPrev: false,
  };
  const next = getPageQuery(/\<([^<>]+)\>; rel\="next"/.exec(linkHeader)?.[1]);
  const prev = getPageQuery(/\<([^<>]+)\>; rel\="prev"/.exec(linkHeader)?.[1]);
  const last = getPageQuery(/\<([^<>]+)\>; rel\="last"/.exec(linkHeader)?.[1]);
  if (next) {
    ret.next = next;
    ret.hasNext = true;
  }

  if (prev) {
    ret.prev = prev;
    ret.hasPrev = true;
  }

  if (last) {
    ret.last = last;
  }

  return ret;
}

export async function getIssueComments(
  req: Request,
  ctx: HandlerContext,
): Promise<Response> {
  const name = decodeURIComponent(ctx.params["repo_name"]);
  const cookieValue = getCookies(req.headers)["oauth_token"];
  // ???????????????????????????100???????????????????????????????????????????????????????????????
  const reqPage = buildRequestPage(req, "100");

  const res = await fetch(
    `https://api.github.com/repos/${name}/issues/comments?page=${reqPage.page}&per_page=${reqPage.perPage}&sort=created&direction=desc`,
    {
      headers: {
        Authorization: `token ${await tokenDecrypt(cookieValue)}`,
      },
    },
  );
  return res;
}

export async function getReviewComments(
  req: Request,
  ctx: HandlerContext,
): Promise<Response> {
  const name = decodeURIComponent(ctx.params["repo_name"]);
  const cookieValue = getCookies(req.headers)["oauth_token"];
  // ???????????????????????????100???????????????????????????????????????????????????????????????
  const reqPage = buildRequestPage(req, "100");

  const res = await fetch(
    `https://api.github.com/repos/${name}/pulls/comments?page=${reqPage.page}&per_page=${reqPage.perPage}&sort=created&direction=desc`,
    {
      headers: {
        Authorization: `token ${await tokenDecrypt(cookieValue)}`,
      },
    },
  );
  return res;
}

function getPageQuery(url?: string): number | null {
  if (!url) return null;

  const u = new URL(url).searchParams.get("page");
  if (!u) return null;

  return parseInt(u);
}

function iv(): Uint8Array {
  // TODO: getRandomValues?????????????????????????????????????????????????????????DB???????????????????????????
  return crypto.getRandomValues(new Uint8Array(12));
}

function denoEnv(): string {
  const e = Deno.env.get("DENO_ENV");
  if (!e) {
    return "development";
  }
  return e;
}

async function loadSecret() {
  let key = null;
  try {
    key = await Deno.readTextFile("secret.json");
  } catch (e) {
    console.error(e);
    console.log("try read key from env.");
    key = getEnv("CRYPTO_SECRET") || "";
  }

  const text = JSON.parse(key);
  return await crypto.subtle.importKey(
    "jwk",
    text,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"],
  );
}

function generateState(): string {
  return crypto.randomUUID();
}

function getEnv(key: string) {
  if (denoEnv() === "deploy") {
    return Deno.env.get(key);
  }
  return config()[key];
}
