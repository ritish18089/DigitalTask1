import "dotenv/config";
import { db } from "../src/db/index.js";
import { adminUsers } from "../src/db/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function seed() {
  try {
    // Delete the old admin
    await db.delete(adminUsers).where(eq(adminUsers.username, 'admin'));

    const passwordHash = bcrypt.hashSync("mahasavi18@", 10);
    await db.insert(adminUsers).values({
      username: "ritish1808",
      email: "ritish1808@gmail.com",
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
