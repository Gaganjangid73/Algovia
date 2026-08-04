import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { initializeDatabase } from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// 1. Security Middleware
app.use(helmet());

// 2. CORS Middleware Configuration (Production vs Development)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://algovia.io",
  "https://algorithmxlr8.io"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || NODE_ENV === "development") {
        callback(null, true);
      } else {
        callback(new Error("CORS policy violation: Origin not allowed."));
      }
    },
    credentials: true
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
