import { db } from "../config/database.js";

async function viewDatabase() {
  try {
    console.log("\n================ 📊 ALGOVIA LOCAL SQL DATABASE 📊 ================\n");

    // 1. Users Table
    const users = await db("users").select("*");
    console.log("👤 [USERS TABLE]:");
    console.table(users);

    // 2. OTPs Table
    const otps = await db("otps").select("*");
    console.log("\n🔐 [OTPS TABLE]:");
    console.table(otps);

    // 3. Refresh Tokens Table
    const tokens = await db("refresh_tokens").select("*");
    console.log("\n🔑 [REFRESH TOKENS TABLE]:");
    console.table(tokens);

    console.log("\n==================================================================\n");
    process.exit(0);
  } catch (error) {
    console.error("Error inspecting database:", error);
    process.exit(1);
  }
}

viewDatabase();
