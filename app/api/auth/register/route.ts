// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json(
        { ok: false, error: "Ya existe una cuenta con ese email" },
        { status: 409 }
      );
    }

    const user = await prisma.user.create({
      data: { name: name ?? null, email, password: password },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    return NextResponse.json({ ok: true, user }, { status: 201 });
  } catch (err) {
    console.error("Error creating user:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
};
