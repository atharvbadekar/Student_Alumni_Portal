import { Card, Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getPosts } from "../../api/posts";
import { isLoggedIn } from "../../helpers/authHelper";
import CreatePost from "../CreatePost";
import GridLayout from "../GridLayout";
import Loading from "../Loading";
import Navbar from "../Navbar";
import SortBySelect from "../SortBySelect";
import PostCard from "../PostCard";
import Sidebar from "../Sidebar";
import HorizontalStack from "../util/HorizontalStack";
import PostBrowser from "../PostBrowser";

const ExploreView = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#ffe0b2",
        padding: 0,
      }}
    >
      <Navbar />
      <Container
        sx={{
          paddingTop: 2,
          paddingBottom: 2,
        }}
      >
        <GridLayout
          left={
            <Card
              sx={{
                padding: 2,
                backgroundColor: "#e0f7fa",
                boxShadow: 5,
                borderRadius: 3,
              }}
            >
              <PostBrowser createPost contentType="posts" />
            </Card>
          }
          right={
            <Card
              sx={{
                padding: 2,
                backgroundColor: "#f3e5f5",
                boxShadow: 5,
                borderRadius: 3,
              }}
            >
              <Sidebar />
            </Card>
          }
        />
      </Container>
    </Box>
  );
};

export default ExploreView;
