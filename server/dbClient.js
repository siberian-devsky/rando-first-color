import mysql from "mysql2/promise";

export async function getDbClient() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Judochop1!",
    database: "color_history"
  });
}
