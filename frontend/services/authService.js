import { api } from "./api.js";

export const authService = {
  //Service pour le login
  login: async (data) => {
    const response = await api.post("/auth/login", data);
    return response.data.token;
  },
  //Service pour le register
  register: async (data) => {
    const response = await api.post("/auth/register", data);
    return response.data.token;
  },
};
