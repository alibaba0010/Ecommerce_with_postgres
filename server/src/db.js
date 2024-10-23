// db.js
import exp from "constants";
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();
// export const pool = new Pool({
//   user: "postgres.yycpfdwzlymynbokexew",
//   host: "aws-0-us-east-1.pooler.supabase.com",
//   database: "postgres",
//   //   password: "Akinkunmi100$",
//   port: 6543,
// });

// db.js
import postgres from "postgres";
const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);

export default sql;
