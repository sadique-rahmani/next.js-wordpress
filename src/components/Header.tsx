"use client";

import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Box, Button, Stack } from "@mui/material";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux-store/reduxhooks";
import { setUser } from "@/redux-store/userReducer";
import { usePathname, useRouter } from "next/navigation";

const navItems = ["login", "register"];

export default function Header() {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    dispatch(
      setUser({
        isAuthenticated: false,
        userData: null,
      })
    );

    router.push("/login");
  };

  if (!isMounted) {
    return null; // Or return a loading indicator
  }

  return (
    <AppBar component="nav">
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <Box>
          {isAuthenticated ? (
            <Button
              color="info"
              variant="contained"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: "#fff" }}
                component={Link}
                href={`/${item}`}
              >
                {item}
              </Button>
            ))
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
