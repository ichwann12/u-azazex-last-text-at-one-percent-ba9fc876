// Last Text at One Percent — writes the entry text to the output directory.
// Node 22, stdlib only. No network, no wall clock, no environment secrets.
// Reads the entry line from entry.txt next to this file and writes it to
// <output dir>/entry.txt, where the output dir comes from
// MAKEFUN_OUTPUT_DIR, then MAKEFUN_BOT_DIR, then a local "output" folder.
// The written file holds exactly the entry text with no trailing newline,
// so the gate counts the same characters as the source file's line.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8").trim();

if (text.length < 1 || text.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${text.length}`);
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ??
  process.env.MAKEFUN_BOT_DIR ??
  join(here, "output");

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
