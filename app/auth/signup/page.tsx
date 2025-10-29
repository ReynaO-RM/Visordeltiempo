import RegisterPage from "./components/sign-up-container";

export async function generateMetadata() {
  return {
    title: "Crear cuenta | Visor del Tiempo",
    description: "Regístrate para opinar y calificar lugares.",
  };
}

export default function SignInPage() {
  return <RegisterPage />;
}
