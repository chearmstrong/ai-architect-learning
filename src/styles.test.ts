import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const styles = readFileSync(resolve("src/styles.css"), "utf8");

describe("styles", () => {
  it("keeps form controls constrained to their container on narrow screens", () => {
    expect(styles).toMatch(/select,\s*input\s*{[^}]*width:\s*100%;[^}]*}/s);
    expect(styles).toMatch(/select,\s*input\s*{[^}]*min-width:\s*0;[^}]*}/s);
  });
});
