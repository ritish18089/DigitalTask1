import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import http from "http";
import { db } from "./src/db/index.ts";
import { leads, adminUsers } from "./src/db/schema.ts";
import { eq, desc, ilike, or } from "drizzle-orm";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev";


async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Public Route: Create a Lead
  app.post("/api/leads", async (req, res) => {
    try {
      const { name, email, budget, message } = req.body;
      if (!name || !email || !budget || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const newLead = await db.insert(leads).values({
        name,
        email,
        budget,
        message,
        status: "NEW",
      }).returning();

      res.status(201).json(newLead[0]);
    } catch (error: any) {
      console.error("Database query failed:", error);
      res.status(500).json({ error: "Database query failed. Please try again later.", cause: error.message });
    }
  });

  const adminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      (req as any).user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: "Unauthorized" });
    }
  };

  app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;
    try {
      const userResult = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
      const user = userResult[0];
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
      res.json({ token, user: { username: user.username, role: user.role } });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.get("/api/admin/leads", adminAuth, async (req, res) => {
    try {
      const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));
      res.json(allLeads);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.get("/api/admin/leads/search", adminAuth, async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.json([]);
      }

      const searchTerm = `%${q}%`;
      const result = await db.select().from(leads).where(
        or(
          ilike(leads.name, searchTerm),
          ilike(leads.email, searchTerm),
          ilike(leads.budget, searchTerm),
          ilike(leads.status, searchTerm)
        )
      ).orderBy(desc(leads.createdAt));

      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to search leads" });
    }
  });

  app.put("/api/admin/leads/:id/status", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;

      if (!['NEW', 'CONTACTED', 'CLOSED'].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }

      const updatedLead = await db.update(leads)
        .set({ status, updatedAt: new Date() })
        .where(eq(leads.id, id))
        .returning();

      if (updatedLead.length === 0) {
        return res.status(404).json({ error: "Lead not found" });
      }

      res.json(updatedLead[0]);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to update lead" });
    }
  });

  app.delete("/api/admin/leads/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deletedLead = await db.delete(leads).where(eq(leads.id, id)).returning();
      if (deletedLead.length === 0) {
        return res.status(404).json({ error: "Lead not found" });
      }
      res.json({ success: true, message: "Lead deleted" });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to delete lead" });
    }
  });

  // Vite middleware for development
  let vite: any;
  const server = http.createServer(app);

  if (process.env.NODE_ENV !== "production") {
    vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: { server } // Share the Express HTTP server with Vite's WebSocket
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Support SPA routing
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Handle server errors (e.g. port in use)
  server.on("error", (e: any) => {
    if (e.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use. Another instance of the server is running.`);
      console.error("Please close the existing server before starting a new one.");
      process.exit(1); // Exit to prevent multiple instances from running
    }
  });

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });

  // Graceful shutdown to ensure port is freed on restart
  const gracefulShutdown = async () => {
    console.log("\nShutting down server gracefully...");
    if (vite) {
      await vite.close();
    }
    server.close(() => {
      console.log("Server closed.");
      process.exit(0);
    });
  };

  process.on("SIGINT", gracefulShutdown);
  process.on("SIGTERM", gracefulShutdown);
}

startServer();
