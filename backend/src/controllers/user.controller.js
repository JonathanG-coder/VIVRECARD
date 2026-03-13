import { userRepository } from "../repositories/user.repository.js";

export const UserController = {
  // Mise à jour de la localisation
  async updateLocation(req, res, next) {
    try {
      const { latitude, longitude } = req.body; // correction de typo

      // Validation simple
      if (typeof latitude !== "number" || typeof longitude !== "number") {
        return res.status(400).json({ message: "Latitude et longitude invalides" });
      }

      // Utilisation de l'id provenant de req.user sécurisé par authenticate middleware
      await userRepository.updateLocation(req.user.id, latitude, longitude);

      res.json({ success: true });
    } catch (error) {
      next(error); // Gestion des erreurs centralisée
    }
  },

  // Récupération des utilisateurs actifs
  async getActiveUsers(req, res, next) {
    try {
      const users = await userRepository.getActiveUsers();

      // Les données retournées sont safe (pas de password ni token)
      res.json(users);
    } catch (error) {
      next(error);
    }
  },
};