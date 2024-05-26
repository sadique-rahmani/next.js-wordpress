"use client";

import { useAppSelector } from "@/redux-store/reduxhooks";
import { Box, Card, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { userData } = useAppSelector((state) => state.user);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "inherit",
      }}
    >
      <Card
        sx={{
          p: 3,
          width: 480,
          boxShadow: "0px 2px 20px 0px rgba(58, 53, 65, 0.1)",
        }}
      >
        <Stack spacing={2} sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e88e5" }}>
            Hi, Welcome back 😊
          </Typography>

          <Typography variant="h5">
            {userData?.first_name} {userData?.last_name}
          </Typography>

          <Typography variant="subtitle1">{userData?.user_email}</Typography>
        </Stack>
      </Card>
    </Box>
  );
}
