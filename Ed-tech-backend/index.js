import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { initializeDatabase } from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// 1. Explicit CORS Whitelist Configuration
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "https://algovia.io",
  "https://algorithmxlr8.io"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser calls (Postman / mobile native apps / server-to-server)
      if (!origin) return callback(null, true);

      if (ALLOWED_ORIGINS.includes(origin) || NODE_ENV === "development") {
        return callback(null, origin);
      }
      callback(new Error(`CORS Error: Origin ${origin} is not allowed by security policy.`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    optionsSuccessStatus: 200
  })
);

// 2. Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false
  })
);

// 3. Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Rate Limiting Middleware for Auth endpoints
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per window
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again in 15 minutes."
  }
});

// 5. Routes
app.use("/api/auth", authRateLimiter, authRoutes);
app.use("/api/subscription", subscriptionRoutes);

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "HEALTHY",
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// 6. Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(`[UnhandledError] ${err.stack || err.message}`);
  const statusCode = err.statusCode || 400;
  res.status(statusCode).json({
    success: false,
    message: err.message || "An unexpected internal server error occurred."
  });
});

// 7. Start Express Server & Initialize Database
async function startServer() {
  try {
    await initializeDatabase();

    const server = app.listen(PORT, () => {
      console.log(`
🚀 [Express Backend] Server listening on port ${PORT} (${NODE_ENV} mode)
🔗 Health Check: http://localhost:${PORT}/api/health
🔒 SQL Database: Active connection pool initialized
      `);
    });

    // Graceful Shutdown signal handlers
    const shutdown = (signal) => {
      console.log(`[Express Backend] ${signal} received. Initiating graceful shutdown...`);
      server.close(() => {
        console.log("[Express Backend] HTTP server closed cleanly.");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error("[Express Backend] Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
