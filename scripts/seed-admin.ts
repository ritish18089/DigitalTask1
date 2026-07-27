import "dotenv/config";
import { db } from "../src/db/index.js";
import { adminUsers } from "../src/db/schema.js";
import bcrypt from "bcryptjs";

async function seed() {
  try {
    const passwordHash = bcrypt.hashSync("admin123", 10);
    await db.insert(adminUsers).values({
      username: "admin",
      email: "admin@example.com",
      passwordHash: passwordHash,
      role: "admin",
    });
    console.log("✅ Admin user seeded successfully!");
  } catch (error: any) {
    if (error.code === '23505') {
      console.log("ℹ️ Admin user already exists (duplicate key error). Skipping seed.");
    } else {
      console.error("❌ Failed to seed admin user:", error);
    }
  } finally {
    process.exit(0);
  }
}

seed();
