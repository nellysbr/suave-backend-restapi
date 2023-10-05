import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: "localhost",
  user: process.env.NODE_ENV_DB_USER as string,
  password: process.env.NODE_ENV_DB_PASSWORD as string,
  database: process.env.NODE_ENV_DB_NAME as string,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const query = (sql: string, values?: any[]) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
