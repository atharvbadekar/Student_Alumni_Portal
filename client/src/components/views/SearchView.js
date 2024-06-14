import { Container, Stack, Card } from "@mui/material";
import React from "react";
import GoBack from "../GoBack";
import GridLayout from "../GridLayout";
import Navbar from "../Navbar";
import PostBrowser from "../PostBrowser";
import Sidebar from "../Sidebar";

const SearchView = () => {
  return (
    <Container
      sx={{
        backgroundColor: "#FFE0B2", // Light orange
        minHeight: "100vh",
        padding: 0,
      }}
    >
      <Navbar />
      <GridLayout
        left={
          <Stack spacing={2}>
            <Card
              sx={{
                backgroundColor: "#E0F7FA", // Light cyan
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <PostBrowser createPost contentType="posts" />
            </Card>
          </Stack>
        }
        right={
          <Card
            sx={{
              backgroundColor: "#C5E1A5", // Light green
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <Sidebar />
          </Card>
        }
        sx={{
          padding: "20px",
        }}
      />
    </Container>
  );
};

export default SearchView;
