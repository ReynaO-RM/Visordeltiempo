"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  IconButton,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Place } from "@/app/data/places";

type Props = { place: Place };

export default function PlaceCard({ place }: Props) {
  const [fav, setFav] = React.useState(false);

  return (
    <Card
      variant="outlined"
      sx={(t) => ({
        borderRadius: 3,
        overflow: "hidden",
        transition: t.transitions.create(["transform", "box-shadow"]),
        "&:hover": { transform: "translateY(-2px)", boxShadow: t.shadows[4] },
      })}
    >
      <CardActionArea
        component={Link}
        href={`/visita/${place.slug}`}
        sx={{ alignItems: "stretch" }}
      >
        {/* Cover con overlay y botón "favorito" */}
        <Box sx={{ position: "relative", pt: "66.66%" /* 3:2 */ }}>
          <Image
            src={place.coverUrl}
            alt={place.title}
            fill
            sizes="(max-width: 600px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            priority={false}
          />

          {/* Esquina superior derecha: favorito */}
          <Box sx={{ position: "absolute", top: 8, right: 8 }}>
            <Tooltip title={fav ? "Quitar de favoritos" : "Guardar"}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  setFav((s) => !s);
                }}
                sx={{
                  bgcolor: "common.white",
                  "&:hover": { bgcolor: "grey.100" },
                  boxShadow: 1,
                }}
              >
                {fav ? (
                  <FavoriteRoundedIcon fontSize="small" color="error" />
                ) : (
                  <FavoriteBorderRoundedIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Contenido */}
        <CardContent sx={{ pb: 2 }}>
          <Stack spacing={0.5}>
            <Typography variant="subtitle1" fontWeight={700} lineHeight={1.25}>
              {place.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {place.subtitle}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mt: 1 }}
            >
              <Rating
                name="read-only"
                value={place.stats.promedio}
                precision={0.5}
                readOnly
                size="small"
              />
              <Typography variant="body2" color="text.secondary">
                {place.stats.promedio.toFixed(1)} ·{" "}
                {Intl.NumberFormat("es-MX").format(place.stats.total)}
              </Typography>
            </Stack>

            {place.city && (
              <Chip
                label={place.city}
                size="small"
                variant="outlined"
                sx={{ width: "fit-content", mt: 1 }}
              />
            )}

            {place.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {place.description}
              </Typography>
            )}
          </Stack>
        </CardContent>

        {/* Flecha decorativa al estilo del ejemplo */}
        <Box
          sx={(t) => ({
            position: "absolute",
            right: 12,
            bottom: 12,
            width: 32,
            height: 32,
            borderRadius: 16,
            display: "grid",
            placeItems: "center",
            bgcolor: "background.paper",
            boxShadow: t.shadows[2],
          })}
        >
          <ArrowForwardIosRoundedIcon fontSize="small" />
        </Box>
      </CardActionArea>
    </Card>
  );
}
