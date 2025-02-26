import { useState } from "react";
import { createGroup } from "../services/groupService";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreateGroup = async () => {
    setMessage(null);
    setError(null);
    try {
      const response = await createGroup(groupName);
      setMessage(response.message);
      setGroupName(""); // Reset input
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Create Group</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Enter group name"
        required
      />
      <button onClick={handleCreateGroup}>Create</button>
    </div>
  );
};

export default CreateGroup;
