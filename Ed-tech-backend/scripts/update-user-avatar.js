import dotenv from "dotenv";
import { db, initializeDatabase } from "../config/database.js";

dotenv.config();

async function run() {
  await initializeDatabase();
  console.log("Cleaning up hardcoded avatar strings from DB...");
  const updated = await db("users")
    .where({ avatar: "/assets/Gagan.JPG" })
    .update({ avatar: null });
  console.log(`Updated ${updated} users to allow Google avatar sync.`);
  process.exit(0);
}

run();
