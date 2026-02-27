import mysql from "mysql2/promise";
import { env } from "./env.js";

export const db = mysql.createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  port: env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10
});

// Test connexion DB
try {
  const connection = await db.getConnection();
  console.log("Base de données connectée");
  connection.release();
} catch (err) {
  console.error("Erreur connexion MySQL :", err);
}