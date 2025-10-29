"use client";

import React from "react";
import {
  Box,
  Button,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

interface ReviewFormProps {
  slug: string;
  refetchComments?: () => void;
}

const ReviewForm = ({ slug, refetchComments }: ReviewFormProps) => {
  const { data } = useSession();
  const [rating, setRating] = React.useState<number | null>(5);
  const [text, setText] = React.useState("");

  const userId = React.useMemo<string | null>(
    () => (data?.user as any)?.id ?? null,
    [data]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, text, slug, userId }),
      });

      if (!response.ok) throw new Error("Error al enviar la opinión");
      toast.success("Opinión enviada con éxito");
      setText("");
      setRating(5);
      refetchComments?.();
    } catch (error: any) {
      console.error("Error al enviar la opinión:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Toaster />
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography width={88}>Tu rating</Typography>
          <Rating
            value={rating}
            onChange={(_, v) => setRating(v)}
            precision={1}
            size="large"
          />
        </Stack>

        <TextField
          label="Tu opinión"
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          minRows={3}
          placeholder="¿Qué te gustó o no te gustó?"
          fullWidth
        />

        <Stack direction="row" justifyContent="flex-end">
          <Button type="submit" variant="contained" disabled={!userId}>
            Enviar
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ReviewForm;
