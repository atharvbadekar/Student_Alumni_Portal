import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { AiFillEdit } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { isLoggedIn } from "../helpers/authHelper";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Loading from "./Loading";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const currentUser = isLoggedIn();
  const theme = useTheme();
  const iconColor = theme.palette.primary.main;

  useEffect(() => {
    if (props.profile && props.profile.user) {
      setUser(props.profile.user);
    }
  }, [props.profile]);

  return (
    <Card>
      {user ? (
        <Stack alignItems="center" spacing={2}>
          <Box my={1}>
            {/* Assuming UserAvatar renders the avatar based on the username */}
            <UserAvatar width={150} height={150} username={user.username} />
          </Box>

          <Typography variant="h5">{user.username}</Typography>

          <Typography variant="body1">
            <b>Name:</b> {user.name}
          </Typography>
          <Typography variant="body1">
            <b>Mobile Number:</b> {user.mobileNumber}
          </Typography>
          <Typography variant="body1">
            <b>Year of Passout:</b> {user.yearOfPassOut}
          </Typography>

          {props.editing ? (
            <Box>
              <ContentUpdateEditor
                handleSubmit={props.handleSubmit}
                originalContent={user.biography}
                validate={props.validate}
              />
            </Box>
          ) : user.biography ? (
            <Typography textAlign="center" variant="body1">
              <b>Bio:</b> {user.biography}
            </Typography>
          ) : (
            <Typography variant="body1">
              <i>No bio yet</i>
            </Typography>
          )}

          {currentUser && user._id === currentUser.userId && (
            <Box>
              <Button
                startIcon={<AiFillEdit color={iconColor} />}
                onClick={props.handleEditing}
              >
                {props.editing ? "Cancel" : "Edit bio"}
              </Button>
            </Box>
          )}

          {currentUser && user._id !== currentUser.userId && (
            <Button variant="outlined" onClick={props.handleMessage}>
              Message
            </Button>
          )}

          <HorizontalStack>
            <Typography color="text.secondary">
              Likes <b>{props.profile.posts.likeCount}</b>
            </Typography>
            <Typography color="text.secondary">
              Posts <b>{props.profile.posts.count}</b>
            </Typography>
          </HorizontalStack>
        </Stack>
      ) : (
        <Loading label="Loading profile" />
      )}
    </Card>
  );
};

export default Profile;
