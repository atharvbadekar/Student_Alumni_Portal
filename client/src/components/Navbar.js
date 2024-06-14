import { useTheme } from "@emotion/react";
import {
  Avatar,
  IconButton,
  Stack,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch, AiFillHome, AiFillMessage } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../helpers/authHelper";
import UserAvatar from "./UserAvatar";
import logo from "./logo/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const theme = useTheme();
  const username = user && isLoggedIn().username;
  const [search, setSearch] = useState("");
  const [searchIcon, setSearchIcon] = useState(false);
  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const mobile = width < 500;
  const navbarWidth = width < 600;

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const handleLogout = async () => {
    logoutUser();
    navigate("/login");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search?" + new URLSearchParams({ search }));
  };

  const handleSearchIcon = () => {
    setSearchIcon(!searchIcon);
  };

  return (
    <Stack mb={2}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pt: 2,
          pb: 5,
          borderBottom: "0px solid black",
          padding: "10px",
        }}
        spacing={!mobile ? 2 : 0}
      >
        <Box>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img src={logo} alt="Your Logo" style={{ width: "100px", height: "auto" }} />
          </Link>
        </Box>

        {!navbarWidth && (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              size="small"
              label="Search posts..."
              sx={{ flexGrow: 1, maxWidth: 300 }}
              onChange={handleChange}
              value={search}
            />
          </Box>
        )}

        <Stack direction="row" spacing={1}>
          {mobile && (
            <IconButton onClick={handleSearchIcon}>
              <AiOutlineSearch />
            </IconButton>
          )}

          <IconButton component={Link} to={"/"} sx={{ color: theme.palette.primary.main }}>
            <AiFillHome />
          </IconButton>
          {user ? (
            <>
              <IconButton component={Link} to={"/messenger"} sx={{ color: theme.palette.primary.main }}>
                <AiFillMessage />
              </IconButton>
              <IconButton component={Link} to={"/users/" + username} sx={{ color: theme.palette.primary.main }}>
                <UserAvatar width={30} height={30} username={user.username} />
              </IconButton>
              <Button onClick={handleLogout} sx={{ color: theme.palette.primary.main }}>Logout</Button>
            </>
          ) : (
            <>
              <Button variant="text" sx={{ minWidth: 80 }} href="/signup">Sign Up</Button>
              <Button variant="text" sx={{ minWidth: 65 }} href="/login">Login</Button>
            </>
          )}
        </Stack>
      </Stack>
      {navbarWidth && searchIcon && (
        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <TextField
            size="small"
            label="Search posts..."
            fullWidth
            onChange={handleChange}
            value={search}
          />
        </Box>
      )}
    </Stack>
  );
};

export default Navbar;
