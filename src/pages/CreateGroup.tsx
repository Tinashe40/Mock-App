import { useState } from "react";
import { createGroup } from "../services/groupService";
import { TextField, Button, Container, Typography, Alert, CircularProgress } from "@mui/material";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateGroup = async () => {
    setMessage(null);
    setError(null);
    setLoading(true);

    try {
      const response = await createGroup(groupName);
      setMessage(response.message || "Group created successfully!");
      setGroupName(""); // Reset input
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>Create Group</Typography>

      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        fullWidth
        label="Enter group name"
        variant="outlined"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        required
        autoFocus
        sx={{ mb: 2 }}
      />

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCreateGroup} 
        disabled={!groupName || loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Create"}
      </Button>
    </Container>
  );
};

export default CreateGroup;
