import { Card, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Messages from "../Messages";
import Navbar from "../Navbar";
import UserMessengerEntries from "../UserMessengerEntries";
import { getConversations } from "../../api/messages";
import { isLoggedIn } from "../../helpers/authHelper";
import { useLocation } from "react-router-dom";

const MessengerView = () => {
  const [conservant, setConservant] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [width, setWindowWidth] = useState(0);
  const mobile = width < 800;
  const user = isLoggedIn();
  const { state } = useLocation();
  const newConservant = state && state.user;

  const getConversation = (conversations, conservantId) => {
    for (let i = 0; i < conversations.length; i++) {
      const conversation = conversations[i];
      if (conversation.recipient._id === conservantId) {
        return conversation;
      }
    }
  };

  const fetchConversations = async () => {
    let conversations = await getConversations(user);
    if (newConservant) {
      setConservant(newConservant);
      if (!getConversation(conversations, newConservant._id)) {
        const newConversation = {
          _id: newConservant._id,
          recipient: newConservant,
          new: true,
          messages: [],
        };
        conversations = [newConversation, ...conversations];
      }
    }
    setConversations(conversations);
    setLoading(false);
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#FFE0B2", // Light orange
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
        <Card
          sx={{
            padding: 0,
            backgroundColor: "#E0F7FA", // Light cyan
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: 0,
          }}
        >
          <Grid
            container
            sx={{ height: "calc(100vh - 110px)" }}
            alignItems="stretch"
          >
            {!mobile ? (
              <>
                <Grid
                  item
                  xs={5}
                  sx={{
                    borderRight: 1,
                    borderColor: "divider",
                    height: "100%",
                    backgroundColor: "#B2EBF2", // Light cyan
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                    borderRadius: 0,
                  }}
                >
                  <UserMessengerEntries
                    conservant={conservant}
                    conversations={conversations}
                    setConservant={setConservant}
                    loading={loading}
                  />
                </Grid>

                <Grid
                  item
                  xs={7}
                  sx={{
                    height: "100%",
                    backgroundColor: "#C5E1A5", // Light green
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                    borderRadius: 0,
                  }}
                >
                  <Messages
                    conservant={conservant}
                    conversations={conversations}
                    setConservant={setConservant}
                    setConversations={setConversations}
                    getConversation={getConversation}
                  />
                </Grid>
              </>
            ) : !conservant ? (
              <Grid
                item
                xs={12}
                sx={{
                  borderRight: 1,
                  borderColor: "divider",
                  height: "100%",
                  backgroundColor: "#B2EBF2", // Light cyan
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                  borderRadius: 0,
                }}
              >
                <UserMessengerEntries
                  conservant={conservant}
                  conversations={conversations}
                  setConservant={setConservant}
                  loading={loading}
                />
                <Box sx={{ display: "none" }}>
                  <Messages
                    conservant={conservant}
                    conversations={conversations}
                    setConservant={setConservant}
                    setConversations={setConversations}
                    getConversation={getConversation}
                  />
                </Box>
              </Grid>
            ) : (
              <Grid
                item
                xs={12}
                sx={{
                  height: "100%",
                  backgroundColor: "#C5E1A5", // Light green
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                  borderRadius: 0,
                }}
              >
                <Messages
                  conservant={conservant}
                  conversations={conversations}
                  setConservant={setConservant}
                  setConversations={setConversations}
                  getConversation={getConversation}
                  mobile
                />
              </Grid>
            )}
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default MessengerView;
