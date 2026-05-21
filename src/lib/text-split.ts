/**
 * Lightweight char/word splitter. Replaces GSAP SplitText (paid).
 * Wraps each unit in a span so GSAP can target them individually.
 * Idempotent: rerunning on a split element is a no-op.
 *
 * Pure DOM construction (no innerHTML) — safe to use on user-rendered text.
 */

type SplitMode = "chars" | "words" | "lines";

export interface SplitResult {
  chars: HTMLSpanElement[];
  words: HTMLSpanElement[];
  revert: () => void;
}

const SPLIT_FLAG = "data-text-split";
const ORIGINAL_CACHE = new WeakMap<HTMLElement, Node[]>();

export function splitText(
  el: HTMLElement,
  modes: SplitMode[] = ["chars", "words"]
): SplitResult {
  if (el.getAttribute(SPLIT_FLAG) === "1") {
    return {
      chars: Array.from(el.querySelectorAll<HTMLSpanElement>("[data-char]")),
      words: Array.from(el.querySelectorAll<HTMLSpanElement>("[data-word]")),
      revert: () => revertSplit(el),
    };
  }

  // Cache the live child nodes so revert restores exactly what was there
  ORIGINAL_CACHE.set(el, Array.from(el.childNodes).map((n) => n.cloneNode(true)));

  const text = el.textContent ?? "";
  const wantChars = modes.includes("chars");
  const wantWords = modes.includes("words") || wantChars;

  // Clear children safely
  while (el.firstChild) el.removeChild(el.firstChild);

  const wordEls: HTMLSpanElement[] = [];
  const charEls: HTMLSpanElement[] = [];

  const tokens = text.split(/(\s+)/);
  for (const token of tokens) {
    if (token === "") continue;
    if (/^\s+$/.test(token)) {
      el.appendChild(document.createTextNode(token));
      continue;
    }

    const wordWrap = document.createElement("span");
    wordWrap.setAttribute("data-word", "");
    wordWrap.style.display = "inline-block";
    wordWrap.style.whiteSpace = "pre";

    if (wantChars) {
      for (const ch of Array.from(token)) {
        const c = document.createElement("span");
        c.setAttribute("data-char", "");
        c.style.display = "inline-block";
        c.style.willChange = "transform, opacity";
        c.textContent = ch;
        wordWrap.appendChild(c);
        charEls.push(c);
      }
    } else {
      wordWrap.textContent = token;
    }

    el.appendChild(wordWrap);
    if (wantWords) wordEls.push(wordWrap);
  }

  el.setAttribute(SPLIT_FLAG, "1");

  return {
    chars: charEls,
    words: wordEls,
    revert: () => revertSplit(el),
  };
}

export function revertSplit(el: HTMLElement) {
  const cached = ORIGINAL_CACHE.get(el);
  while (el.firstChild) el.removeChild(el.firstChild);
  if (cached) {
    for (const node of cached) el.appendChild(node);
    ORIGINAL_CACHE.delete(el);
  }
  el.removeAttribute(SPLIT_FLAG);
}
