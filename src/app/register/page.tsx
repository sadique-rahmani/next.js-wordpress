"use client";

import { useState } from "react";

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
import axiosClient from "@/utils/axiosClient";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({}));

const schema = yup.object().shape({
  firstname: yup.string().required("Required"),
  lastname: yup.string().required("Required"),
  email: yup.string().email().required("Required"),
  password: yup
    .string()
    .required("Required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/,
      "Must Contain 7 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirm_password: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

interface PayloadType {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export default function Register() {
  // ** State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle Confirm Password
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // useEffect(() => {
  //   if (!session) return;

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [session]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: PayloadType) => {
    const { firstname, lastname, email, password } = data;

    try {
      const response = await axiosClient.post("/wp-json/v1/register", {
        username: `${firstname} ${lastname}`,
        email,
        password,
        first_name: firstname,
        last_name: lastname,
      });

      if (response.status === 200) {
        toast.success(response.data.message);

        router.push("/login");
      }
    } catch (error) {
      console.error("Login failed", error);
      const err = error as AxiosError<any, any>;

      toast.error(err?.response?.data.message);
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
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Register
          </Typography>

          <Typography variant="body2">Enter Your Account Details</Typography>
        </Box>

        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Controller
              name="firstname"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  label="First Name"
                  onChange={onChange}
                  placeholder="John"
                  error={Boolean(errors.firstname)}
                  helperText={errors.firstname?.message}
                />
              )}
            />

            <Controller
              name="lastname"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  label="Last Name"
                  onChange={onChange}
                  placeholder="Doe"
                  error={Boolean(errors.lastname)}
                  helperText={errors.lastname?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  label="Email"
                  onChange={onChange}
                  placeholder="abc@example.com"
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  fullWidth
                  label="Password"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder="Enter Password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={handleShowPassword}>
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

            <Controller
              name="confirm_password"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  fullWidth
                  label="Confirm Password"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleShowConfirmPassword}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOutlined />
                          ) : (
                            <VisibilityOffOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors.confirm_password)}
                  helperText={errors.confirm_password?.message}
                />
              )}
            />

            <Button fullWidth type="submit" variant="contained">
              Register
            </Button>
          </Stack>
        </form>
      </Card>
    </Box>
  );
}
