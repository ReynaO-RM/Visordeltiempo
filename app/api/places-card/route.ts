import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Traer todos los lugares básicos
    const places = await prisma.places.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        subtitle: true,
        city: true,
        coverUrl: true,
        description: true,
      },
    });

    // Mapear cada lugar y obtener stats agregados en paralelo
    const placesWithStats = await Promise.all(
      places.map(async (place: any) => {
        const stats = await prisma.reviews.aggregate({
          where: { placeId: place.id },
          _avg: { rating: true },
          _count: { id: true },
        });

        const promedio = stats._avg.rating
          ? parseFloat(stats._avg.rating.toFixed(2))
          : 0;
        const total = stats._count.id;

        return {
          ...place,
          stats: {
            promedio,
            total,
          },
        };
      })
    );

    return NextResponse.json(
      {
        ok: true,
        data: placesWithStats,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching places:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Error interno del servidor",
      },
      { status: 500 }
    );
  }
};
