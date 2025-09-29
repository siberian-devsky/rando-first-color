import { it, expect, describe } from "vitest"
import {
    getColor,
    convertRgbToHex,
    convertHexToRgb
} from "../../client/colorUtils"

describe("Test color utilities", () => {
    it("getColor returns 0 >= N <= 255", () => {
        const n = getColor()
        expect(n).toBeGreaterThanOrEqual(0)
        expect(n).toBeLessThanOrEqual(255)
    })

    it("convertRgbToHex should return a hex value", () => {
        const hexVal = convertRgbToHex("rgb(67, 36, 207)")
        expect(hexVal).toBe("#4324cf")
    })

    it("convertHexToRgb should return an RGB value", () => {
        const rgbValue = convertHexToRgb("#4324cf")
        expect(rgbValue).toBe("rgb(67, 36, 207)")
    })
})