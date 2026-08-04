import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbClient = process.env.DB_CLIENT || "mysql2";

function getDatabaseConfig() {
  if (dbClient === "sqlite3") {
    return {
      client: "sqlite3",
      connection: {
        filename: path.join(__dirname, "dev.sqlite3")
      },
      useNullAsDefault: true
    };
  }

  // MySQL Workbench / MariaDB / PostgreSQL Configuration
  return {
    client: dbClient, // "mysql2" or "pg"
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      database: process.env.DB_NAME || "algovia_db",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false
    },
    pool: {
      min: 2,
      max: 10,
      idleTimeoutMillis: 30000
    }
  };
}

export default {
  development: getDatabaseConfig(),
  production: getDatabaseConfig()
};
