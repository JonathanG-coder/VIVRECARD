// Import du Router d'Express pour créer des routes
import {Router} from "express";

// Import du controller qui contient la logique des utilisateurs
import { UserController } from "../controllers/user.controller.js";

// Import du schema qui vérifie latitude et longitude
import { updateLocationSchema } from "../validation/user.validation.js";

// Import du middleware qui valide les données envoyées
import {validate} from "../middlewares/validation.middleware.js"

// Création du router pour les routes utilisateur
const router = Router()

// Route PUT pour mettre à jour la localisation de l'utilisateur
router.put('/location', validate(updateLocationSchema), UserController.updateLocation)

// Route GET pour récupérer les utilisateurs actifs
router.get('/active', UserController.getActiveUsers)

// Export du router pour l'utiliser dans le serveur principal
export default router
