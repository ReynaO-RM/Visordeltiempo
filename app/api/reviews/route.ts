// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { rating, text, slug, userId } = body || {};

    console.log("Received review data:", { rating, text, slug, userId });

    if (!rating || !text || !slug || !userId) {
      return NextResponse.json(
        { ok: false, error: "Rating, text, slug y userId son requeridos" },
        { status: 400 }
      );
    }

    // encontar el place por slug (opcional, si quieres validar que el lugar existe)
    const place = await prisma.places.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!place) {
      return NextResponse.json(
        { ok: false, error: "Lugar no encontrado" },
        { status: 404 }
      );
    }

    const review = await prisma.reviews.create({
      data: { placeId: place.id, userId, rating, comment: text },
    });

    return NextResponse.json({ ok: true, review }, { status: 201 });
  } catch {
    console.log("fallo");
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { ok: false, error: "Slug es requerido" },
        { status: 400 }
      );
    }

    const place = await prisma.places.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!place) {
      return NextResponse.json(
        { ok: false, error: "Lugar no encontrado" },
        { status: 404 }
      );
    }

    const reviews = await prisma.reviews.findMany({
      where: { placeId: place.id },
      include: { user: { select: { name: true, email: true } } },
    });

    return NextResponse.json({ ok: true, reviews }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
};
