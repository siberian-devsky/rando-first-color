import { it, expect, describe } from "vitest";
import request from "supertest"
import { createApp } from "../../server/app";

describe("Test express routes", async () => {
    const app = await createApp();

    it("GET /test returns alive", async () => {
        const res = await request(app).get("/test")
        expect(res.status).toBe(200)
        expect(res.body.data).toBe("/test API is alive")
    })

    it("GET /randomRainbow returns a list of length 5", async () => {
        const res = await request(app).get("/randomRainbow")
        expect(res.body.rows.length).toBe(5)
        expect(res.body.rows.every( (row) => row.rgb && row.hex)).toBe(true)
        expect(res.body.fields).toBe(4)
    })
})