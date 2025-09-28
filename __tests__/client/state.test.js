import test from "node:test";
import { colorFormat } from "../../client/state";

test('colorFormat.button return null', () => {
    expect(colorFormat.button).toBeNull()
})
