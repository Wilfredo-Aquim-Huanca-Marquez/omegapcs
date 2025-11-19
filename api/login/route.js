import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { usuario, password } = await req.json();

    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE usuario = ? AND password = ?",
      [usuario, password]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    return NextResponse.json({ ok: true, rol: rows[0].rol });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
