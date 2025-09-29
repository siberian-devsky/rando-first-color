import { test, expect } from "vitest"
import { colorFormat } from "../../client/state.js";

test("colorFormat.button should be null", () => {
  expect(colorFormat.button).toBe(null);
});