import axios from "axios";

const API_URL = "http://localhost:3001";

export const addUser = async (user) => {
  return await axios.post(`${API_URL}/addUser`, user);
};

export const addMessage = async (message) => {
  return await axios.post(`${API_URL}/addMessage`, message);
};

export const getMessages = async () => {
  return await axios.get(`${API_URL}/getMessages`);
};
