import PlaceDetailDemo from "./components/place-detail";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { detailPlaces } from "@/app/data/places"; // Record<string, PlaceDetail>

type Params = { slug: string };

// Dinámica: usa el título del lugar
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params; // 👈 desempaquetar
  const place = detailPlaces[slug];

  if (!place) {
    return {
      title: "Lugar no encontrado | Visita",
      description: "No existe el lugar.",
    };
  }
  return {
    title: `Visita - ${place.title}`,
    description: place.description ?? "Descubre este lugar.",
  };
}

export default async function Page({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const { slug } = await params;
  const placeData = detailPlaces[slug];
  if (!placeData) {
    notFound();
  }
  return <PlaceDetailDemo placeData={placeData} />;
}
