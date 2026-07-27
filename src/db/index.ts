import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import * as schema from "./schema";

const { Pool } = pkg;

console.log({
  host: process.env.SQL_HOST,
  port: process.env.SQL_PORT,
  database: process.env.SQL_DB_NAME,
  user: process.env.SQL_USER,
});

const pool = new Pool({
  host: process.env.SQL_HOST,
  port: Number(process.env.SQL_PORT),
  database: process.env.SQL_DB_NAME,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect()
  .then(() => console.log("✅ Connected to Supabase"))
  .catch((err) => console.error("❌ Database Connection Failed:", err));

export const db = drizzle(pool, { schema });