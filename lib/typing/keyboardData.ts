import { Finger, Hand, KeyDefinition } from "@/types/typing";

export interface KeyMapEntry {
  code: string;
  finger: Finger;
  hand: Hand;
  shiftRequired: boolean;
  shiftHand?: Hand;
}

export const KEYBOARD_ROWS: KeyDefinition[][] = [
  // Row 0: Number Row
  [
    { code: "Backquote", label: "`", shiftLabel: "~", finger: "pinky", hand: "left", row: 0, width: "w-10 sm:w-11" },
    { code: "Digit1", label: "1", shiftLabel: "!", finger: "pinky", hand: "left", row: 0, width: "w-10 sm:w-11" },
    { code: "Digit2", label: "2", shiftLabel: "@", finger: "ring", hand: "left", row: 0, width: "w-10 sm:w-11" },
    { code: "Digit3", label: "3", shiftLabel: "#", finger: "middle", hand: "left", row: 0, width: "w-10 sm:w-11" },
    { code: "Digit4", label: "4", shiftLabel: "$", finger: "index", hand: "left", row: 0, width: "w-10 sm:w-11" },
    { code: "Digit5", label: "5", shiftLabel: "%", finger: "index", hand: "left", row: 0, width: "w-10 sm:w-11" },
    { code: "Digit6", label: "6", shiftLabel: "^", finger: "index", hand: "right", row: 0, width: "w-10 sm:w-11" },
    { code: "Digit7", label: "7", shiftLabel: "&", finger: "index", hand: "right", row: 0, width: "w-10 sm:w-11" },
    { code: "Digit8", label: "8", shiftLabel: "*", finger: "middle", hand: "right", row: 0, width: "w-10 sm:w-11" },
    { code: "Digit9", label: "9", shiftLabel: "(", finger: "ring", hand: "right", row: 0, width: "w-10 sm:w-11" },
    { code: "Digit0", label: "0", shiftLabel: ")", finger: "pinky", hand: "right", row: 0, width: "w-10 sm:w-11" },
    { code: "Minus", label: "-", shiftLabel: "_", finger: "pinky", hand: "right", row: 0, width: "w-10 sm:w-11" },
    { code: "Equal", label: "=", shiftLabel: "+", finger: "pinky", hand: "right", row: 0, width: "w-10 sm:w-11" },
    { code: "Backspace", label: "Backspace", finger: "pinky", hand: "right", row: 0, width: "flex-grow min-w-[3.5rem] sm:min-w-[4.5rem]", isSpecial: true },
  ],
  // Row 1: QWERTY Row
  [
    { code: "Tab", label: "Tab", finger: "pinky", hand: "left", row: 1, width: "min-w-[3rem] sm:min-w-[3.75rem]", isSpecial: true },
    { code: "KeyQ", label: "q", shiftLabel: "Q", finger: "pinky", hand: "left", row: 1, width: "w-10 sm:w-11" },
    { code: "KeyW", label: "w", shiftLabel: "W", finger: "ring", hand: "left", row: 1, width: "w-10 sm:w-11" },
    { code: "KeyE", label: "e", shiftLabel: "E", finger: "middle", hand: "left", row: 1, width: "w-10 sm:w-11" },
    { code: "KeyR", label: "r", shiftLabel: "R", finger: "index", hand: "left", row: 1, width: "w-10 sm:w-11" },
    { code: "KeyT", label: "t", shiftLabel: "T", finger: "index", hand: "left", row: 1, width: "w-10 sm:w-11" },
    { code: "KeyY", label: "y", shiftLabel: "Y", finger: "index", hand: "right", row: 1, width: "w-10 sm:w-11" },
    { code: "KeyU", label: "u", shiftLabel: "U", finger: "index", hand: "right", row: 1, width: "w-10 sm:w-11" },
    { code: "KeyI", label: "i", shiftLabel: "I", finger: "middle", hand: "right", row: 1, width: "w-10 sm:w-11" },
    { code: "KeyO", label: "o", shiftLabel: "O", finger: "ring", hand: "right", row: 1, width: "w-10 sm:w-11" },
    { code: "KeyP", label: "p", shiftLabel: "P", finger: "pinky", hand: "right", row: 1, width: "w-10 sm:w-11" },
    { code: "BracketLeft", label: "[", shiftLabel: "{", finger: "pinky", hand: "right", row: 1, width: "w-10 sm:w-11" },
    { code: "BracketRight", label: "]", shiftLabel: "}", finger: "pinky", hand: "right", row: 1, width: "w-10 sm:w-11" },
    { code: "Backslash", label: "\\", shiftLabel: "|", finger: "pinky", hand: "right", row: 1, width: "w-10 sm:w-11", isSpecial: true },
  ],
  // Row 2: Home Row (ASDF - JKL;)
  [
    { code: "CapsLock", label: "Caps", finger: "pinky", hand: "left", row: 2, width: "min-w-[3.5rem] sm:min-w-[4.25rem]", isSpecial: true },
    { code: "KeyA", label: "a", shiftLabel: "A", finger: "pinky", hand: "left", row: 2, width: "w-10 sm:w-11" },
    { code: "KeyS", label: "s", shiftLabel: "S", finger: "ring", hand: "left", row: 2, width: "w-10 sm:w-11" },
    { code: "KeyD", label: "d", shiftLabel: "D", finger: "middle", hand: "left", row: 2, width: "w-10 sm:w-11" },
    { code: "KeyF", label: "f", shiftLabel: "F", finger: "index", hand: "left", row: 2, width: "w-10 sm:w-11" }, // tactile bump
    { code: "KeyG", label: "g", shiftLabel: "G", finger: "index", hand: "left", row: 2, width: "w-10 sm:w-11" },
    { code: "KeyH", label: "h", shiftLabel: "H", finger: "index", hand: "right", row: 2, width: "w-10 sm:w-11" },
    { code: "KeyJ", label: "j", shiftLabel: "J", finger: "index", hand: "right", row: 2, width: "w-10 sm:w-11" }, // tactile bump
    { code: "KeyK", label: "k", shiftLabel: "K", finger: "middle", hand: "right", row: 2, width: "w-10 sm:w-11" },
    { code: "KeyL", label: "l", shiftLabel: "L", finger: "ring", hand: "right", row: 2, width: "w-10 sm:w-11" },
    { code: "Semicolon", label: ";", shiftLabel: ":", finger: "pinky", hand: "right", row: 2, width: "w-10 sm:w-11" },
    { code: "Quote", label: "'", shiftLabel: "\"", finger: "pinky", hand: "right", row: 2, width: "w-10 sm:w-11" },
    { code: "Enter", label: "Enter", finger: "pinky", hand: "right", row: 2, width: "flex-grow min-w-[3.5rem] sm:min-w-[4.5rem]", isSpecial: true },
  ],
  // Row 3: Bottom Row (ZXCV - BNM)
  [
    { code: "ShiftLeft", label: "Shift", finger: "pinky", hand: "left", row: 3, width: "min-w-[4.5rem] sm:min-w-[5.25rem]", isSpecial: true },
    { code: "KeyZ", label: "z", shiftLabel: "Z", finger: "pinky", hand: "left", row: 3, width: "w-10 sm:w-11" },
    { code: "KeyX", label: "x", shiftLabel: "X", finger: "ring", hand: "left", row: 3, width: "w-10 sm:w-11" },
    { code: "KeyC", label: "c", shiftLabel: "C", finger: "middle", hand: "left", row: 3, width: "w-10 sm:w-11" },
    { code: "KeyV", label: "v", shiftLabel: "V", finger: "index", hand: "left", row: 3, width: "w-10 sm:w-11" },
    { code: "KeyB", label: "b", shiftLabel: "B", finger: "index", hand: "left", row: 3, width: "w-10 sm:w-11" },
    { code: "KeyN", label: "n", shiftLabel: "N", finger: "index", hand: "right", row: 3, width: "w-10 sm:w-11" },
    { code: "KeyM", label: "m", shiftLabel: "M", finger: "index", hand: "right", row: 3, width: "w-10 sm:w-11" },
    { code: "Comma", label: ",", shiftLabel: "<", finger: "middle", hand: "right", row: 3, width: "w-10 sm:w-11" },
    { code: "Period", label: ".", shiftLabel: ">", finger: "ring", hand: "right", row: 3, width: "w-10 sm:w-11" },
    { code: "Slash", label: "/", shiftLabel: "?", finger: "pinky", hand: "right", row: 3, width: "w-10 sm:w-11" },
    { code: "ShiftRight", label: "Shift", finger: "pinky", hand: "right", row: 3, width: "flex-grow min-w-[4.5rem] sm:min-w-[5.25rem]", isSpecial: true },
  ],
  // Row 4: Space Row
  [
    { code: "ControlLeft", label: "Ctrl", finger: "pinky", hand: "left", row: 4, width: "w-12 sm:w-14", isSpecial: true },
    { code: "AltLeft", label: "Alt", finger: "thumb", hand: "left", row: 4, width: "w-12 sm:w-14", isSpecial: true },
    { code: "Space", label: "Space", finger: "thumb", hand: "either", row: 4, width: "flex-grow min-w-[12rem] sm:min-w-[18rem]" },
    { code: "AltRight", label: "Alt", finger: "thumb", hand: "right", row: 4, width: "w-12 sm:w-14", isSpecial: true },
    { code: "ControlRight", label: "Ctrl", finger: "pinky", hand: "right", row: 4, width: "w-12 sm:w-14", isSpecial: true },
  ],
];

// Character mapping dictionary for instant lookup
export const CHAR_TO_KEY_MAP: Record<string, KeyMapEntry> = {
  // Lowercase letters
  a: { code: "KeyA", finger: "pinky", hand: "left", shiftRequired: false },
  b: { code: "KeyB", finger: "index", hand: "left", shiftRequired: false },
  c: { code: "KeyC", finger: "middle", hand: "left", shiftRequired: false },
  d: { code: "KeyD", finger: "middle", hand: "left", shiftRequired: false },
  e: { code: "KeyE", finger: "middle", hand: "left", shiftRequired: false },
  f: { code: "KeyF", finger: "index", hand: "left", shiftRequired: false },
  g: { code: "KeyG", finger: "index", hand: "left", shiftRequired: false },
  h: { code: "KeyH", finger: "index", hand: "right", shiftRequired: false },
  i: { code: "KeyI", finger: "middle", hand: "right", shiftRequired: false },
  j: { code: "KeyJ", finger: "index", hand: "right", shiftRequired: false },
  k: { code: "KeyK", finger: "middle", hand: "right", shiftRequired: false },
  l: { code: "KeyL", finger: "ring", hand: "right", shiftRequired: false },
  m: { code: "KeyM", finger: "index", hand: "right", shiftRequired: false },
  n: { code: "KeyN", finger: "index", hand: "right", shiftRequired: false },
  o: { code: "KeyO", finger: "ring", hand: "right", shiftRequired: false },
  p: { code: "KeyP", finger: "pinky", hand: "right", shiftRequired: false },
  q: { code: "KeyQ", finger: "pinky", hand: "left", shiftRequired: false },
  r: { code: "KeyR", finger: "index", hand: "left", shiftRequired: false },
  s: { code: "KeyS", finger: "ring", hand: "left", shiftRequired: false },
  t: { code: "KeyT", finger: "index", hand: "left", shiftRequired: false },
  u: { code: "KeyU", finger: "index", hand: "right", shiftRequired: false },
  v: { code: "KeyV", finger: "index", hand: "left", shiftRequired: false },
  w: { code: "KeyW", finger: "ring", hand: "left", shiftRequired: false },
  x: { code: "KeyX", finger: "ring", hand: "left", shiftRequired: false },
  y: { code: "KeyY", finger: "index", hand: "right", shiftRequired: false },
  z: { code: "KeyZ", finger: "pinky", hand: "left", shiftRequired: false },

  // Uppercase letters (use opposite Shift)
  A: { code: "KeyA", finger: "pinky", hand: "left", shiftRequired: true, shiftHand: "right" },
  B: { code: "KeyB", finger: "index", hand: "left", shiftRequired: true, shiftHand: "right" },
  C: { code: "KeyC", finger: "middle", hand: "left", shiftRequired: true, shiftHand: "right" },
  D: { code: "KeyD", finger: "middle", hand: "left", shiftRequired: true, shiftHand: "right" },
  E: { code: "KeyE", finger: "middle", hand: "left", shiftRequired: true, shiftHand: "right" },
  F: { code: "KeyF", finger: "index", hand: "left", shiftRequired: true, shiftHand: "right" },
  G: { code: "KeyG", finger: "index", hand: "left", shiftRequired: true, shiftHand: "right" },
  H: { code: "KeyH", finger: "index", hand: "right", shiftRequired: true, shiftHand: "left" },
  I: { code: "KeyI", finger: "middle", hand: "right", shiftRequired: true, shiftHand: "left" },
  J: { code: "KeyJ", finger: "index", hand: "right", shiftRequired: true, shiftHand: "left" },
  K: { code: "KeyK", finger: "middle", hand: "right", shiftRequired: true, shiftHand: "left" },
  L: { code: "KeyL", finger: "ring", hand: "right", shiftRequired: true, shiftHand: "left" },
  M: { code: "KeyM", finger: "index", hand: "right", shiftRequired: true, shiftHand: "left" },
  N: { code: "KeyN", finger: "index", hand: "right", shiftRequired: true, shiftHand: "left" },
  O: { code: "KeyO", finger: "ring", hand: "right", shiftRequired: true, shiftHand: "left" },
  P: { code: "KeyP", finger: "pinky", hand: "right", shiftRequired: true, shiftHand: "left" },
  Q: { code: "KeyQ", finger: "pinky", hand: "left", shiftRequired: true, shiftHand: "right" },
  R: { code: "KeyR", finger: "index", hand: "left", shiftRequired: true, shiftHand: "right" },
  S: { code: "KeyS", finger: "ring", hand: "left", shiftRequired: true, shiftHand: "right" },
  T: { code: "KeyT", finger: "index", hand: "left", shiftRequired: true, shiftHand: "right" },
  U: { code: "KeyU", finger: "index", hand: "right", shiftRequired: true, shiftHand: "left" },
  V: { code: "KeyV", finger: "index", hand: "left", shiftRequired: true, shiftHand: "right" },
  W: { code: "KeyW", finger: "ring", hand: "left", shiftRequired: true, shiftHand: "right" },
  X: { code: "KeyX", finger: "ring", hand: "left", shiftRequired: true, shiftHand: "right" },
  Y: { code: "KeyY", finger: "index", hand: "right", shiftRequired: true, shiftHand: "left" },
  Z: { code: "KeyZ", finger: "pinky", hand: "left", shiftRequired: true, shiftHand: "right" },

  // Numbers
  "1": { code: "Digit1", finger: "pinky", hand: "left", shiftRequired: false },
  "2": { code: "Digit2", finger: "ring", hand: "left", shiftRequired: false },
  "3": { code: "Digit3", finger: "middle", hand: "left", shiftRequired: false },
  "4": { code: "Digit4", finger: "index", hand: "left", shiftRequired: false },
  "5": { code: "Digit5", finger: "index", hand: "left", shiftRequired: false },
  "6": { code: "Digit6", finger: "index", hand: "right", shiftRequired: false },
  "7": { code: "Digit7", finger: "index", hand: "right", shiftRequired: false },
  "8": { code: "Digit8", finger: "middle", hand: "right", shiftRequired: false },
  "9": { code: "Digit9", finger: "ring", hand: "right", shiftRequired: false },
  "0": { code: "Digit0", finger: "pinky", hand: "right", shiftRequired: false },

  // Symbols without Shift
  "`": { code: "Backquote", finger: "pinky", hand: "left", shiftRequired: false },
  "-": { code: "Minus", finger: "pinky", hand: "right", shiftRequired: false },
  "=": { code: "Equal", finger: "pinky", hand: "right", shiftRequired: false },
  "[": { code: "BracketLeft", finger: "pinky", hand: "right", shiftRequired: false },
  "]": { code: "BracketRight", finger: "pinky", hand: "right", shiftRequired: false },
  "\\": { code: "Backslash", finger: "pinky", hand: "right", shiftRequired: false },
  ";": { code: "Semicolon", finger: "pinky", hand: "right", shiftRequired: false },
  "'": { code: "Quote", finger: "pinky", hand: "right", shiftRequired: false },
  ",": { code: "Comma", finger: "middle", hand: "right", shiftRequired: false },
  ".": { code: "Period", finger: "ring", hand: "right", shiftRequired: false },
  "/": { code: "Slash", finger: "pinky", hand: "right", shiftRequired: false },
  " ": { code: "Space", finger: "thumb", hand: "either", shiftRequired: false },

  // Shift symbols
  "~": { code: "Backquote", finger: "pinky", hand: "left", shiftRequired: true, shiftHand: "right" },
  "!": { code: "Digit1", finger: "pinky", hand: "left", shiftRequired: true, shiftHand: "right" },
  "@": { code: "Digit2", finger: "ring", hand: "left", shiftRequired: true, shiftHand: "right" },
  "#": { code: "Digit3", finger: "middle", hand: "left", shiftRequired: true, shiftHand: "right" },
  "$": { code: "Digit4", finger: "index", hand: "left", shiftRequired: true, shiftHand: "right" },
  "%": { code: "Digit5", finger: "index", hand: "left", shiftRequired: true, shiftHand: "right" },
  "^": { code: "Digit6", finger: "index", hand: "right", shiftRequired: true, shiftHand: "left" },
  "&": { code: "Digit7", finger: "index", hand: "right", shiftRequired: true, shiftHand: "left" },
  "*": { code: "Digit8", finger: "middle", hand: "right", shiftRequired: true, shiftHand: "left" },
  "(": { code: "Digit9", finger: "ring", hand: "right", shiftRequired: true, shiftHand: "left" },
  ")": { code: "Digit0", finger: "pinky", hand: "right", shiftRequired: true, shiftHand: "left" },
  "_": { code: "Minus", finger: "pinky", hand: "right", shiftRequired: true, shiftHand: "left" },
  "+": { code: "Equal", finger: "pinky", hand: "right", shiftRequired: true, shiftHand: "left" },
  "{": { code: "BracketLeft", finger: "pinky", hand: "right", shiftRequired: true, shiftHand: "left" },
  "}": { code: "BracketRight", finger: "pinky", hand: "right", shiftRequired: true, shiftHand: "left" },
  "|": { code: "Backslash", finger: "pinky", hand: "right", shiftRequired: true, shiftHand: "left" },
  ":": { code: "Semicolon", finger: "pinky", hand: "right", shiftRequired: true, shiftHand: "left" },
  "\"": { code: "Quote", finger: "pinky", hand: "right", shiftRequired: true, shiftHand: "left" },
  "<": { code: "Comma", finger: "middle", hand: "right", shiftRequired: true, shiftHand: "left" },
  ">": { code: "Period", finger: "ring", hand: "right", shiftRequired: true, shiftHand: "left" },
  "?": { code: "Slash", finger: "pinky", hand: "right", shiftRequired: true, shiftHand: "left" },
  "\n": { code: "Enter", finger: "pinky", hand: "right", shiftRequired: false },
};

export const FINGER_COLORS: Record<Finger, { bg: string; border: string; text: string; label: string }> = {
  pinky: {
    bg: "bg-rose-100 dark:bg-rose-950/40",
    border: "border-rose-300 dark:border-rose-700",
    text: "text-rose-700 dark:text-rose-300",
    label: "Pinky Finger",
  },
  ring: {
    bg: "bg-amber-100 dark:bg-amber-950/40",
    border: "border-amber-300 dark:border-amber-700",
    text: "text-amber-700 dark:text-amber-300",
    label: "Ring Finger",
  },
  middle: {
    bg: "bg-yellow-100 dark:bg-yellow-950/40",
    border: "border-yellow-300 dark:border-yellow-700",
    text: "text-yellow-700 dark:text-yellow-300",
    label: "Middle Finger",
  },
  index: {
    bg: "bg-emerald-100 dark:bg-emerald-950/40",
    border: "border-emerald-300 dark:border-emerald-700",
    text: "text-emerald-700 dark:text-emerald-300",
    label: "Index Finger",
  },
  thumb: {
    bg: "bg-sky-100 dark:bg-sky-950/40",
    border: "border-sky-300 dark:border-sky-700",
    text: "text-sky-700 dark:text-sky-300",
    label: "Thumb (Spacebar)",
  },
};

export function getKeyForChar(char: string): KeyMapEntry | undefined {
  return CHAR_TO_KEY_MAP[char];
}

export function getFingerDescription(hand: Hand, finger: Finger): string {
  const handStr = hand === "left" ? "Left" : hand === "right" ? "Right" : "Either";
  const fingerStr = finger.charAt(0).toUpperCase() + finger.slice(1);
  return `${handStr} ${fingerStr}`;
}

