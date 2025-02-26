import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserDetails, logoutUser } from "../services/authService";
import { getGroups, createGroup, deleteGroup } from "../services/groupService";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [groups, setGroups] = useState<{ id: string; name: string }[]>([]);

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserDetails();
        setUsername(user.name);
        setEmail(user.email);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    fetchUser();
  }, []);

  // Fetch user groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getGroups();
        setGroups(response);
      } catch (error) {
        console.error("Error fetching groups", error);
      }
    };

    fetchGroups();
  }, []);

  // Handle creating a new group
  const handleCreateGroup = async () => {
    try {
      const newGroup = await createGroup("New Group");
      setGroups([...groups, newGroup]);
    } catch (error) {
      console.error("Error creating group", error);
    }
  };

  // Handle deleting a group
  const handleDeleteGroup = async (groupId: string) => {
    try {
      await deleteGroup(groupId);
      setGroups(groups.filter(group => group.id !== groupId));
    } catch (error) {
      console.error("Error deleting group", error);
    }
  };

  // Handle user logout
  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4">Welcome, {username || "User"}!</Typography>
      <Typography variant="subtitle1" color="textSecondary">{email}</Typography>

      {/* Group Management */}
      <Box mt={3}>
        <Typography variant="h5">Your Groups</Typography>
        <List>
          {groups.length > 0 ? (
            groups.map((group) => (
              <ListItem key={group.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                <ListItemText primary={group.name} />
                <Button variant="contained" color="error" onClick={() => handleDeleteGroup(group.id)}>
                  Delete
                </Button>
              </ListItem>
            ))
          ) : (
            <Typography variant="body1">No groups found.</Typography>
          )}
        </List>
        <Button variant="contained" onClick={handleCreateGroup} sx={{ mt: 2 }}>
          Create Group
        </Button>
      </Box>

      {/* Logout Button */}
      <Box mt={4}>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
