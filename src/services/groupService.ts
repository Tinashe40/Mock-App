import axios from "axios";

const API_URL = "http://localhost:5000/api/groups";

const getToken = () => localStorage.getItem("token");

export const createGroup = async (name: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/create`,
      { name },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error creating group");
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
