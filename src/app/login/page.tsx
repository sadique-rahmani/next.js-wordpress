"use client";

import React, { useEffect, useState } from "react";

import {
  Box,
  Card as MuiCard,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  styled,
  CardProps,
  Stack,
} from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "@/redux-store/reduxhooks";
import { setUser } from "@/redux-store/userReducer";
import axiosClient from "@/utils/axiosClient";
import { toast } from "react-toastify";

//--------//
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({}));

const schema = yup.object().shape({
  email: yup.string().email().required("Required"),
  password: yup.string().required("Required"),
});

const Login = () => {
  // ** State
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    const { email, password } = data;

    try {
      const response = await axiosClient.post("/wp-json/jwt-auth/v1/token", {
        username: email,
        password,
      });

      if (response.status === 200) {
        toast.success("Login Successfully!");

        const { token, user_email, user_display_name, first_name, last_name } =
          response.data;

        localStorage.setItem("token", token);

        dispatch(
          setUser({
            isAuthenticated: true,
            userData: { user_email, user_display_name, first_name, last_name },
          })
        );

        router.push("/home");
      }
    } catch (error) {
      console.error("Login failed!", error);

      toast.error("Login Failed");
    }
  };

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
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Box sx={{ mb: 4, textAlign: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Login
              </Typography>

              <Typography variant="body2">Enter Your Credentials</Typography>
            </Box>

            <Controller
              name="email"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  autoFocus
                  label="Email"
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  placeholder="abc@example.com"
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label="Password"
                  value={value}
                  onChange={onChange}
                  placeholder="Enter Password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? (
                            <VisibilityOutlined />
                          ) : (
                            <VisibilityOffOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Button fullWidth type="submit" variant="contained">
              Login
            </Button>
          </Stack>

          {/* <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ mr: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>
                <LinkStyled passHref href='/auth/register'>
                  Create an account
                </LinkStyled>
              </Typography>
            </Box> */}
        </form>
      </Card>
    </Box>
  );
};

export default Login;
