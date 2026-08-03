/**
 * Upload all images from public/ to Supabase Storage bucket "rabin".
 *
 * Usage:
 *   1. Get your service_role key from Supabase Dashboard → Settings → API
 *   2. Run:
 *      node scripts/upload-to-supabase.mjs
 *
 * The script reads NEXT_PUBLIC_SUPABASE_URL and the service-role key from
 * .env.local (NEXT_PRIVATE_SUPBASE_SECRET_KEY), or from the environment:
 *      SUPABASE_SERVICE_ROLE_KEY=eyJ... node scripts/upload-to-supabase.mjs
 *
 * The script walks public/ and uploads each file to the "rabin" bucket
 * preserving the folder structure.
 *
 * Example:
 *   public/chat.png
 *   → rabin/chat.png
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { readdir, stat } from "fs/promises";
import { join, relative, extname, resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ── Minimal .env.local loader (fallback when vars aren't exported) ──
function loadEnvFile(file) {
  const env = {};
  try {
    for (const line of readFileSync(file, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    /* .env.local missing — rely on process.env */
  }
  return env;
}

const env = {
  ...process.env,
  ...loadEnvFile(resolve(process.cwd(), ".env.local")),
};

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL;
const SERVICE_ROLE_KEY =
  env.SUPABASE_SERVICE_ROLE_KEY ||
  env.NEXT_PRIVATE_SUPBASE_SECRET_KEY ||
  env.SUPABASE_SECRET_KEY;

if (!SUPABASE_URL) {
  console.error("❌ NEXT_PUBLIC_SUPABASE_URL is not set");
  process.exit(1);
}
if (!SERVICE_ROLE_KEY) {
  console.error("❌ SUPABASE_SERVICE_ROLE_KEY is not set");
  console.error(
    "   Get it from Supabase Dashboard → Settings → API → service_role key"
  );
  process.exit(1);
}

const BUCKET = "rabin";
const LOCAL_DIR = join(__dirname, "..", "public");

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const MIME_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf", // MyCV.pdf
};

// ── Walk directory recursively ──────────────────────────────────

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

// ── Upload ──────────────────────────────────────────────────────

async function upload() {
  if (!existsSync(LOCAL_DIR)) {
    console.error(`❌ Directory not found: ${LOCAL_DIR}`);
    process.exit(1);
  }

  console.log(`📁 Scanning ${LOCAL_DIR}...\n`);
  const files = await walk(LOCAL_DIR);

  const imageFiles = files.filter((f) => {
    const ext = extname(f).toLowerCase();
    return Object.keys(MIME_TYPES).includes(ext);
  });

  console.log(`Found ${imageFiles.length} images to upload\n`);

  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of imageFiles) {
    // Convert local path to storage path
    // e.g. public/chat.png → chat.png
    const storagePath = relative(LOCAL_DIR, file);
    const ext = extname(file).toLowerCase();
    const contentType = MIME_TYPES[ext];
    const fileBuffer = readFileSync(file);

    const { error } = await supabase.storage.from(BUCKET).upload(storagePath, fileBuffer, {
      contentType,
      cacheControl: "3600",
      upsert: true,
    });

    if (error) {
      // If it already exists, that's fine
      if (error.message.includes("already exists")) {
        console.log(`  ⏩ Skipping (exists): ${storagePath}`);
        skipped++;
      } else if (error.message.includes("signature")) {
        console.error(
          `  ❌ Invalid service_role key! Get a fresh one from Supabase Dashboard → Settings → API`
        );
        failed++;
        process.exit(1);
      } else {
        console.error(`  ❌ Failed: ${storagePath} — ${error.message}`);
        failed++;
      }
    } else {
      console.log(`  ✅ Uploaded: ${storagePath}`);
      success++;
    }
  }

  console.log(`\n── Done ──`);
  console.log(`  ✅ ${success} uploaded`);
  console.log(`  ⏩ ${skipped} skipped`);
  console.log(`  ❌ ${failed} failed`);
}

upload().catch((err) => {
  console.error(err);
  process.exit(1);
});
