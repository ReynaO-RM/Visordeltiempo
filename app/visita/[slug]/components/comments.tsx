import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

interface Comment {
  id: number;
  placeId: number;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

interface CommentsProps {
  comments: Comment[];
  loading?: boolean;
}

function initials(name?: string) {
  const p = (name ?? "U").trim().split(/\s+/);
  return ((p[0]?.[0] ?? "U") + (p[1]?.[0] ?? "")).toUpperCase();
}

const Comments = ({ comments, loading }: CommentsProps) => {
  return (
    <Card variant="outlined" sx={{ mb: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Opiniones
        </Typography>

        {loading && (
          <>
            <CircularProgress size={24} />
            <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>
              Cargando comentarios...
            </Typography>
          </>
        )}

        <Stack divider={<Divider flexItem />} spacing={2}>
          {comments.map((c: Comment) => (
            <Stack
              key={c.id}
              direction="row"
              spacing={2}
              alignItems="flex-start"
              py={1}
            >
              <Avatar>{initials(c.user.name)}</Avatar>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography fontWeight={700}>{c.user.name}</Typography>
                  <Rating
                    value={c.rating}
                    readOnly
                    precision={0.5}
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(c.createdAt).toLocaleDateString("es-MX")}
                  </Typography>
                </Stack>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {c.comment}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Comments;
