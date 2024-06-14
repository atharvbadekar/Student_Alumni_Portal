import { Container, Stack, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import GoBack from "../GoBack";
import GridLayout from "../GridLayout";
import Loading from "../Loading";
import Navbar from "../Navbar";
import PostCard from "../PostCard";
import Sidebar from "../Sidebar";
import { useParams } from "react-router-dom";
import { getPost } from "../../api/posts";
import Comments from "../Comments";
import ErrorAlert from "../ErrorAlert";
import { isLoggedIn } from "../../helpers/authHelper";

const PostView = () => {
  const params = useParams();

  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const user = isLoggedIn();

  const fetchPost = async () => {
    setLoading(true);
    const data = await getPost(params.id, user && user.token);
    if (data.error) {
      setError(data.error);
    } else {
      setPost(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  return (
    <Container
      sx={{
        backgroundColor: "#FFE0B2", // Light orange
        minHeight: "100vh",
        padding: 0,
      }}
    >
      <Navbar />
      <GoBack />
      <GridLayout
        left={
          loading ? (
            <Loading />
          ) : post ? (
            <Stack spacing={2}>
              <Card
                sx={{
                  backgroundColor: "#E0F7FA", // Light cyan
                  padding: "20px",
                  marginBottom: "20px",
                }}
              >
                <PostCard post={post} key={post._id} />
              </Card>
              <Comments />
            </Stack>
          ) : (
            error && <ErrorAlert error={error} />
          )
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

export default PostView;
