import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL + "/api/auth"; // Use environment variable

const getToken = () => localStorage.getItem("token");
export const logoutUser = () => {
  localStorage.removeItem("token");  // ✅ Remove token
};

export const getUserDetails = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch user");
    }
    throw new Error("An unexpected error occurred");
  }
};
