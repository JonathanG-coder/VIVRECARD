import { api } from "./api.js";

export const locationService = {
  updateLocation: async (latitude, longitude) => {
    const response = await api.put("/users/location", { latitude, longitude });

    return response.data;
  },

  //On va récuperer users actif
  getActiveUsers: async () => {
    const response = await api.get("/users/active");
    return response.data;
  },
};
