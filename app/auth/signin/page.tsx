import LoginPage from "@/app/sections/sign-in/sign-in-container";

export async function generateMetadata() {
  return {
    title: "Login | Visor del Tiempo",
    description: "Explora los mejores lugares para visitar en Hidalgo.",
  };
}

export default function SignInPage() {
  return <LoginPage />;
}
