import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL + "/api/groups"; // Use environment variable

const getToken = () => localStorage.getItem("token");

export const createGroup = async (name: string) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.post(
      `${API_URL}/create`, // Ensure this is the correct API endpoint
      { name },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data);
      throw new Error(error.response?.data?.message || "Error creating group");
    }
    console.error("Unexpected Error:", error);
    throw new Error("An unexpected error occurred");
  }
};

export const deleteGroup = async (groupId: string) => {
  try {
    const response = await axios.delete(
      `${API_URL}/${groupId}/delete`,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error deleting group");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getGroups = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/groups`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error fetching groups");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const inviteMember = async (groupId: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/${groupId}/invite`,
      {},
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error inviting member");
    }
    throw new Error("An unexpected error occurred");
  }
};
