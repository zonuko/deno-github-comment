async function genKey() {
  return await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  );
}

async function exportKey() {
  const key = await crypto.subtle.exportKey(
    "jwk",
    await genKey(),
  );
  await Deno.writeTextFile("./secret.json", JSON.stringify(key));
  console.log("generate secret.json. add to .gitignore");
}

await exportKey();
