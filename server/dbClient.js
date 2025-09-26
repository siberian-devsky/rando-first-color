import mysql from "mysql2/promise";
import 'dotenv/config'

export async function getDbClient() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DBPW,
    database: "color_history"
  });
}
