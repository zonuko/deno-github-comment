import { config } from "../deps.ts";

const GITHUB_OAUTH_URL = "https://github.com/login/oauth/authorize";

export interface Pagenation {
  next?: number;
  prev?: number;
  last?: number;
  hasNext: boolean;
  hasPrev: boolean;
}
export function githubClientId(): string {
  return config()["GITHUB_CLIENT_ID"] || "";
}

function generateState(): string {
  return crypto.randomUUID();
}

export function githubClientSecret(): string {
  return config()["GITHUB_CLIENT_SECRET"] || "";
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

export function buildPagenation(linkHeader: string): Pagenation {
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

function getPageQuery(url?: string): number | null {
  if (!url) return null;

  const u = new URL(url).searchParams.get("page");
  if (!u) return null;

  return parseInt(u);
}

function iv(): Uint8Array {
  // TODO: getRandomValuesは正直微妙だけどちゃんと一意にするにはDB関連がないと厳しい
  return crypto.getRandomValues(new Uint8Array(12));
}

async function loadSecret() {
  const text = JSON.parse(await Deno.readTextFile("secret.json"));
  return await crypto.subtle.importKey(
    "jwk",
    text,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"],
  );
}
