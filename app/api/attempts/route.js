import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

async function ensureSchema() {
  // Create table and unique index if they do not exist
  await sql`
    CREATE TABLE IF NOT EXISTS attempts (
      id BIGSERIAL PRIMARY KEY,
      nick TEXT NOT NULL,
      correct INTEGER NOT NULL,
      total INTEGER NOT NULL,
      percentage INTEGER NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  await sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'uniq_nick_lower'
      ) THEN
        CREATE UNIQUE INDEX uniq_nick_lower ON attempts ((lower(nick)));
      END IF;
    END$$;
  `;
}

export async function GET(request) {
  await ensureSchema();
  const { searchParams } = new URL(request.url);
  const nick = searchParams.get("nick");

  if (nick) {
    const key = nick.trim().toLowerCase();
    const { rows } = await sql`SELECT 1 FROM attempts WHERE lower(nick) = ${key} LIMIT 1`;
    return NextResponse.json({ exists: rows.length > 0 });
  }

  const { rows } = await sql`
    SELECT nick, correct, total, percentage, created_at AS date
    FROM attempts
    ORDER BY percentage DESC, correct DESC, created_at DESC
    LIMIT 100
  `;
  return NextResponse.json(rows);
}

export async function POST(request) {
  await ensureSchema();
  const body = await request.json().catch(() => ({}));
  const nick = (body.nick || "").trim();
  const correct = Number(body.correct);
  const total = Number(body.total);
  const percentage = Number(body.percentage);

  if (!nick) return NextResponse.json({ error: "Ник шаардлагатай" }, { status: 400 });
  if (!Number.isFinite(correct) || !Number.isFinite(total) || total <= 0)
    return NextResponse.json({ error: "Буруу оноо" }, { status: 400 });

  // Try insert, rely on unique index to prevent duplicates
  try {
    await sql`
      INSERT INTO attempts (nick, correct, total, percentage)
      VALUES (${nick}, ${correct}, ${total}, ${percentage})
    `;
  } catch (e) {
    // 23505 = unique_violation
    if (e && e.code === "23505") {
      return NextResponse.json({ error: "Энэ никнэймээр аль хэдийн өгсөн байна." }, { status: 409 });
    }
    throw e;
  }

  return NextResponse.json({ ok: true });
}
