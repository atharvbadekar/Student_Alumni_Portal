import { Card, Container, Stack, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getUser, updateUser } from "../../api/users";
import { isLoggedIn } from "../../helpers/authHelper";
import CommentBrowser from "../CommentBrowser";
import ErrorAlert from "../ErrorAlert";
import FindUsers from "../FindUsers";
// import Footer from "../Footer";
import GridLayout from "../GridLayout";
import Loading from "../Loading";
import MobileProfile from "../MobileProfile";
import Navbar from "../Navbar";
import PostBrowser from "../PostBrowser";
import Profile from "../Profile";
import ProfileTabs from "../ProfileTabs";

const ProfileView = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [tab, setTab] = useState("posts");
  const user = isLoggedIn();
  const [error, setError] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const data = await getUser(params.id);
      setLoading(false);
      if (data.error) {
        setError(data.error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch user data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    await updateUser(user, { biography: content });
    setProfile({ ...profile, user: { ...profile.user, biography: content } });
    setEditing(false);
  };

  const handleEditing = () => {
    setEditing(!editing);
  };

  const handleMessage = () => {
    navigate("/messenger", { state: { user: profile.user } });
  };

  useEffect(() => {
    fetchUser();
  }, [location]);

  const validate = (content) => {
    let error = "";
    if (content.length > 250) {
      error = "Bio cannot be longer than 250 characters";
    }
    return error;
  };

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
        maxWidth="lg"
        sx={{
          paddingTop: 2,
          paddingBottom: 2,
        }}
        className="profile-container"
      >
        <GridLayout
          left={
            <Card
              sx={{
                padding: 2,
                backgroundColor: "#e0f7fa", // Light cyan
                boxShadow: 1,
                borderRadius: 2,
                border: "1px solid #dcdcdc",
              }}
            >
              <MobileProfile
                profile={profile}
                editing={editing}
                handleSubmit={handleSubmit}
                handleEditing={handleEditing}
                handleMessage={handleMessage}
                validate={validate}
              />
              <Stack spacing={2}>
                {profile ? (
                  <>
                    <ProfileTabs tab={tab} setTab={setTab} />
                    <PostBrowser
                      profileUser={profile.user}
                      contentType={tab === "posts" ? "posts" : "liked"}
                      key={tab}
                    />
                  </>
                ) : (
                  <Loading />
                )}
                {error && <ErrorAlert error={error} />}
              </Stack>
            </Card>
          }
          right={
            <Stack spacing={2}>
              <Card
                sx={{
                  padding: 2,
                  backgroundColor: "#f3e5f5", // Light purple
                  boxShadow: 1,
                  borderRadius: 2,
                  border: "1px solid #dcdcdc",
                }}
              >
                {profile && (
                  <Profile
                    profile={profile}
                    editing={editing}
                    handleSubmit={handleSubmit}
                    handleEditing={handleEditing}
                    handleMessage={handleMessage}
                    validate={validate}
                  />
                )}
              </Card>
              <Card
                sx={{
                  padding: 2,
                  backgroundColor: "#e8f5e9", // Light green
                  boxShadow: 1,
                  borderRadius: 2,
                  border: "1px solid #dcdcdc",
                }}
              >
                <FindUsers />
              </Card>
            </Stack>
          }
        />
      </Container>
    </Box>
  );
};

export default ProfileView;
