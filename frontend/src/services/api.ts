import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
});

export const searchItems = async (query: string) => {
  const response = await api.get("/search", {
    params: { query }
  });
  return response.data;
};

export default api;
