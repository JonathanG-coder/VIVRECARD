import { api } from "./api.js";

export const locationService = {
  updateLocation: async (latitude, longitude) => {
    const response = await api.put("/users/location", { latitude, longitude });

    return response.data;
  },
};
