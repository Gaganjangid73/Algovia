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
      table.string("google_id").nullable().index();
      table.string("avatar").nullable();
      table.boolean("is_verified").defaultTo(false);
      table.string("role").defaultTo("USER");
      table.string("plan").defaultTo("Free Plan");
      table.string("preferred_language").defaultTo("cpp");
      table.timestamp("created_at").defaultTo(db.fn.now());
      table.timestamp("updated_at").defaultTo(db.fn.now());
    });
    console.log("[Database] Created 'users' table.");
  } else {
    // Check and add missing columns dynamically
    const hasGoogleId = await db.schema.hasColumn("users", "google_id");
    if (!hasGoogleId) {
      await db.schema.table("users", (table) => {
        table.string("google_id").nullable().index();
      });
      console.log("[Database] Added 'google_id' column to 'users' table.");
    }
    const hasIsVerified = await db.schema.hasColumn("users", "is_verified");
    if (!hasIsVerified) {
      await db.schema.table("users", (table) => {
        table.boolean("is_verified").defaultTo(false);
      });
      console.log("[Database] Added 'is_verified' column to 'users' table.");
    }

    // Subscription Columns
    const hasIsSubscribed = await db.schema.hasColumn("users", "is_subscribed");
    if (!hasIsSubscribed) {
      await db.schema.table("users", (table) => {
        table.boolean("is_subscribed").defaultTo(false);
        table.string("subscription_plan").defaultTo("FREE"); // FREE, FULL_MONTHLY, FULL_YEARLY, BASIC_MONTHLY, BASIC_YEARLY, STUDENT_MONTHLY, TEAM
        table.string("subscription_billing").defaultTo("none"); // monthly, yearly, team, student, none
        table.timestamp("subscription_expires_at").nullable();
        table.integer("team_seats").defaultTo(1);
        table.string("razorpay_subscription_id").nullable();
        table.string("razorpay_payment_id").nullable();
      });
      console.log("[Database] Added subscription columns to 'users' table.");
    }
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

  // 4. Payments Table
  const hasPayments = await db.schema.hasTable("payments");
  if (!hasPayments) {
    await db.schema.createTable("payments", (table) => {
      table.increments("id").primary();
      table.string("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
      table.string("razorpay_order_id").notNullable().unique().index();
      table.string("razorpay_payment_id").nullable();
      table.string("razorpay_signature").nullable();
      table.decimal("amount", 12, 2).notNullable();
      table.string("currency").defaultTo("INR");
      table.string("status").defaultTo("created"); // created, paid, failed, cancelled
      table.text("failure_reason").nullable();
      table.timestamp("created_at").defaultTo(db.fn.now());
      table.timestamp("updated_at").defaultTo(db.fn.now());
    });
    console.log("[Database] Created 'payments' table.");
  }

  // 5. Subscriptions Table
  const hasSubscriptions = await db.schema.hasTable("subscriptions");
  if (!hasSubscriptions) {
    await db.schema.createTable("subscriptions", (table) => {
      table.increments("id").primary();
      table.string("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
      table.string("plan_id").notNullable();
      table.decimal("amount_paid", 12, 2).notNullable();
      table.timestamp("start_date").notNullable().defaultTo(db.fn.now());
      table.timestamp("end_date").notNullable();
      table.string("status").defaultTo("active"); // active, upgraded, expired
      table.timestamp("created_at").defaultTo(db.fn.now());
      table.timestamp("updated_at").defaultTo(db.fn.now());
    });
    console.log("[Database] Created 'subscriptions' table.");
  }

  console.log("[Database] SQL Schema initialization complete.");
}
