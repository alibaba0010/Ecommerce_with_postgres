// db.js
import pkg from "pg";
const { Pool } = pkg;

// export const pool = new Pool({
//   user: "postgres.yycpfdwzlymynbokexew",
//   host: "aws-0-us-east-1.pooler.supabase.com",
//   database: "postgres",
//   password: "Akinkunmi100$",
//   port: 6543,
// });

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "students",
  password: "Akinkunmi100$",
  port: 5432,
});
