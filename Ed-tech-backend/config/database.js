import knex from "knex";
import knexConfig from "../knexfile.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const environment = process.env.NODE_ENV || "development";
let config = knexConfig[environment] || knexConfig.development;

export let db = knex(config);

/**
 * Auto-initialize database tables for instant development/production setup
 * Features automatic fallback to SQLite if local MySQL is offline
 */
export async function initializeDatabase() {
  console.log(`[Database] Connecting to SQL Database (${config.client})...`);

  try {
    // Test database connectivity
    await db.raw("SELECT 1");
    console.log(`[Database] Connection established with ${config.client}.`);
  } catch (err) {
    if (config.client !== "sqlite3") {
      console.warn(`[Database Warning] Could not connect to ${config.client} (${err.message}). Falling back to local SQLite database.`);
      
      // Fallback to SQLite
      config = {
        client: "sqlite3",
        connection: {
          filename: path.join(__dirname, "../dev.sqlite3")
        },
        useNullAsDefault: true
      };
      db = knex(config);
    } else {
      throw err;
    }
  }

  // 1. Users Table
  const hasUsers = await db.schema.hasTable("users");
  if (!hasUsers) {
    await db.schema.createTable("users", (table) => {
      table.string("id").primary();
      table.string("email").unique().notNullable();
      table.string("name").notNullable();
      table.string("avatar");
      table.string("role").defaultTo("USER");
      table.string("plan").defaultTo("Free Plan");
      table.string("preferred_language").defaultTo("cpp");
      table.timestamp("created_at").defaultTo(db.fn.now());
      table.timestamp("updated_at").defaultTo(db.fn.now());
    });
    console.log("[Database] Created 'users' table.");
  }

  // 2. OTP Verification Table
  const hasOtps = await db.schema.hasTable("otps");
  if (!hasOtps) {
    await db.schema.createTable("otps", (table) => {
      table.string("id").primary();
      table.string("email").notNullable();
      table.string("otp_hash").notNullable();
      table.timestamp("expires_at").notNullable();
      table.boolean("is_used").defaultTo(false);
      table.timestamp("created_at").defaultTo(db.fn.now());
    });
    console.log("[Database] Created 'otps' table.");
  }

  // 3. Refresh Tokens Table
  const hasTokens = await db.schema.hasTable("refresh_tokens");
  if (!hasTokens) {
    await db.schema.createTable("refresh_tokens", (table) => {
      table.string("id").primary();
      table.string("user_id").notNullable();
      table.string("token_hash").notNullable();
      table.timestamp("expires_at").notNullable();
      table.boolean("is_revoked").defaultTo(false);
      table.timestamp("created_at").defaultTo(db.fn.now());
    });
    console.log("[Database] Created 'refresh_tokens' table.");
  }

  console.log("[Database] SQL Schema initialization complete.");
}
