import express from "express";
import cors from 'cors'
import { getDbClient } from "./dbClient.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }))

const port = 8000;


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

app.get('/test', async (req, res) => {
  try {
    res.status(200).send({ data: '/test API is alive'})
  } catch (err) {
    console.log('/test API is dead')
    res.status(500).send({ error: '/test API is dead'})
  }
})

app.listen(port, () => console.log(`App running on port ${port}`));