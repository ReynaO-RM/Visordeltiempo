import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

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

    // obtener promedio de calificaciones y total de reseñas
    const stats = await prisma.reviews.aggregate({
      where: { placeId: place?.id },
      _avg: { rating: true },
      _count: { id: true },
    });

    // truncar promedio a 2 decimales
    if (stats._avg.rating !== null) {
      stats._avg.rating = parseFloat(stats._avg.rating.toFixed(2));
    }

    return NextResponse.json(
      { ok: true, promedio: stats._avg.rating, total: stats._count.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching stats:", error);
    return new Response("Error fetching stats", { status: 500 });
  }
};
