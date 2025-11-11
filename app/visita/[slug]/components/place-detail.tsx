"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Rating,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Toolbar,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useParams } from "next/navigation";
import { PlaceDetail } from "@/app/data/places";
import HeaderAuth from "@/app/sections/home/components/header-auth";
import { useSession } from "next-auth/react";
import ReviewForm from "./review-form";
import Comments from "./comments";
import ThreeModelViewer from "./three-model-viewer";
import ChatFloat from "@/app/sections/buble-chat";

interface PlaceDetailProps {
  placeData: PlaceDetail;
}

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

export default function PlaceDetailDemo({ placeData }: PlaceDetailProps) {
  const params = useParams();
  const rawSlug = params.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  const { data } = useSession();
  const user = data?.user;
  const isLogged = !!user;

  const [comments, setComments] = React.useState<Comment[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [stats, setStats] = React.useState<{
    promedio: number | null;
    total: number;
  } | null>(null);

  const fetchComments = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/reviews?slug=${slug}`, {
        cache: "no-store",
      });
      const data = await res.json();
      setComments(Array.isArray(data.reviews) ? data.reviews : []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const fetchStats = React.useCallback(async () => {
    try {
      const res = await fetch(`/api/stats?slug=${slug}`, { cache: "no-store" });
      const data = await res.json();
      if (data.ok) {
        setStats({ promedio: data.promedio, total: data.total });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      setStats(null);
    }
  }, [slug]);

  React.useEffect(() => {
    fetchComments();
    fetchStats();
  }, [fetchComments, fetchStats]);

  if (!slug) {
    // Si no hay slug válido, mostramos un fallback simple
    return (
      <Box>
        <AppBar
          position="sticky"
          color="inherit"
          elevation={0}
          sx={{ borderBottom: "1px solid", borderColor: "divider" }}
        >
          <Toolbar>
            <Typography variant="h6" fontWeight={700}>
              <Link href="/">Visor del Tiempo</Link>
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <HeaderAuth />
          </Toolbar>
        </AppBar>

        <Container sx={{ py: 3 }}>
          <Typography variant="h6">Lugar no encontrado</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box>
      {/* AppBar simple */}
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid", borderColor: "divider" }}
      >
        <Toolbar>
          <Box component={"img"} src="/Logo.webp" height={40} />
          <Box sx={{ flexGrow: 1 }} />
          <HeaderAuth />
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 3 }}>
        {/* Título + acciones */}
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="h4" fontWeight={800} lineHeight={1.2}>
            {placeData.title}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body1" fontWeight={600}>
              {stats?.promedio
                ? stats.promedio.toFixed(1)
                : "Sin calificaciones"}
            </Typography>
            <Rating value={stats?.promedio ?? 0} readOnly precision={0.5} />
            <Button size="small" variant="text">
              ({stats?.total ?? 0} opinión
              {stats?.total === 1 ? "" : "es"})
            </Button>
            <Chip label={placeData.city} size="small" variant="outlined" />
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" spacing={1}></Stack>
          </Stack>
        </Stack>

        {/* Galería estilo collage */}
        <Grid container spacing={1.5} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              sx={{
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                pt: "56.5%",
              }}
            >
              <Image
                src={placeData.photos[0]}
                alt={placeData.title}
                fill
                sizes="(max-width: 900px) 100vw, 66vw"
                style={{ objectFit: "cover" }}
                priority
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={1.5} sx={{ height: "100%" }}>
              {[placeData.photos[1], placeData.photos[2]].map((p, idx) => (
                <Box
                  key={idx}
                  sx={{
                    position: "relative",
                    borderRadius: 2,
                    overflow: "hidden",
                    flex: 1,
                    minHeight: 160,
                  }}
                >
                  <Image
                    src={p}
                    alt={`${placeData.title} ${idx + 2}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Acerca de */}
        <Card variant="outlined" sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Acerca de
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {placeData.about}
            </Typography>
          </CardContent>
        </Card>

        {/* Acordeones: horarios, servicios, recomendaciones */}
        <Stack spacing={1.5} sx={{ mb: 3 }}>
          <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
              <Typography fontWeight={700}>Horarios</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                {placeData.extras.horarios}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
              <Typography fontWeight={700}>Servicios incluidos</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                {placeData.extras.servicios}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
              <Typography fontWeight={700}>Recomendaciones</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                {placeData.extras.recomendaciones}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Stack>

        {/* Mapa */}
        <Card
          variant="outlined"
          sx={{ mb: 3, borderRadius: 3, overflow: "hidden" }}
        >
          <CardContent sx={{ pb: 0 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Ubicación
            </Typography>
          </CardContent>
          <Box sx={{ width: "100%", height: { xs: 280, md: 380 } }}>
            <iframe
              title="Mapa"
              src={placeData.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
        </Card>

        {placeData.model && (
          <Card
            variant="outlined"
            sx={{ mb: 3, borderRadius: 3, overflow: "hidden" }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Modelo 3D interactivo
              </Typography>
              <ThreeModelViewer url={placeData.model} />
            </CardContent>
          </Card>
        )}

        {/* Comentarios */}
        <Comments comments={comments} loading={loading} />

        {/* Calificar */}
        <Card variant="outlined" sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Calificar y opinar
            </Typography>

            {!isLogged ? (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "stretch", sm: "center" }}
                justifyContent="space-between"
              >
                <Typography color="text.secondary">
                  Inicia sesión para dejar tu calificación y comentario.
                </Typography>
                <Button
                  component={Link}
                  href="/auth/signin"
                  variant="contained"
                >
                  Iniciar sesión
                </Button>
              </Stack>
            ) : (
              <ReviewForm slug={slug} refetchComments={fetchComments} />
            )}
          </CardContent>
        </Card>

        <Box sx={{ height: 24 }} />
      </Container>
      <ChatFloat bottom={20} right={20} />
    </Box>
  );
}
