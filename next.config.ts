import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.travesiasdigital.com",
      },
      {
        protocol: "https",
        hostname: "cdn.milenio.com",
      },
      {
        protocol: "https",
        hostname: "www.muvipa.com.mx",
      },
      {
        protocol: "https",
        hostname: "www.guiahidalgo.com.mx",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "elsouvenir.com",
      },
      {
        protocol: "https",
        hostname: "escapadas.mexicodesconocido.com.mx",
      },
      {
        protocol: "https",
        hostname: "a.travel-assets.com",
      },
      {
        protocol: "https",
        hostname: "www.caminoreal.com",
      },
      {
        protocol: "https",
        hostname: "www.vamosaconocer.com",
      },
      {
        protocol: "https",
        hostname: "dynamic-media-cdn.tripadvisor.com",
      },
      {
        protocol: "https",
        hostname: "programadestinosmexico.com",
      },
      {
        protocol: "https",
        hostname: "dynamic-media-cdn.tripadvisor.com",
      },
      {
        protocol: "https",
        hostname: "imagenes.eleconomista.com.mx",
      },
    ],
  },
};

export default nextConfig;
