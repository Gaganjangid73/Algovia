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

    // Student Verification Columns
    const hasStudentVerified = await db.schema.hasColumn("users", "is_student_verified");
    if (!hasStudentVerified) {
      await db.schema.table("users", (table) => {
        table.boolean("is_student_verified").defaultTo(false);
        table.string("student_email").nullable();
      });
      console.log("[Database] Added 'is_student_verified' and 'student_email' columns to 'users' table.");
    }

    // Role Column for Admin Access
    const hasRole = await db.schema.hasColumn("users", "role");
    if (!hasRole) {
      await db.schema.table("users", (table) => {
        table.string("role").defaultTo("user");
      });
      console.log("[Database] Added 'role' column to 'users' table.");
    }

    // Password Hash Column
    const hasPasswordHash = await db.schema.hasColumn("users", "password_hash");
    if (!hasPasswordHash) {
      await db.schema.table("users", (table) => {
        table.string("password_hash").nullable();
      });
      console.log("[Database] Added 'password_hash' column to 'users' table.");
    }
  }

  // 2. OTP Verification Table for Student Status
  const hasStudentOtpTable = await db.schema.hasTable("otp_verifications");
  if (!hasStudentOtpTable) {
    await db.schema.createTable("otp_verifications", (table) => {
      table.increments("id").primary();
      table.string("email").notNullable().index();
      table.string("otp_code").notNullable();
      table.timestamp("expires_at").notNullable();
      table.timestamp("created_at").defaultTo(db.fn.now());
    });
    console.log("[Database] Created 'otp_verifications' table.");
  }

  // 3. OTPs Table
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

  // 4. Refresh Tokens Table
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

  // 5. Payments Table
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

  // 6. Subscriptions Table
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

  // 7. Curriculum Topics Table
  const hasCurriculumTopics = await db.schema.hasTable("curriculum_topics");
  if (!hasCurriculumTopics) {
    await db.schema.createTable("curriculum_topics", (table) => {
      table.increments("id").primary();
      table.string("track").notNullable().defaultTo("sde").index(); // sde, devops, ai
      table.string("category").notNullable().index(); // HLD, LLD, Scenarios, Docker, Kubernetes, LLM Apps
      table.string("title").notNullable();
      table.string("slug").notNullable().unique().index();
      table.text("summary").nullable();
      table.text("content", "longtext").nullable();
      table.string("difficulty").defaultTo("Intermediate"); // Beginner, Intermediate, Advanced
      table.integer("estimated_minutes").defaultTo(20);
      table.boolean("is_premium").defaultTo(true);
      table.integer("order_index").defaultTo(0);
      table.timestamp("created_at").defaultTo(db.fn.now());
      table.timestamp("updated_at").defaultTo(db.fn.now());
    });
    console.log("[Database] Created 'curriculum_topics' table.");

    // Seed Initial Production Topics
    const initialTopics = [
      { track: "sde", category: "LLD", title: "What is Low Level Design (LLD)?", slug: "what-is-lld", summary: "Fundamentals of Object Oriented Analysis & Design and SOLID principles.", difficulty: "Beginner", estimated_minutes: 15, is_premium: false, order_index: 1 },
      { track: "sde", category: "LLD", title: "Encapsulation & Abstraction Deep Dive", slug: "encapsulation-abstraction", summary: "Mastering OOP encapsulation, access modifiers, and abstraction boundaries.", difficulty: "Intermediate", estimated_minutes: 25, is_premium: true, order_index: 2 },
      { track: "sde", category: "HLD", title: "System Architecture Basics & Scaling", slug: "system-architecture-basics", summary: "Monolith vs Microservices, Vertical vs Horizontal scaling, Load Balancers.", difficulty: "Beginner", estimated_minutes: 20, is_premium: false, order_index: 1 },
      { track: "sde", category: "HLD", title: "Database Sharding & Partitioning", slug: "database-sharding", summary: "Consistent Hashing, Range Sharding, and Distributed Query Execution.", difficulty: "Advanced", estimated_minutes: 35, is_premium: true, order_index: 2 },
      { track: "sde", category: "Scenarios", title: "Designing Distributed Rate Limiter", slug: "design-distributed-rate-limiter", summary: "Token Bucket, Leaky Bucket, Sliding Window Counter algorithms with Redis.", difficulty: "Advanced", estimated_minutes: 40, is_premium: true, order_index: 1 },
      { track: "devops", category: "Docker", title: "Containerization Fundamentals", slug: "docker-containerization", summary: "Dockerfile optimization, multi-stage builds, container isolation.", difficulty: "Beginner", estimated_minutes: 20, is_premium: false, order_index: 1 },
      { track: "devops", category: "Kubernetes", title: "Production K8s Architecture & Pod Scheduling", slug: "kubernetes-architecture", summary: "Control Plane, Worker Nodes, Ingress Controllers, StatefulSets.", difficulty: "Advanced", estimated_minutes: 45, is_premium: true, order_index: 2 },
      { track: "ai", category: "AI Systems", title: "RAG Pipeline Architecture (Retrieval Augmented Generation)", slug: "rag-architecture", summary: "Vector Databases, Embedding Generation, Hybrid Search & Reranking.", difficulty: "Advanced", estimated_minutes: 50, is_premium: true, order_index: 1 }
    ];

    await db("curriculum_topics").insert(initialTopics);
    console.log("[Database] Seeded initial curriculum topics across SDE, DevOps, and AI tracks.");
  }

  // 8. Seed Default Super Admin User (Gagan@0123)
  try {
    const bcrypt = await import("bcryptjs");
    const adminEmail = "admin@algovia.io";
    const existingAdmin = await db("users").where({ email: adminEmail }).first();
    const hashedPassword = await bcrypt.hash("Gagan@0123", 10);

    if (!existingAdmin) {
      const crypto = await import("crypto");
      await db("users").insert({
        id: crypto.randomUUID(),
        name: "Gagan Jangid (Admin)",
        email: adminEmail,
        password_hash: hashedPassword,
        role: "admin",
        is_verified: true,
        is_subscribed: true,
        subscription_plan: "FULL_YEARLY",
        created_at: new Date()
      });
      console.log(`[Database] Created default Super Admin user (${adminEmail}) with password 'Gagan@0123'.`);
    } else {
      await db("users")
        .where({ email: adminEmail })
        .update({
          password_hash: hashedPassword,
          role: "admin",
          updated_at: new Date()
        });
      console.log(`[Database] Updated Super Admin user (${adminEmail}) password to 'Gagan@0123'.`);
    }
  } catch (err) {
    console.warn("[Database] Admin seed warning:", err.message);
  }

  console.log("[Database] SQL Schema initialization complete.");
}
