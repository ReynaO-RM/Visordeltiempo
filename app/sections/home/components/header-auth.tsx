"use client";

import { LogoutRounded } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function initials(name?: string | null, email?: string | null) {
  if (name && name.trim()) {
    const p = name.trim().split("");
    return (p[0]?.toUpperCase() ?? "") + (p[1]?.toUpperCase() ?? "");
  }
  const id = (email ?? "U").split("@")[0];
  return id.slice(0, 2).toUpperCase();
}

export default function HeaderAuth() {
  const { data } = useSession();
  const user = data?.user;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if (!user) {
    return <Link href="/auth/signin">Iniciar sesión</Link>;
  }

  return (
    <>
      <Tooltip title={user.email ?? ""}>
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          size="small"
          sx={{ ml: 2 }}
        >
          <Avatar sx={{ width: 36, height: 36 }}>
            {initials(user.name, user.email)}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem disabled>
          <ListItemText
            primary={user.name ?? user.email}
            secondary="Sesión activa"
          />
        </MenuItem>
        <MenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          <ListItemIcon>
            <LogoutRounded fontSize="small" />
            Cerrar sesión
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </>
  );
}
