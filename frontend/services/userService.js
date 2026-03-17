import { api } from "./api.js";

export const userService = {
  //On va mettre à jour la position (location)
  update: async (location) => {
    return api.put("/users/location ", location);
  },
  //On va récuperer users actif
  getActiveUsers: async () => {
    const response = await api.get("/users/active");
    return response.data;
  },
};
