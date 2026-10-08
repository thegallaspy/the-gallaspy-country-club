import fs from "node:fs";
import { build } from "esbuild";

const env = fs.readFileSync(".env.local", "utf8");

function readEnv(name) {
  const line = env.split(/\r?\n/).find(
    (entry) => entry.trim().startsWith(`${name}=`)
  );

  if (!line) throw new Error(`Missing ${name}`);

  return line
    .slice(line.indexOf("=") + 1)
    .trim()
    .replace(/^["']|["']$/g, "");
}

await build({
  entryPoints: ["native-app/src/auth.js"],
  outfile: "native-app/generated/auth.bundle.js",
  bundle: true,
  platform: "browser",
  format: "iife",
  target: ["safari16"],
  define: {
    "process.env.NEXT_PUBLIC_SUPABASE_URL":
      JSON.stringify(readEnv("NEXT_PUBLIC_SUPABASE_URL")),
    "process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY":
      JSON.stringify(readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")),
  },
});

console.log("Native authentication bundle created.");
