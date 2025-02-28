import axios from "axios";

export const getSheets = async () => {
  const response = await axios.get("/api/sheets");
  return response.data;
};

export const createSheet = async (name: string) => {
  const response = await axios.post("/api/sheets", { name });
  return response.data;
};
