import { describe, it, expect } from "vitest";
import { getKeyForChar, KEYBOARD_ROWS } from "./keyboardData";

describe("keyboardData mapping", () => {
  it("maps home row keys to correct fingers and hands", () => {
    const a = getKeyForChar("a");
    expect(a).toBeDefined();
    expect(a?.finger).toBe("pinky");
    expect(a?.hand).toBe("left");
    expect(a?.shiftRequired).toBe(false);

    const f = getKeyForChar("f");
    expect(f?.finger).toBe("index");
    expect(f?.hand).toBe("left");

    const j = getKeyForChar("j");
    expect(j?.finger).toBe("index");
    expect(j?.hand).toBe("right");

    const semicolon = getKeyForChar(";");
    expect(semicolon?.finger).toBe("pinky");
    expect(semicolon?.hand).toBe("right");
  });

  it("handles uppercase letters requiring opposite-hand Shift", () => {
    const capitalA = getKeyForChar("A");
    expect(capitalA?.shiftRequired).toBe(true);
    expect(capitalA?.shiftHand).toBe("right"); // left hand key uses right Shift

    const capitalJ = getKeyForChar("J");
    expect(capitalJ?.shiftRequired).toBe(true);
    expect(capitalJ?.shiftHand).toBe("left"); // right hand key uses left Shift
  });

  it("maps spacebar to thumb", () => {
    const space = getKeyForChar(" ");
    expect(space?.finger).toBe("thumb");
  });

  it("includes all standard keyboard rows in KEYBOARD_ROWS", () => {
    expect(KEYBOARD_ROWS.length).toBe(5); // row 0 to 4
    // Home row (row 2) contains 13 keys (Caps, a-l, ;, ', Enter)
    expect(KEYBOARD_ROWS[2].length).toBe(13);
  });
});

