"use client";
// src/app/register/page.tsx
import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Box,
  Card,
  Container,
  Divider,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import RegisterForm from "./register-form";

// export const metadata: Metadata = {
//   title: "Crear cuenta | Lugares",
//   description: "Regístrate para opinar y calificar lugares",
// };

export default function RegisterPage() {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        bgcolor: "background.default",
      }}
    >
      {/* Lado visual (imagen/hero) */}
      <Box
        sx={{
          position: "relative",
          display: { xs: "none", md: "block" },
          overflow: "hidden",
          bgcolor: "linear-gradient(135deg, #111 0%, #333 100%)",
        }}
      >
        {/* Fondo gradiente sutil */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(800px 400px at -10% 10%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%), radial-gradient(600px 300px at 110% 90%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%), linear-gradient(135deg, #0b0f14, #111827)",
          }}
        />

        {/* Imagen con overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              backdropFilter: "blur(2px)",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 100%)",
            },
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop"
            alt="Paisaje de ciudad"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </Box>

        {/* Copy del hero */}
        <Container
          maxWidth="md"
          sx={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            pb: 8,
          }}
        >
          <Stack spacing={1} sx={{ color: "common.white" }}>
            <Typography variant="h3" fontWeight={700}>
              Comparte tu experiencia.
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Califica y deja tu opinión de tus lugares favoritos.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Lado del formulario */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, sm: 3 },
          py: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="sm">
          {/* Header compacto */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              <Button startIcon={<ChevronLeftRoundedIcon />} variant="text">
                Inicio
              </Button>
            </Link>

            <Link href="/auth/signin" style={{ textDecoration: "none" }}>
              <Button variant="outlined">Iniciar sesión</Button>
            </Link>
          </Stack>

          <Card
            elevation={0}
            sx={(theme) => ({
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: theme.shadows[1],
              backdropFilter: "blur(6px)",
            })}
          >
            {/* Logo + título */}
            <Stack spacing={1.5} sx={{ mb: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1.5,
                    bgcolor: "primary.main",
                  }}
                />
                <Typography variant="h6" fontWeight={700}>
                  Visor del tiempo
                </Typography>
              </Stack>
              <Typography variant="h4" fontWeight={700}>
                Crear cuenta
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Regístrate para poder calificar y escribir opiniones.
              </Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Formulario */}
            <RegisterForm />

            <Divider sx={{ my: 2 }} />

            {/* CTA secundaria */}
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              ¿Ya tienes cuenta?{" "}
              <Link href="/auth/signin" style={{ textDecoration: "underline" }}>
                Inicia sesión
              </Link>
            </Typography>
          </Card>

          {/* Footer peque */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", textAlign: "center", mt: 3 }}
          >
            Al registrarte, aceptas nuestros Términos y la Política de
            Privacidad.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
