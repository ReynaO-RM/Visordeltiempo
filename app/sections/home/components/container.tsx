"use client";

import { Place } from "@/app/data/places";
import {
  AppBar,
  Box,
  Container,
  Grid,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import HeaderAuth from "./header-auth";
import PlaceCard from "./place-card";
import ChatFloat from "../../buble-chat";

export default function HomeContainer() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [places, setPlaces] = React.useState<Place[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/places-card");
        if (!response.ok) {
          console.log("Error fetching places:", response.statusText);
          throw new Error("Error fetching places");
        }
        const result = await response.json();
        if (result.ok) {
          setPlaces(result.data);
        } else {
          throw new Error(result.error || "Error fetching places");
        }
      } catch (error) {
        console.error("Error fetching places:", error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
            Visor del Tiempo
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <HeaderAuth />
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lugares destacados en Hidalgo
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Explora algunos de los destinos más fascinantes que Hidalgo tiene para
          ofrecer.
        </Typography>
        <Grid container spacing={2}>
          {loading && (
            <>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <Grid key={n} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    sx={{ borderRadius: 3 }}
                    animation="wave"
                  />
                </Grid>
              ))}
            </>
          )}
          {error && (
            <Typography color="error">
              Ocurrió un error al cargar los lugares: {error}
            </Typography>
          )}

          {places.map((p) => (
            <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <PlaceCard place={p} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <ChatFloat bottom={20} right={20} />
    </Box>
  );
}
