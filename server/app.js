// server/app.js
import express from "express";
import cors from "cors";
import { getDbClient } from "./dbClient.js";

export async function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cors({ origin: "http://localhost:3000" }));

  const client = await getDbClient();
  console.log("DB connected");

  app.post("/colors", async (req, res) => {
    try {
      const { rgb, hex } = req.body;
      const sql = `INSERT INTO colors (rgb, hex, added) VALUES("${rgb}", "${hex}", CURDATE())`;
      await client.query(sql);
      res.status(201).send({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "db error" });
    }
  });

  app.get("/test", async (req, res) => {
    res.status(200).send({ data: "/test API is alive" });
  });

  app.get("/randomRainbow", async (req, res) => {
    try {
      const sql = "SELECT * FROM colors ORDER BY RAND() LIMIT 5";
      const [rows, fields] = await client.query(sql);
      res.status(200).send({ rows, fields: fields.length });
    } catch (err) {
      res.status(500).send({ error: "oh shiot" });
    }
  });

  return app;
}
    