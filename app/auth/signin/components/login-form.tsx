"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { Alert, Button, Stack, TextField } from "@mui/material";

export default function LoginForm({
  callbackUrl = "/",
}: {
  callbackUrl?: string;
}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });
    setLoading(false);

    if (res?.ok) {
      // redirige manualmente para mantener control visual
      window.location.href = callbackUrl;
    } else {
      setMsg("Usuario o contraseña inválidos");
    }
  };

  return (
    <Stack component="form" onSubmit={onSubmit} spacing={2}>
      {msg && <Alert severity="error">{msg}</Alert>}

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        required
        fullWidth
      />

      <TextField
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        required
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disableElevation
        disabled={loading}
      >
        {loading ? "Entrando…" : "Entrar"}
      </Button>
    </Stack>
  );
}
