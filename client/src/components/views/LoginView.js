import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/users";
import ErrorAlert from "../ErrorAlert";
import { loginUser } from "../../helpers/authHelper";
import Copyright from "../Copyright";
import logo from '../logo/logo.png';

const LoginView = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login(formData);
    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #6e45e2 30%, #88d3ce 100%)",
        padding: 0,
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", md: "50%" },
          padding: { xs: 2, md: 4 },
          boxShadow: 5,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Stack alignItems="center">
          <img src={logo} alt="Stumnio Logo" style={{ width: "150px", marginBottom: "20px" }} />
          <Typography variant="h5" gutterBottom color="text.secondary">
            Login
          </Typography>
          <Typography color="text.secondary">
            Don't have an account yet? <Link to="/signup" style={{ color: "#6e45e2", fontWeight: "bold" }}>Sign Up</Link>
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              label="Email Address"
              fullWidth
              margin="normal"
              autoComplete="email"
              autoFocus
              required
              id="email"
              name="email"
              onChange={handleChange}
              sx={{
                "& .MuiInputBase-root": {
                  color: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "#6e45e2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#6e45e2",
                  },
                },
              }}
            />
            <TextField
              label="Password"
              fullWidth
              required
              margin="normal"
              id="password"
              name="password"
              onChange={handleChange}
              type="password"
              sx={{
                "& .MuiInputBase-root": {
                  color: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "#6e45e2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#6e45e2",
                  },
                },
              }}
            />
            <ErrorAlert error={serverError} />
            <Button type="submit" fullWidth variant="contained" sx={{ my: 2, backgroundColor: "#6e45e2", color: "white", "&:hover": { backgroundColor: "#563bd1" } }}>
              Login
            </Button>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Copyright />
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default LoginView;
