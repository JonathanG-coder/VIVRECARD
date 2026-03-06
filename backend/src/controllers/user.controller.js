// Import du repository qui gère les requêtes vers la base de données
import { userRepository } from "../repositories/user.repository.js";

// Controller qui contient la logique liée aux utilisateurs
export const UserController = {

    // Fonction pour mettre à jour la localisation d’un utilisateur
    async updateLocation(req, res, next) {
        try {

            // Récupération de la latitude et longitude envoyées par le client
            const { latitude, longitude } = req.body;

            // Vérifie que latitude et longitude existent
            if (!latitude || !longitude) {
                return res.status(400).json({
                    error: "Latitude and longitude are required"
                });
            }

            // Mise à jour de la localisation de l'utilisateur dans la base de données
            await userRepository.updateLocation(
                req.user.id,
                longitude,
                latitude
            );

            // Réponse envoyée si la mise à jour réussit
            res.status(200).json({ success: true });

        } catch (error) {

            // Envoie l'erreur au middleware de gestion des erreurs
            next(error);
        }
    },

    // Fonction pour récupérer les utilisateurs actifs
    async getActiveUsers(req, res, next) {
        try {

            // Récupère la liste des utilisateurs actifs depuis la base de données
            const users = await userRepository.getActiveUsers();

            // Envoie la liste des utilisateurs au client
            res.json(users);

        } catch (error) {

            // Envoie l'erreur au middleware de gestion des erreurs
            next(error);
        }
    }
};
