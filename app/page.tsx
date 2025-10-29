import HomeContainer from "./sections/home/components/container";

export async function generateMetadata() {
  return {
    title: "Visor del Tiempo",
    description: "Explora los mejores lugares para visitar en Hidalgo.",
  };
}

export default function Home() {
  return <HomeContainer />;
}
