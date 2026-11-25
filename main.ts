// The Funniest Toaster Error Message — entry program.
// Node 22, standard library only. Deterministic: writes the same bytes on
// every run. The program holds a small bank of ORIGINAL one-line toaster
// error messages written for this competition, scores each on the judge's
// own criteria (real error message first, then freshness, tightness, one
// voice, lands on a single read), and writes only the winner to
// /output/entry.txt (1-120 characters, UTF-8, no trailing newline).
import { mkdirSync, writeFileSync } from "node:fs";

type Candidate = {
  text: string;
  // Scores out of 5, judged against the published brief.
  realError: number; // reads like a real message a toaster would show
  fresh: number; // surprise from somewhere the obvious puns never go
  tight: number; // every word earns its place
  voice: number; // one clear small-appliance voice, held to the end
  lands: number; // understood on a single read
};

const CANDIDATES: Candidate[] = [
  {
    text: "Crumb tray full. I have been quietly eating your crumbs for weeks.",
    realError: 5, // "Crumb tray full" is a genuine toaster error state
    fresh: 5, // the twist is a confession, not a bread pun: the appliance
    // has been secretly eating the crumbs it was meant to catch, so the
    // error report doubles as the toaster admitting the fault is its own
    tight: 5, // 66 characters; nothing to cut
    voice: 5, // deadpan appliance, steady to the end
    lands: 5, // one read: tray full, and the toaster ate the evidence
  },
  {
    text: "ERROR: Your bread has achieved sentience and refuses to be toasted.",
    realError: 4, // error-code framing, but the fault is fantastical
    fresh: 3, // sentient-appliance is a well-worn joke shape
    tight: 4,
    voice: 4,
    lands: 4,
  },
  {
    text: "I toasted your bread. Then I toasted it again, just to be sure. Sorry.",
    realError: 4, // double-toasting is a real toaster behaviour
    fresh: 3, // the over-eager appliance is a familiar beat
    tight: 4,
    voice: 5, // apologetic toaster, consistent throughout
    lands: 4,
  },
  {
    text: "Toast complete. The smoke is a feature. Please open a window.",
    realError: 3, // "smoke is a feature" undercuts the error framing
    fresh: 3,
    tight: 5,
    voice: 4,
    lands: 4,
  },
  {
    text: "ERROR 404: Bread not found. Please insert bread and lower your expectations.",
    realError: 3, // 404 is a web error, not a toaster error
    fresh: 2, // the 404 gag is the most obvious move available
    tight: 3,
    voice: 3,
    lands: 4,
  },
];

function score(c: Candidate): number {
  // The brief's order: real error first, then freshness, then tightness,
  // voice, and landing on one read. Economy bonus: shorter wins ties.
  const base =
    c.realError * 3 + c.fresh * 3 + c.tight * 2 + c.voice * 2 + c.lands * 2;
  return base + Math.max(0, 120 - [...c.text].length) / 120;
}

let best = CANDIDATES[0];
for (const c of CANDIDATES.slice(1)) {
  if (score(c) > score(best)) best = c;
}

const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(out, { recursive: true });
writeFileSync(`${out}/entry.txt`, best.text, "utf8");
