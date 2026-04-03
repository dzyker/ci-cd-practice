import express from "express";
import cors from "cors";
import pg from "pg";

const PORT = Number(process.env.PORT ?? 3001);
const DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgresql://app:app@localhost:5432/ci_cd_practice";

const app = express();
app.use(cors());
app.use(express.json());

const pool = new pg.Pool({ connectionString: DATABASE_URL });

pool.on("error", (error) => {
  console.error("Unexpected database error:", error.message);
});

async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/contacts", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, message, created_at AS "createdAt"
       FROM contacts
       ORDER BY id DESC
       LIMIT 20`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to read contacts" });
  }
});

app.post("/api/contacts", async (req, res) => {
  const name = String(req.body?.name ?? "").trim();
  const message = String(req.body?.message ?? "").trim();

  if (!name || !message) {
    res.status(400).json({ error: "Name and message are required" });
    return;
  }

  try {
    const createdAt = new Date();
    const { rows } = await pool.query(
      `INSERT INTO contacts (name, message, created_at)
       VALUES ($1, $2, $3)
       RETURNING id, name, message, created_at AS "createdAt"`,
      [name, message, createdAt]
    );
    const row = rows[0];
    res.status(201).json({
      id: row.id,
      name: row.name,
      message: row.message,
      createdAt:
        row.createdAt instanceof Date
          ? row.createdAt.toISOString()
          : row.createdAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save contact" });
  }
});

async function start() {
  try {
    await ensureSchema();
  } catch (error) {
    console.error("Database setup failed:", error.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`API server is running on http://localhost:${PORT}`);
  });
}

start();
