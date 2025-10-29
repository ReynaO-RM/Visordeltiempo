"use client";

import * as React from "react";
import { z } from "zod";
import {
  Box,
  Stack,
  Alert,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type RegisterResponse =
  | { ok: true; user: { id: string; email: string; name?: string | null } }
  | { ok: false; error: string };

const schema = z.object({
  name: z.string().trim().max(80).optional(),
  email: z.string().trim().email("Email inválido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(72, "Máximo 72 caracteres"),
});

export default function RegisterForm({
  onSuccess,
  redirectTo = "/login",
}: {
  onSuccess?: (email: string) => void;
  /** A dónde redirigir tras registro exitoso (por defecto /login) */
  redirectTo?: string;
}) {
  const [values, setValues] = React.useState<{
    name?: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });
  const [showPwd, setShowPwd] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>(
    {}
  );

  const handleChange =
    (key: "name" | "email" | "password") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setFieldErrors((fe) => ({ ...fe, [key]: "" })); // limpia error puntual
    };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setFieldErrors({});

    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      // mapea errores
      const fe: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path[0] as string;
        fe[path] = issue.message;
      }
      setFieldErrors(fe);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as RegisterResponse;

      if (!data.ok) {
        setErrorMsg(data.error || "No se pudo crear la cuenta");
        return;
      }

      setSuccessMsg("Cuenta creada. Redirigiendo a inicio de sesión…");
      onSuccess?.(data.user.email);
      // Redirige suave tras un pequeño delay
      setTimeout(() => {
        window.location.href = redirectTo;
      }, 800);
    } catch (err) {
      setErrorMsg("Error de red: intenta de nuevo.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 420,
        mx: "auto",
        p: { xs: 2, sm: 3 },
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h5" fontWeight={600}>
          Crear cuenta
        </Typography>

        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        {!!successMsg && <Alert severity="success">{successMsg}</Alert>}

        <TextField
          label="Nombre (opcional)"
          value={values.name ?? ""}
          onChange={handleChange("name")}
          disabled={loading}
          inputProps={{ maxLength: 80 }}
          helperText={fieldErrors.name || " "}
          error={Boolean(fieldErrors.name)}
          fullWidth
        />

        <TextField
          label="Email"
          value={values.email}
          onChange={handleChange("email")}
          type="email"
          autoComplete="email"
          disabled={loading}
          helperText={fieldErrors.email || " "}
          error={Boolean(fieldErrors.email)}
          fullWidth
          required
        />

        <TextField
          label="Contraseña"
          value={values.password}
          onChange={handleChange("password")}
          type={showPwd ? "text" : "password"}
          autoComplete="new-password"
          disabled={loading}
          helperText={fieldErrors.password || "Mínimo 8 caracteres"}
          error={Boolean(fieldErrors.password)}
          fullWidth
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPwd ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  onClick={() => setShowPwd((s) => !s)}
                  edge="end"
                >
                  {showPwd ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disableElevation
          disabled={loading}
        >
          {loading ? "Creando…" : "Crear cuenta"}
        </Button>

        <Typography variant="body2" color="text.secondary">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </Typography>
      </Stack>
    </Box>
  );
}
