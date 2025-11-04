"use client";

import * as React from "react";
import Link from "next/link";
import { Fab, Tooltip, Badge, SxProps } from "@mui/material";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";

type ChatFloatProps = {
  href?: string; // default: "/chat"
  label?: string; // tooltip
  bottom?: number; // px extra desde abajo
  right?: number; // px extra desde la derecha
  unreadCount?: number; // opcional: para mostrar badge
  sx?: SxProps; // estilos extra
};

export default function ChatFloat({
  href = "/chat",
  label = "Abrir chat",
  bottom = 16,
  right = 16,
  unreadCount,
  sx,
}: ChatFloatProps) {
  // Safe-area padding para móviles (iOS notch)
  const safeAreaBottom = "env(safe-area-inset-bottom, 0px)";
  const safeAreaRight = "env(safe-area-inset-right, 0px)";

  return (
    <Tooltip title={label} placement="left">
      <Fab
        component={Link}
        href={href}
        color="primary"
        aria-label="abrir chat"
        sx={{
          position: "fixed",
          zIndex: (t) => t.zIndex.tooltip + 1,
          right: `calc(${right}px + ${safeAreaRight})`,
          bottom: `calc(${bottom}px + ${safeAreaBottom})`,
          boxShadow: 6,
          // Responsive: más pequeño en xs
          width: { xs: 52, sm: 56 },
          height: { xs: 52, sm: 56 },
          ...sx,
        }}
      >
        {typeof unreadCount === "number" ? (
          <Badge
            color="error"
            badgeContent={unreadCount > 99 ? "99+" : unreadCount}
            overlap="circular"
          >
            <ChatRoundedIcon />
          </Badge>
        ) : (
          <ChatRoundedIcon />
        )}
      </Fab>
    </Tooltip>
  );
}
