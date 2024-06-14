import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { signup } from "../../api/users";
import { loginUser } from "../../helpers/authHelper";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import { isLength, isEmail } from "validator";
import logo from '../logo/logo.png';

const SignupView = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    yearOfPassOut: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length !== 0) return;

    const data = await signup(formData);

    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
  };

  const validate = () => {
    const errors = {};

    if (!isLength(formData.username, { min: 6, max: 30 })) {
      errors.username = "Must be between 6 and 30 characters long";
    }

    if (!isLength(formData.password, { min: 8 })) {
      errors.password = "Must be at least 8 characters long";
    }

    if (!isEmail(formData.email)) {
      errors.email = "Must be a valid email address";
    }

    setErrors(errors);

    return errors;
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
          width: { xs: "90%", md: "40%" },
          padding: { xs: 2, md: 4 },
          boxShadow: 5,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <img src={logo} alt="Stumnio Logo" style={{ width: "100px", marginBottom: "20px" }} />
          <Typography variant="h5" gutterBottom color="text.primary">
            Sign Up
          </Typography>
          <Typography color="text.secondary">
            Already have an account? <Link href="/login" sx={{ color: "#6e45e2", fontWeight: "bold" }}>Login</Link>
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <Stack spacing={2}>
              <TextField
                label="Name"
                fullWidth
                margin="dense"
                required
                id="name"
                name="name"
                onChange={handleChange}
                error={errors.name !== undefined}
                helperText={errors.name}
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
                label="Mobile Number"
                fullWidth
                margin="dense"
                required
                id="mobileNumber"
                name="mobileNumber"
                onChange={handleChange}
                error={errors.mobileNumber !== undefined}
                helperText={errors.mobileNumber}
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
                label="Year of Pass Out"
                fullWidth
                margin="dense"
                required
                id="yearOfPassOut"
                name="yearOfPassOut"
                onChange={handleChange}
                error={errors.yearOfPassOut !== undefined}
                helperText={errors.yearOfPassOut}
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
                label="Username"
                fullWidth
                margin="dense"
                required
                id="username"
                name="username"
                onChange={handleChange}
                error={errors.username !== undefined}
                helperText={errors.username}
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
                label="Email Address"
                fullWidth
                margin="dense"
                required
                id="email"
                name="email"
                onChange={handleChange}
                error={errors.email !== undefined}
                helperText={errors.email}
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
                margin="dense"
                required
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                error={errors.password !== undefined}
                helperText={errors.password}
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
            </Stack>
            <ErrorAlert error={serverError} />
            <Button type="submit" fullWidth variant="contained" sx={{ my: 2, backgroundColor: "#6e45e2", color: "white", "&:hover": { backgroundColor: "#563bd1" } }}>
              Sign Up
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default SignupView;
