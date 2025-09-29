// @vitest-environment jsdom

import { it, expect, describe } from "vitest"
import { toggleColorFormatUi } from "../../client/ui";
import { colorFormat } from "../../client/state.js"

describe("UI module test utilities", () => {
  it("tests the rgb/hex toggle", () => {
    const colorValue = document.createElement("div")
    const copyBtn = document.createElement("button")

    // mock the button so vitest soednt see null
    const toggleBtn = document.createElement("button")
    colorFormat.button = toggleBtn
    colorFormat.showAsRgb = true

    colorValue.innerHTML = "#000000"
    toggleColorFormatUi(colorValue, copyBtn)

    expect(colorValue.innerHTML).toBe("rgb(0, 0, 0)")
    expect(toggleBtn.innerHTML).toBe("Show RGB")
  })
})
